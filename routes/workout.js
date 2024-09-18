const express = require("express");
const workoutController = require("../controllers/Workout");
const auth = require("../auth");

const { verify } = auth; // Importing the verify middleware

const router = express.Router();

// Create a New Workout
router.post("/", verify, workoutController.createWorkout);

// Retrieve All Workouts for a User
router.get("/", verify, workoutController.getWorkouts);

// Retrieve a Specific Workout
router.get("/:id", verify, workoutController.getWorkoutById);

// Update a Workout
router.patch("/:id", verify, workoutController.updateWorkout);

// Delete a Workout
router.delete("/:id", verify, workoutController.deleteWorkout);

module.exports = router;
