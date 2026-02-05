const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// Register
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await userModel.findOne({ 
      $or: [{ email }, { username }] //More efficient way to check both email and username at once
    });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new userModel({
      username,
      email,
      passwordHash,
    });

    await newUser.save();

    res.status(201).json({ 
      message: "User registered successfully",
      user: { id: newUser._id, username, email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ 
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("-passwordHash");//.select("-passwordHash") return user data without password
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Logout (optional - handled on frontend)
exports.logout = (req, res) => {
  res.json({ message: "Logged out successfully" });
};