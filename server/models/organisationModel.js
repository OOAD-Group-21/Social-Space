const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const organisationSchema = new mongoose.Schema({
  organisationName: {
    type: String,
    unique: true,
    required: [true, "Please tell organisation name"],
  },
  members: [memberSchema],
  code: {
    type: String,
    unique: true,
  },
  channels: {
    type: [String],
  },
});

const Organisation = mongoose.model("Organisation", organisationSchema);

module.exports = Organisation;
