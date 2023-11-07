const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  organisation: String,
  text: String,
  photo: String,
  date: Date,
});

const MyModel = mongoose.model("Global_Post", schema);

module.exports = MyModel;
