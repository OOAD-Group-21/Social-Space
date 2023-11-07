const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const notifSchema = new mongoose.Schema({
  isFriendRequest: {
    type: Boolean,
  },
  friendOrOrgName: {
    type: String,
  },
  role: {
    type: String,
  },
  orgCode: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Please tell your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      validator: function (err) {
        return err === this.password;
      },
      message: "passwords are not same",
    },
  },
  name: {
    type: String,
  },
  photo: {
    type: String,
  },
  dateofbirth: {
    type: Date,
  },
  workingstatus: {
    type: String,
  },
  friends: {
    type: [String],
  },
  organisations: {
    type: [String],
  },
  notifications: {
    type: [notifSchema],
  },
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
