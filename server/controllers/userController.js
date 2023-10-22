const User = require("./../models/userModel");

const filterObj = (obj, notAllowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    if (!notAllowedFields.includes(key)) {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};

exports.updateProfile = async (req, res, next) => {
  console.log(req.body);
  console.log(req.user);

  const notAllowedFields = ["role", "password"];

  const filteredBody = filterObj(req.body, notAllowedFields);

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
};

exports.deleteProfile = async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.user.id);

  res.status(200).json({
    status: "success",
    data: {
      user: deletedUser,
    },
  });
};
