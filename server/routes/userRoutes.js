const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
const dmController = require("./../controllers/dmController");
const globalPostController = require("./../controllers/globalPostController");

const router = express.Router();

// 1) Authentication
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.patch("/updateMyPassword", authController.protect, authController.updatePassword);
router.get("/logout", authController.protect, authController.logout);
// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);

// 2) User Profile
router.get("/viewProfile", authController.protect, userController.viewProfile); //done
router.post("/updateMyProfile", authController.protect, userController.updateProfile);
router.delete("/deleteMyProfile", authController.protect, userController.deleteProfile);

// 3) Direct Messaging
router.post("/sendMessage", authController.protect, dmController.sendMessage);
router.get("/search/:username", authController.protect, userController.searchUser);

// router.get("/user/:username", authController.protect, dmController.getFriend); // Gets friends old messages
router.get("/user/:username", authController.protect, dmController.getFriend); // Gets friends old messages

router.get("/users", authController.protect, userController.getUsernames);

// 4) Home Page

// Have to add for only admins of org here
router.post("/orgName/globalPost", authController.protect, globalPostController.sendPost);

// for testing purposes
router.post("/sendMessage", dmController.sendMessage);

// Akshat and Atish
router.post("/CreateOrganisation", authController.protect, userController.CreateOrganisation); //done
router.delete("/DeleteOrganisation", authController.protect, userController.DeleteOrganisation);
router.post("/joinOrganisation", authController.protect, userController.JoinOrganisation); //done
router.post("/leaveOrganisation", authController.protect, userController.LeaveOrganisation); //working but remove to be added

router.post("/createChannel", authController.protect, userController.createChannel); //done
router.post("/deleteChannel", authController.protect, userController.deleteChannel); //done

router.get("/organisation/:organisationName", authController.protect, userController.organisationid); //done
router.get("/organisation/:organisationName/channel/:channelName", authController.protect, userController.channelid); //done

router.get("/globalpost", authController.protect, userController.global); //testing after aryan dm NEED to be merged with organisations function

router.get("/notification", authController.protect, userController.notifications); //done
router.post("/deleteNotification", authController.protect, userController.deletenotification); //done

router.get("/organisations", authController.protect, userController.organisationList); //done
router.get("/dm", authController.protect, userController.friendList); //working tested after aryan dm

router.post("/inviteToOrganisation", authController.protect, userController.inviteToOrganisation); //done
router.post("/sendFriendRequest", authController.protect, userController.sendFriendRequest); //done

router.post("/addtochannel", authController.protect, userController.addtochannel);
router.post("/deletechannel", authController.protect, userController.deleteChannel);

router.post("/changeRole", authController.protect, userController.changeRole); //done
router.post("/addfriends", authController.protect, userController.addfriend); //done
// router.post("/searchuser", authController.protect, userController.searchUser); //done
router.post("/searchFriend", authController.protect, userController.searchFriend); //done
router.post("/organisation/search", authController.protect, userController.searchUserOrg); //done
router.post("/organisation/channel/search", authController.protect, userController.searchUserChannel); //done

module.exports = router;
