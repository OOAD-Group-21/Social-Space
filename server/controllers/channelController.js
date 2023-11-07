const Channel = require("./../models/channelModel");

exports.sendMessage = async (req, res, next) => {
  const channelData = (await Channel.find({}))[0];

  res.status(200).json({
    status: "success",
  });
};
