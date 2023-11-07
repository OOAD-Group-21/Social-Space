const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  from: String,
  text: String,
  date: {
    type: String,
    default: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
  },
});

const ChannelSchema = new mongoose.Schema({
  channelName: {
    type: String,
  },
  organisationName: {
    type: String,
  },
  isDM: {
    type: Boolean,
    default: false,
  },
  members: [String],
  messages: [messageSchema],
});

const channelModel = mongoose.model("Channel", ChannelSchema);

module.exports = channelModel;
