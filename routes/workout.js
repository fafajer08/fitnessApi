const express = require("express");
const workoutController = require("../controllers/Workout");
const auth = require("../auth");

const { verify } = auth; // Importing the verify middleware

const router = express.Router();

// Create a New Workout
router.post("/addWorkout", verify, workoutController.createWorkout);

// Retrieve All Workouts for a User
router.get("/getMyWorkouts", verify, workoutController.getWorkouts);

// Retrieve a Specific Workout
router.get("/getMyWorkouts/:id", verify, workoutController.getWorkoutById);

// Update a Workout
router.patch("/updateWorkout/:id", verify, workoutController.updateWorkout);

// Delete a Workout
router.delete("/deleteWorkout/:id", verify, workoutController.deleteWorkout);

// Complete a Workout Status
router.patch("/completeWorkoutStatus/:id", verify, workoutController.completeWorkoutStatus);

module.exports = router;
