const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: false,
  };

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = async function (req, res, next) {
  try {
    if (!req.body.username) {
      throw new Error("Username not provided");
    } else if (!req.body.password) {
      throw new Error("Password not provided");
    } else if (!req.body.email) {
      throw new Error("Email not provided");
    }

    const userExists = await User.find({ username: req.body.username });

    if (userExists.length) {
      throw new Error("Username already taken");
    }

    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      passwordConfirm: req.body.passwordConfirm,
    });

    // const token = signToken(newUser._id);
    // res.status(201).json({
    //   status: "success",
    //   token,
    //   data: {
    //     user: newUser,
    //   },
    // });

    createSendToken(newUser, 200, res);
  } catch (err) {
    const errorMessages = [];
    if (err.name === "ValidationError") {
      for (const field in err.errors) {
        if (err.errors[field].message.includes("E11000 duplicate key error collection"))
          errorMessages.push("Username or Email already Taken");
        else errorMessages.push(err.errors[field].message);
      }
    } else {
      if (err.message.includes("E11000 duplicate key error collection"))
        errorMessages.push("Username or Email already Taken");
      else errorMessages.push(err.message);
    }

    res.status(401).json({
      status: "error",
      messages: errorMessages,
    });
  }
};

exports.login = async function (req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).send({
      status: "error",
      message: "Provide email or password",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  const passwordString = password.toString();

  if (!user || !(await bcrypt.compare(passwordString, user.password))) {
    return res.status(401).send({
      status: "error",
      message: "Invalid email or password",
    });
  }

  createSendToken(user, 200, res);
};

exports.protect = async function (req, res, next) {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).send("You are not logged in! Please log in to get access.");
  }

  // 2) Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Checking if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return res.status(401).send("User does not exist!");
  }

  // 4) Checking if user changed his password after JWT was issued
  const isChangedPasswordAfter = () => {
    passwordChangedAt = currentUser.passwordChangedAt;
    if (passwordChangedAt) {
      const changedTimestamp = parseInt(passwordChangedAt.getTime() / 1000, 10);

      return decoded.iat < changedTimestamp;
    }

    // False means NOT changed
    return false;
  };
  if (isChangedPasswordAfter()) {
    return res.status(401).send({ message: "Your password has changed! Please log in again." });
  }

  // Grant access
  req.user = currentUser;
  next();
};

exports.updatePassword = async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // 1) Check if POSTed current password is correct
  if (!(await bcrypt.compare(req.body.passwordCurrent, user.password))) {
    return res.status(401).send({ status: "fail", message: "Your current password is incorrect" });
  }

  // 2) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 3) Log user in, send JWT
  createSendToken(user, 200, res);
};

exports.logout = async (req, res, next) => {
  res.clearCookie("jwt");
  res.status(200).send({ status: "success", message: "Logged out successfully" });
};
