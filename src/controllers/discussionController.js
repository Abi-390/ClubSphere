const Discussion = require("../models/discussionModel");

// Create a new discussion
exports.createDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.create(req.body);
    res
      .status(201)
      .json({ message: "Discussion created successfully", discussion });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all discussions
exports.getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find() 
      .populate("author", "name email")
      .populate("club", "name")
      .populate("event", "name")
      .populate("replies");
    res.json({ discussions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single discussion by ID
exports.getDiscussionById = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id)
      .populate("author", "name email")
      .populate("club", "name")
      .populate("event", "name")
      .populate("replies");
    if (!discussion)
      return res.status(404).json({ error: "Discussion not found" });
    res.json({ discussion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a discussion
exports.updateDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    if (!discussion)
      return res.status(404).json({ error: "Discussion not found" });
    res.json({ message: "Discussion updated successfully", discussion });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a discussion
exports.deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByIdAndDelete(req.params.id);
    if (!discussion)
      return res.status(404).json({ error: "Discussion not found" });
    res.json({ message: "Discussion deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
