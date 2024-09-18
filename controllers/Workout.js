const Workout = require("../models/Workout");
const { errorHandler } = require("../auth");

// Create a New Workout
module.exports.createWorkout = async (req, res) => {
  try {
      const { name, duration, dateAdded, status } = req.body;

      // Validate input
      if (!name) return res.status(400).json({ error: "Name is required" });
      if (!duration) return res.status(400).json({ error: "Duration is required" });
      if (!dateAdded) return res.status(400).json({ error: "Date added is required" });
      if (!status) return res.status(400).json({ error: "Status is required" });

      // Create new workout
      const newWorkout = new Workout({
          name,
          duration,
          dateAdded,
          status,
          user: req.user.id  // Associate workout with the logged-in user
      });

      const savedWorkout = await newWorkout.save();
      res.status(201).json({ workout: savedWorkout });

  } catch (error) {
      errorHandler(error, req, res);
  }
};



// Retrieve All Workouts for a User
module.exports.getWorkouts = async (req, res) => {
  try {
      const workouts = await Workout.find({ user: req.user.id });

      if (workouts.length === 0) {
          return res.status(404).json({ message: "No workouts found" });
      }

      res.status(200).json({ workouts });

  } catch (error) {
      errorHandler(error, req, res);
  }
};


// Retrieve a Specific Workout
module.exports.getWorkoutById = async (req, res) => {
  try {
      const workout = await Workout.findOne({ _id: req.params.id, user: req.user.id });

      if (!workout) {
          return res.status(404).json({ message: "Workout not found" });
      }

      res.status(200).json({ workout });

  } catch (error) {
      errorHandler(error, req, res);
  }
};


// Update a Workout
module.exports.updateWorkout = async (req, res) => {
  try {
      const { name, duration, dateAdded, status } = req.body;

      const updatedWorkout = await Workout.findOneAndUpdate(
          { _id: req.params.id, user: req.user.id },
          { name, duration, dateAdded, status },
          { new: true }
      );

      if (!updatedWorkout) {
          return res.status(404).json({ message: "Workout not found or not authorized to update" });
      }

      res.status(200).json({ workout: updatedWorkout });

  } catch (error) {
      errorHandler(error, req, res);
  }
};


// Delete a Workout
module.exports.deleteWorkout = async (req, res) => {
  try {
      const result = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user.id });

      if (!result) {
          return res.status(404).json({ message: "Workout not found or not authorized to delete" });
      }

      res.status(200).json({ message: "Workout deleted successfully" });

  } catch (error) {
      errorHandler(error, req, res);
  }
};

// Update Workout Status to Completed
module.exports.completeWorkoutStatus = async (req, res) => {
  try {
      const { id } = req.params; // Workout ID from URL

      // Find and update the workout's status
      const updatedWorkout = await Workout.findOneAndUpdate(
          { _id: id, user: req.user.id },
          { status: 'Completed' }, // Set status to 'Completed'
          { new: true } // Return the updated document
      );

      if (!updatedWorkout) {
          return res.status(404).json({ message: "Workout not found or not authorized to update" });
      }

      res.status(200).json({ workout: updatedWorkout });

  } catch (error) {
      errorHandler(error, req, res);
  }
};
