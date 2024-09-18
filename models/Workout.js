const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Workout name is required"]
  },
  duration: {
    type: Number,
    required: [true, "Duration is required"]
  },
  dateAdded: {
    type: Date,
    required: [true, "Date added is required"]
  },
  status: {
    type: String,
    required: [true, "Status is required"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Workout", workoutSchema);
