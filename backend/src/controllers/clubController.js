const Club = require("../models/clubModel");

// Create a new club
exports.createClub = async (req, res) => {
  try {
    const { name, description,category } = req.body;
    const existingClub = await Club.findOne({ name });
    if (existingClub) {
      return res.status(400).json({ error: "Club already exists" });
    }
    const club = new Club({
      name,
      description,
      owner: req.user.id, // assumes authentication middleware sets req.user
      category,
    });
    await club.save();
    res.status(201).json({ message: "Club created successfully", club });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all clubs
exports.getClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single club by ID
exports.getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }
    res.json(club);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a club
exports.updateClub = async (req, res) => {
  try {
    const { name, description,category } = req.body;
    const club = await Club.findByIdAndUpdate(
      req.params.id,
      { name, description ,category },
      { new: true },
    );
    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }
    res.json({ message: "Club updated successfully", club });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a club
exports.deleteClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) {
      return res.status(404).json({ error: "Club not found" });
    }
    res.json({ message: "Club deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
