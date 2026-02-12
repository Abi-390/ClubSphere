require('dotenv').config();
const express = require("express");
const connectDB = require("./db/db");
const authRoutes = require("./routes/authRoutes");
const clubRoutes = require("./routes/clubRoutes");
const eventRoutes = require("./routes/eventRoutes");
const discussionRoutes = require("./routes/discussionRoutes");
const cors = require("cors");




const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "https://clubsphere-tau.vercel.app",
  credentials: true
}));


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/discussions", discussionRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "ClubSphere API is running" });
});


connectDB();


module.exports = app;