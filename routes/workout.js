const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/Workout');
const { verify } = require('../auth');

// Create workout
router.post('/addWorkout', verify, workoutController.addWorkout);

// Retrieve all workouts for a user
router.get('/getMyWorkouts', verify, workoutController.getMyWorkouts);

// Route to get a specific workout by ID
router.get("/getMyWorkouts/:id", verify, workoutController.getWorkoutById);

// Update a workout
router.put('/updateWorkout/:id', verify, workoutController.updateWorkout);

// Delete a workout
router.delete('/deleteWorkout/:id', verify, workoutController.deleteWorkout);

// New route for completing a workout status
router.patch('/completeWorkoutStatus/:id', verify, workoutController.completeWorkoutStatus);

module.exports = router;
