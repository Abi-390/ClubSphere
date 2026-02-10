const Event = require("../models/eventModel");
const Club = require("../models/clubModel");
const mongoose = require("mongoose");

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { club, attendees } = req.body;

    // Check club ObjectId format
    if (!mongoose.Types.ObjectId.isValid(club)) {
      return res.status(400).json({ error: "Invalid club ID format" });
    }

    //  Check if club exists
    const clubExists = await Club.findById(club);
    if (!clubExists) {
      return res.status(404).json({ error: "Club not found" });
    }

   const event = await Event.create({
  ...req.body,
  createdBy: req.user.id
});


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
    //console.log("ID:", req.params.id);
    //console.log("BODY:", req.body);

    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event updated successfully", event });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("club");

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const isAdmin = req.user.role === "admin";
    const isCreator = event.createdBy.toString() === req.user.id;
    const isClubOwner = event.club.owner.toString() === req.user.id;

    if (!isAdmin && !isCreator && !isClubOwner) {
      return res.status(403).json({ error: "Access denied" });
    }

    await event.deleteOne();

    res.json({ message: "Event deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

