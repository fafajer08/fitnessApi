const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errorHandler } = require("./auth"); // Import errorHandler

const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/users");

require("dotenv").config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: ['http://localhost:3000', 'http://zuitt-bootcamp-prod-460-7861-madrazo.s3-website.us-east-1.amazonaws.com'],
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Routes
app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

// Error handling middleware - should be the last middleware
app.use(errorHandler);

// Start the server
if (require.main === module) {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${process.env.PORT || 4000}`);
    });
}

module.exports = { app, mongoose };
