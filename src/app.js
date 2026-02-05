require('dotenv').config();
const express = require("express");
const connectDB = require("./db/db");
const authRoutes = require("./routes/authRoutes");



const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "ClubSphere API is running" });
});


connectDB();


module.exports = app;