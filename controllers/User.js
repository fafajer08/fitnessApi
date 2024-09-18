const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth = require("../auth");
const { errorHandler } = require("../auth");

// User Registration
module.exports.registerUser = async (req, res) => {
	try {
		const { email, mobileNo, password, firstName, lastName } = req.body;

		// Validate input
		if (!email.includes("@")) {
			return res.status(400).json({ error: "Email invalid" });
		}
		if (mobileNo.length !== 11) {
			return res.status(400).json({ error: "Mobile number invalid" });
		}
		if (password.length < 8) {
			return res.status(400).json({ error: "Password must be at least 8 characters" });
		}

		// Create new user
		const newUser = new User({
			firstName,
			lastName,
			email,
			password: bcrypt.hashSync(password, 10),
			mobileNo
		});

		const savedUser = await newUser.save();
		res.status(201).json({ message: "Registered Successfully" });

	} catch (error) {
		errorHandler(error, req, res);
	}
};

// User Authentication
module.exports.userAuthentication = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email) {
			return res.status(400).json({ error: "No Email Found" });
		}
		if (!email.includes("@")) {
			return res.status(400).json({ error: "Invalid email" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ error: "Email not found" });
		}

		const isPasswordCorrect = bcrypt.compareSync(password, user.password);
		if (!isPasswordCorrect) {
			return res.status(401).json({ error: "Email and password do not match" });
		}

		const token = auth.createAccessToken(user);
		res.status(200).json({ access: token });

	} catch (error) {
		errorHandler(error, req, res);
	}
};

// Get User Details
module.exports.getUserDetails = async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.status(200).json({ user });

	} catch (error) {
		errorHandler(error, req, res);
	}
};

// Update Password
module.exports.updatePassword = async (req, res) => {
	try {
		const { newPassword } = req.body;

		if (newPassword.length < 8) {
			return res.status(400).json({ message: "Password must be at least 8 characters long" });
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);
		await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });

		res.status(200).json({ message: "Password reset successfully" });

	} catch (error) {
		errorHandler(error, req, res);
	}
};
