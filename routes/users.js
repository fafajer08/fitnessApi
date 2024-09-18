const express = require("express");
const userController = require("../controllers/User");
const auth = require("../auth");

const { verify } = auth;  // Removed verifyAdmin as admin validation is not required

const router = express.Router();

// Route for User Registration
router.post("/register", userController.registerUser);

// Route for User Authentication (Login)
router.post("/login", userController.userAuthentication);

// Route for Retrieving Authenticated User Details
router.get("/details", verify, userController.getUserDetails);

// Route to Update Password for Authenticated User
router.patch("/update-password", verify, userController.updatePassword);

module.exports = router;
