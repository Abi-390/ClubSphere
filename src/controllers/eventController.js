const Event = require("../models/eventModel");

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("club").populate("attendees");
    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("club")
      .populate("attendees");
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json({ event });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event updated successfully", event });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
