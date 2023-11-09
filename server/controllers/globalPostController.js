const Global_Post = require("./../models/globalPostModel");

exports.sendPost = async (req, res, next) => {
  const data = {
    organisation: req.body.organisation,
    text: req.body.text,
    photo: req.body.photo,
    date: Date.now(),
  };

  const newPost = await Global_Post.create(data);

  res.status(200).json({
    status: "success",
    data: { newPost },
  });
};

// Send post
// fetch post
