const Workout = require("../models/Workout");
const { errorHandler } = require("../auth");

// Create a New Workout
module.exports.addWorkout = async (req, res) => {
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

      // Return response with specific properties
      return res.status(201).json({
          _id: savedWorkout._id,
          name: savedWorkout.name,
          duration: savedWorkout.duration,
          dateAdded: savedWorkout.dateAdded,
          status: savedWorkout.status
      });

  } catch (error) {
      errorHandler(error, req, res);
  }
};


// Retrieve All Workouts for a User
module.exports.getMyWorkouts = async (req, res) => {
  try {
      // Ensure user ID is set correctly in req.user
      if (!req.user || !req.user.id) {
          return res.status(403).json({ error: "User not authenticated" });
      }

      // Find workouts for the authenticated user
      const workouts = await Workout.find({ user: req.user.id });

      if (workouts.length === 0) {
          return res.status(404).json({ message: "No workouts found" });
      }

      // Respond with an array of workouts
      return res.status(200).json(workouts);

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
      // Validate that the user ID is present
      if (!req.user || !req.user.id) {
          return res.status(403).json({ error: "User not authenticated" });
      }

      // Validate that the workout ID is present
      if (!req.params.id) {
          return res.status(400).json({ error: "Workout ID is required" });
      }

      // Find and update the workout
      const updatedWorkout = await Workout.findOneAndUpdate(
          { _id: req.params.id, user: req.user.id },
          { name: req.body.name, duration: req.body.duration, dateAdded: req.body.dateAdded, status: req.body.status },
          { new: true }
      );

      if (!updatedWorkout) {
          return res.status(404).json({ message: "Workout not found or not authorized to update" });
      }

      // Respond with the updated workout
      return res.status(200).json({ workout: updatedWorkout });

  } catch (error) {
      errorHandler(error, req, res);
  }
};


// Delete a Workout
module.exports.deleteWorkout = async (req, res) => {
  try {
      // Validate that the user ID is present
      if (!req.user || !req.user.id) {
          return res.status(403).json({ error: "User not authenticated" });
      }

      // Validate that the workout ID is present
      if (!req.params.id) {
          return res.status(400).json({ error: "Workout ID is required" });
      }

      // Find and delete the workout
      const result = await Workout.findOneAndDelete({ _id: req.params.id, user: req.user.id });

      if (!result) {
          return res.status(404).json({ message: "Workout not found or not authorized to delete" });
      }

      // Respond with success message
      return res.status(200).json({ message: "Workout deleted successfully" });

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
