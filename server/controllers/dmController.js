const Dm = require("./../models/dmModel");

exports.sendMessage = async (req, res, next) => {
  let user1, user2;
  if (req.body.user1 > req.body.user2) {
    user1 = req.body.user2;
    user2 = req.body.user1;
  } else {
    user1 = req.body.user1;
    user2 = req.body.user2;
  }

  const dm = (await Dm.find({ user1, user2 }))[0];

  if (!dm) {
    const data = {
      user1,
      user2,
      messages: { from: req.body.from, text: req.body.message },
    };
    const newMessage = await Dm.create(data);

    res.status(200).json({
      status: "success",
      message: newMessage,
    });

    return;
  }

  dm.messages.push({ from: req.body.from, text: req.body.message });
  await dm.save();

  res.status(200).json({
    status: "success",
  });
};

exports.getFriend = async (req, res, next) => {
  const friendUsername = req.params.username;

  let user1, user2;

  if (friendUsername > req.user.username) {
    user1 = req.user.username;
    user2 = friendUsername;
  } else {
    user1 = friendUsername;
    user2 = req.user.username;
  }

  const dm = (await Dm.find({ user1, user2 }))[0];

  res.status(200).json({
    status: "success",
    oldMessages: dm.messages,
    currentUser: req.user.username,
    roomId: dm._id,
  });
  next();
};
