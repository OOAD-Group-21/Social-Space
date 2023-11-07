const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  from: String,
  text: String,
  date: {
    type: String,
    default: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
  },
});

const schema = new mongoose.Schema({
  user1: String,
  user2: String,
  messages: [subSchema],
});

const MyModel = mongoose.model("dms", schema);

module.exports = MyModel;
