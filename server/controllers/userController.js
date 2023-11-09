const User = require("./../models/userModel");
const Organisation = require("./../models/organisationModel");
const Channel = require("./../models/channelModel");
const DM = require("./../models/dmModel");

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

exports.searchUser = async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username });

  if (!user) {
    res.status(404).json({
      status: "error",
      message: "User not found",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        user,
        currentUser: req.user,
      },
    });
  }
};

exports.getUsernames = async (req, res, next) => {
  const userArr = await User.find().select("username");

  res.status(200).json({
    status: "success",
    message: "User array",
    userArr,
    currentUser: req.user,
  });
};

//view profile

exports.viewProfile = async (req, res, next) => {
  // const userobj = (obj, fields) => {
  //   const newObject = {};
  //   fields.forEach((field) => {
  //     if (obj[field]) {
  //       newObject[field] = obj[field];
  //     }
  //   });
  //   return newObject;
  // };

  // const fields = ["username", "email", "name", "photo", "dateofbirth", "workingstatus", "gender"];
  // const userProfile = userobj(req.user, fields);
  res.json({ data: req.user });
};

//create organisation
function generateRandomCode(length, charset) {
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    code += charset.charAt(randomIndex);
  }
  return code;
}
exports.CreateOrganisation = async (req, res, next) => {
  try {
    const length = 5;
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let result;
    do {
      result = generateRandomCode(length, charset);
    } while (await Organisation.findOne({ code: result }));
    if (!req.body.organisationName) {
      res.status(401).json("please provide organisation name");
    }
    const orgExists = await Organisation.find({ organisationName: req.body.organisationName });
    if (orgExists.length) {
      throw new Error("organisation name already taken");
    }
    const orgName = req.body.organisationName;
    const organization = new Organisation({ organisationName: orgName });
    organization.code = result;
    orgArr = req.user.organisations;
    orgArr.push(orgName);
    organization.members.push({ username: req.user.username, role: "admin" });
    for (let i = 0; i < req.body.memrole.length; i++) {
      const userN = req.body.memrole[i].username;
      const role = req.body.memrole[i].role;
      const USER = await User.findOne({ username: userN });
      updatenotification = USER.notifications;
      updatenotification.push({
        isFriendRequest: false,
        friendOrOrgName: orgName,
        role: role,
        orgCode: organization.code,
      });
      notify = { notifications: updatenotification };
      const updatedUser = await User.findByIdAndUpdate(USER.id, notify, {
        new: true,
      });
    }
    // await organization.save();
    orgObj = { organisations: orgArr };
    const updatedUser = await User.findByIdAndUpdate(req.user.id, orgObj, {
      new: true,
    });

    const data1 = {
      organisationName: organization.organisationName,
      channelName: "General",
      isDM: false,
      members: [req.user.username],
    };
    const channel = await Channel.create(data1);
    organization.channels.push(channel.channelName);
    await organization.save();
    res.status(200).json({ status: "success", message: "Organisation created successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ error: error.message });
    } else {
      next(error);
    }
  }
};

//delete organisation
exports.DeleteOrganisation = async (req, res, next) => {
  try {
    const user = req.user;
    const orgName = req.body.organisationName;
    const organization = await Organisation.findOne({
      organisationName: orgName,
    });
    if (!organization) {
      return res.status(404).json({ message: "organisation not found" });
    }
    const member = organization.members.find((member) => member.username === user.username);
    if (!member) {
      return res.status(403).json({ message: "User is not a member of this organization" });
    }
    if (member.role !== "admin") {
      return res.status(403).json({
        message: "User is not authorized to delete this organization",
      });
    }
    await Organisation.findOneAndRemove({ organisationName: orgName });
    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (error) {
    console.error("Error deleting organization:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//join organisation
exports.JoinOrganisation = async (req, res, next) => {
  try {
    const user = req.user;
    const code = req.body.code;
    let role;
    const organization = await Organisation.findOne({ code: code });
    if (req.body.role) {
      role = req.body.role;
    } else {
      role = "member";
    }
    if (!organization) {
      return res.status(404).json({ message: "organisation not found." });
    }
    const member = organization.members.find((member) => member.username === user.username);
    if (member) {
      return res.status(400).json({ message: "User is already a member of this organization." });
    }
    organization.members.push({ username: user.username, role: role });
    orgArr = req.user.organisations;
    orgArr.push(organization.organisationName);
    orgObj = { organisations: orgArr };

    const generalchannel = await Channel.findOne({
      organisationName: organization.organisationName,
      channelName: "General",
    });
    const memeberofgeneral = generalchannel.members;
    memeberofgeneral.push(user.username);
    let notification = user.notifications;
    let check = false;
    for (let i = 0; i < notification.length; i++) {
      if (notification[i].friendOrOrgName === organization.organisationName) check = true;
    }
    if (check) {
      notification = notification.filter((user) => user.orgCode !== organization.code);
      const notifobj = { notifications: notification };
      const done = await User.findByIdAndUpdate(req.user.id, notifobj, {
        new: true,
      });
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, orgObj, {
      new: true,
    });

    await generalchannel.save();
    await organization.save();

    res.status(200).json({ status: "success", message: "User joined the organization successfully" });
  } catch (error) {
    console.error("Error joining organization:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//leave organisation
exports.LeaveOrganisation = async (req, res, next) => {
  try {
    const user = req.user;
    const orgName = req.body.organisationName;
    const organization = await Organisation.findOne({
      organisationName: orgName,
    });
    if (!organization) {
      return res.status(404).json({ message: "organisation not found" });
    }
    const memberIndex = organization.members.findIndex((member) => member.username === user.username);
    if (memberIndex === -1) {
      return res.status(400).json({ message: "User is not a member of this organization" });
    }
    organization.members.splice(memberIndex, 1);
    orgArr = req.user.organisations;
    const filteredOrgArr = orgArr.filter((org) => org !== orgName);
    orgObj = { organisations: filteredOrgArr };
    const updatedUser = await User.findByIdAndUpdate(req.user.id, orgObj, {
      new: true,
    });
    await organization.save();
    return res.status(200).json({ message: "User left the organization successfully" });
  } catch (error) {
    console.error("Error leaving organization:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//organisation specific
exports.organisationid = async (req, res, next) => {
  try {
    const organisation = (await Organisation.find({ organisationName: req.params.organisationName }))[0];
    if (!organisation) {
      return res.status(404).json({ message: "organisation not found" });
    }

    const member = organisation.members.find((member1) => member1.username === req.user.username);
    if (!member) {
      return res.status(401).json({ message: "Not a member of the organization" });
    }
    const data = {
      organisationName: organisation.organisationName,
      code: organisation.code,
      members: organisation.members,
      channels: organisation.channels,
      currentUser: req.user,
    };

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//search member for organisation
exports.searchUserOrg = async (req, res, next) => {
  const user = await User.aggregate([
    {
      $match: {
        username: { $regex: "^" + req.body.username },
        organisations: { $nin: [req.body.organisation] },
      },
    },
    { $limit: 10 },
  ]);

  if (!user) {
    res.status(404).json({
      status: "error",
      message: "No Users found",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
};
//invite to organisation
exports.inviteToOrganisation = async (req, res, next) => {
  const organization = await Organisation.findOne({ organisationName: req.body.organisationName });
  const member = organization.members.find((member) => member.username === req.user.username);
  if (!member) {
    return res.status(401).json({
      status: "error",
      message: "Not in Organisation",
    });
  }
  if (member.role != "admin") {
    return res.status(401).json({
      status: "error",
      message: "Not admin",
    });
  }

  const user = await User.findOne({ username: req.body.username });
  const notif = {
    isFriendRequest: false,
    friendOrOrgName: req.body.organisationName,
    role: req.body.role,
    orgCode: organization.code,
  };
  const notiflist = user.notifications;
  notiflist.push(notif);

  const notifobj = { notifications: notiflist };
  const done = await User.findByIdAndUpdate(user.id, notifobj, {
    new: true,
  });
  if (!done) {
    return res.status(401).json({
      status: "error",
      message: "No such Users",
    });
  } else {
    return res.status(200).json({
      status: "success",
      message: "Notification Sent",
    });
  }
};
//change role
exports.changeRole = async (req, res, next) => {
  const organisation = await Organisation.findOne({ organisationName: req.body.organisationName });

  const operator = await organisation.members.find((member) => member.username === req.user.username);
  if (!operator) {
    return res.status(401).json({
      status: "error",
      message: "Not in Organisation",
    });
  }
  if (operator.role != "admin") {
    return res.status(401).json({
      status: "error",
      message: "Not admin",
    });
  }

  const members = organisation.members;

  let userInOrg = false;
  for (let i = 0; i < members.length; i++)
    if (members[i].username == req.body.username) {
      members[i].role = req.body.role;
      userInOrg = true;
    }

  if (!userInOrg) {
    return res.status(401).json({
      status: "error",
      message: "User not in Organisation",
    });
  }

  const memObj = { members: members };
  const updated = await Organisation.findByIdAndUpdate(organisation.id, memObj, { new: true });

  if (!updated) {
    return res.status(401).json({
      status: "error",
      message: "Role Not Updated",
    });
  } else {
    return res.status(200).json({
      status: "success",
      message: "Role changed",
    });
  }
};
// create channel
exports.createChannel = async (req, res, next) => {
  const organisation = (await Organisation.find({ organisationName: req.body.organisationName }))[0];
  if (!organisation) {
    res.status(401).json({
      status: "error",
      message: "Invalid Organisation Name",
    });
    return;
  }
  const { channelName } = req.body;
  if (!channelName) {
    res.status(401).json({
      status: "error",
      message: "Channel Name not Provided",
    });
    return;
  }
  const member = organisation.members.find((member) => member.username === req.user.username);
  try {
    if (member && (member.role === "admin" || member.role === "manager")) {
      for (let i = 0; i < organisation.channels.length; i++) {
        if (organisation.channels[i].channelName === req.body.channelName) {
          res.status(401).json({
            status: "error",
            message: "Channel Name already exist in organistion",
          });
          return;
        }
      }
      organisation.channels.push(req.body.channelName);
      await organisation.save();
      const addmember = req.body.members;
      const data1 = [];
      for (let i = 0; i < organisation.members.length; i++) {
        if (organisation.members[i].role === "admin") data1.push(organisation.members[i].username);
      }

      for (let i = 0; i < addmember.length; i++) data1.push(addmember[i]);
      const data = {
        organisationName: req.body.organisationName,
        channelName: req.body.channelName,
        isDM: false,
        members: data1,
      };
      const newMessage = await Channel.create(data);
      res.status(200).json({
        status: "success",
      });
    } else {
      res.status(401).json({
        status: "error",
        message: "Not authorized to create a channel",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//delete channel
exports.deleteChannel = async (req, res, next) => {
  const organisation = (await Organisation.find({ organisationName: req.body.organisationName }))[0];
  if (!organisation) {
    res.status(401).json({
      status: "error",
      message: "Invalid Organisation Name",
    });
    return;
  }
  const channelName = req.body.channelName;
  if (!channelName) {
    res.status(401).json({
      status: "error",
      message: "Channel Name not Provided",
    });
    return;
  }
  const member = await organisation.members.find((member1) => member1.username === req.user.username);

  if (member.role === "admin" || member.role === "manager") {
    const channelIndex = organisation.channels.indexOf(channelName);

    if (channelIndex !== -1) {
      organisation.channels.splice(channelIndex, 1);
      await organisation.save();
      await Channel.findOneAndRemove({ channelName: channelName });
      res.status(200).json({
        status: "success",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Channel not found",
      });
    }
  } else {
    res.status(401).json({
      status: "error",
      message: "Not authorized to delete a channel",
    });
  }
};
//channel specific data
exports.channelid = async (req, res, next) => {
  try {
    const organisation = (await Organisation.find({ organisationName: req.params.organisationName }))[0];
    if (!organisation) {
      return res.status(404).json({ message: "Organization not found" });
    }
    const orgmember = await organisation.members.find((member1) => member1.username === req.user.username);
    if (!orgmember) {
      return res.status(401).json({ message: "Not a member of the organization" });
    }
    const channel = (
      await Channel.find({ channelName: req.params.channelName, organisationName: req.params.organisationName })
    )[0];
    if (!channel) {
      return res.status(404).json({ message: "channel not found" });
    }
    const chanmember = channel.members.find((member1) => member1 === req.user.username);
    if (!chanmember) {
      return res.status(401).json({ message: "Not a member of the channel" });
    }
    const data = {
      channelName: channel.channelName,
      organisationName: organisation.organisationName,
      members: channel.members,
      messages: channel.messages,
    };
    res.status(200).json({ channel, currentUser: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
//search for adding memeber to channel
exports.searchUserChannel = async (req, res, next) => {
  const channel = await Channel.findOne({ organisationName: req.body.organisation, channelName: req.body.channel });
  const members = [];
  if (channel) members = channel.members;
  const user = await User.aggregate([
    {
      $match: {
        username: { $regex: "^" + req.body.username, $nin: members },
        organisations: { $in: [req.body.organisation] },
      },
    },
    { $limit: 10 },
  ]);

  if (!user) {
    res.status(404).json({
      status: "error",
      message: "No Users found",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
};
//add to channel
exports.addtochannel = async (req, res, next) => {
  try {
    const organization = await Organisation.findOne({ organisationName: req.body.organisationName });
    if (!organization) {
      return res.status(404).json({
        status: "error",
        message: "Organization not found",
      });
    }
    const member = organization.members.find((member) => member.username === req.user.username);
    if (!member) {
      return res.status(401).json({
        status: "error",
        message: "Not in Organization",
      });
    }
    if (member.role !== "admin" && member.role !== "manager") {
      return res.status(401).json({
        status: "error",
        message: "Not authorized",
      });
    }
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    const channel = await Channel.findOne({ channelName: req.body.channelName });
    if (!channel) {
      return res.status(404).json({
        status: "error",
        message: "Channel not found",
      });
    }
    channel.members.push(user.username);
    await channel.save();
    return res.status(200).json({
      status: "success",
      message: "User added to the channel",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
//leave or remove channel
exports.remove = async (req, res, next) => {
  const organization = await Organisation.findOne({ organisationName: req.body.organisationName });
  if (!organization) {
    return res.status(404).json({
      status: "error",
      message: "Organization not found",
    });
  }
  const member = organization.members.find((member) => member.username === req.user.username);
  if (!member) {
    return res.status(401).json({
      status: "error",
      message: "Not in Organization",
    });
  }
  if (member.role !== "admin" && member.role !== "manager" && member.name != req.body.name) {
    return res.status(401).json({
      status: "error",
      message: "Not authorized",
    });
  }
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }
  const channel = await Channel.findOne({ channelName: req.body.channelName });
  if (!channel) {
    return res.status(404).json({
      status: "error",
      message: "Channel not found",
    });
  }
  const userIndex = channel.members.findIndex((member) => member.username === req.user.username);
  if (userIndex === -1) {
    return res.json("Not a channel member");
  }
  channel.members.splice(userIndex, 1);
  await channel.save();
};

//global post
exports.global = async (req, res, next) => {
  try {
    const USER = await User.findOne({ username: req.user.username });
    if (!USER) {
      return res.status(404).json({ message: "User not found" });
    }
    const channel = (await Channel.find({ channelName: "Global post" }))[0];
    const data = {
      channelName: "Global Post",
      members: channel.members,
      message: channel.messages,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//general search
// exports.searchUser = async (req, res, next) => {
//   const user = await User.aggregate([{ $match: { username: { $regex: "^" + req.body.username } } }, { $limit: 10 }]);

//   if (!user) {
//     res.status(404).json({
//       status: "error",
//       message: "No Users found",
//     });
//   } else {
//     res.status(200).json({
//       status: "success",
//       data: {
//         user,
//       },
//     });
//   }
// };

//search friend
exports.searchFriend = async (req, res, next) => {
  const user = await User.aggregate([
    { $match: { username: { $regex: "^" + req.body.username, $in: req.user.friends } } },
    { $limit: 10 },
  ]);

  if (!user) {
    res.status(404).json({
      status: "error",
      message: "No Users found",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
};

//get notification list
exports.notifications = async (req, res, next) => {
  try {
    const USER = await User.findOne({ username: req.user.username });
    if (!USER) {
      return res.status(404).json({ message: "User not found" });
    }
    const notification = USER.notifications;
    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching notifications." });
  }
};
// get organisation list
exports.organisationList = async (req, res, next) => {
  try {
    const USER = await User.findOne({ username: req.user.username });
    if (!USER) {
      return res.status(404).json({ message: "User not found" });
    }

    const orglist = USER.organisations;
    res.json(orglist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching notifications." });
  }
};
//get dm list
exports.friendList = async (req, res, next) => {
  try {
    const USER = await User.findOne({ username: req.user.username });
    if (!USER) {
      return res.status(404).json({ message: "User not found" });
    }

    const friendlist = USER.friends;
    let data = [];
    for (let i = 0; i < friendlist.length; i++) {
      let dms;
      if (req.user.username <= friendlist[i])
        dms = (await DM.find({ user1: req.user.username, user2: friendlist[i] }))[0];
      else dms = (await DM.find({ user2: req.user.username, user1: friendlist[i] }))[0];

      if (dms.messages != [] && dms.messages.length !== 0) {
        data.push(friendlist[i]);
      }
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching notifications." });
  }
};

//send friend request
exports.sendFriendRequest = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  const notif = { isFriendRequest: true, friendOrOrgName: req.user.username };
  const notiflist = user.notifications;
  notiflist.push(notif);

  const notifobj = { notifications: notiflist };
  const done = await User.findByIdAndUpdate(user.id, notifobj, {
    new: true,
  });
  if (!done) {
    return res.status(401).json({
      status: "error",
      message: "No such Users",
    });
  } else {
    return res.status(200).json({
      status: "success",
      message: "Notification Sent",
    });
  }
};

//add frnd
exports.addfriend = async (req, res, next) => {
  const User1 = await User.findOne({ username: req.body.username });
  const User2 = await User.findOne({ username: req.user.username });
  const friendlist1 = User1.friends;
  const friendlist2 = User2.friends;
  friendlist1.push(User2.username);
  friendlist2.push(User1.username);
  friend1ob = { friends: friendlist1 };
  friend2ob = { friends: friendlist2 };

  let data;
  if (User1.username < User2.username) {
    data = {
      user1: User1.username,
      user2: User2.username,
      messages: [],
    };
  } else {
    data = {
      user1: User2.username,
      user2: User1.username,
      messages: [],
    };
  }
  const dm = new DM(data);

  let notification = User2.notifications;
  notification = notification.filter((user) => user.friendOrOrgName !== req.body.username);

  const notifobj = { notifications: notification };

  await dm.save();
  await User.findByIdAndUpdate(User2._id, friend2ob, {
    new: true,
  });
  await User.findByIdAndUpdate(User1._id, friend1ob, {
    new: true,
  });

  await User.findByIdAndUpdate(req.user.id, notifobj, {
    new: true,
  });

  return res.status(200).json({
    status: "success",
    message: "friend added",
  });
};

//Delete notification
exports.deletenotification = async (req, res, next) => {
  const USER = await User.findOne({ username: req.user.username });
  if (!USER) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }
  let notification = USER.notifications;
  if (req.body.orgCode === undefined) {
    notification = notification.filter((user) => user.friendOrOrgName !== req.body.friendOrOrgName);
  } else {
    notification = notification.filter(
      (user) => user.friendOrOrgName !== req.body.friendOrOrgName && user.orgCode !== req.body.orgCode
    );
  }

  const notifobj = { notifications: notification };

  const done = await User.findByIdAndUpdate(req.user.id, notifobj, {
    new: true,
  });
  return res.status(200).json({
    status: "success",
    message: "notification deleted",
  });
};
