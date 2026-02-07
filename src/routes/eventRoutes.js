const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const auth = require("../middlewares/authMiddleware");

// Create a new event
router.post("/create", auth, eventController.createEvent);

// Get all events
router.get("/get", auth, eventController.getEvents);

// Get a single event by ID
router.get("/eventbyid/:id", auth, eventController.getEventById);

// Update an event
router.put("/update/:id", auth, eventController.updateEvent);

// Delete an event
router.delete("/delete/:id", auth, eventController.deleteEvent);

module.exports = router;
