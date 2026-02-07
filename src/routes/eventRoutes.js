const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const auth = require("../middlewares/authMiddleware");
const roleCheck = require("../middlewares/rollcheckMiddleware");

// Create a new event
router.post("/create", auth, eventController.createEvent);

// Get all events
router.get("/get", auth, eventController.getEvents);

// Get a single event by ID
router.get("/eventbyid/:id", auth, eventController.getEventById);

// Update an event
router.put("/update/:id", auth, roleCheck(['admin', 'owner']), eventController.updateEvent);

// Delete an event
router.delete("/delete/:id", auth, roleCheck(['admin', 'owner']), eventController.deleteEvent);

module.exports = router;
