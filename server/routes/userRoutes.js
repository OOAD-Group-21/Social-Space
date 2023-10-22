const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

// 1) Authentication
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.patch("/updateMyPassword", authController.protect, authController.updatePassword);
router.get("/logout", authController.protect, authController.logout);
// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);

// 2) User Profile
router.patch("/updateMyProfile", authController.protect, userController.updateProfile);
router.delete("/deleteMyProfile", authController.protect, userController.deleteProfile);

module.exports = router;
