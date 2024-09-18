const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is Required"]
  },
  lastName: {
    type: String,
    required: [true, "Last Name is Required"]
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    unique: true,  // Ensures email uniqueness
    match: [/.+@.+\..+/, "Email is invalid"]  // Basic email validation
  },
  password: {
    type: String,
    required: [true, "Password is Required"]
  },
  mobileNo: {
    type: String,
    required: [true, "Mobile Number is Required"],
    match: [/^\d{11}$/, "Mobile number must be exactly 11 digits"]
  }
});

module.exports = mongoose.model("User", userSchema);
