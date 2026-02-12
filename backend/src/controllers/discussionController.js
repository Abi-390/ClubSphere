const Discussion = require('../models/discussionModel');

// Create a new root discussion
exports.createDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.create({
      ...req.body,//spread operator to include title, content, club, event
      parent: null,
      depth: 0,
      author: req.user.id,
    });
    res.status(201).json({ message: 'Discussion created successfully', discussion });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Reply to a discussion (threaded)
exports.replyToDiscussion = async (req, res) => {
  try {
    const parentDiscussion = await Discussion.findById(req.params.id);
    if (!parentDiscussion) {
      return res.status(404).json({ error: 'Parent discussion not found' });
    }
    if (parentDiscussion.depth >= 2) {
      return res.status(400).json({ error: 'Max reply depth reached' });
    }
    const reply = await Discussion.create({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id,
      club: parentDiscussion.club,
      event: parentDiscussion.event,
      parent: parentDiscussion._id,
      depth: parentDiscussion.depth + 1,
    });
    res.status(201).json({ message: 'Reply created successfully', reply });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getReplies = async (req, res) => {
  try {
    const replies = await Discussion.find({ parent: req.params.id })
      .populate('author', 'username email')
      .sort({ createdAt: 1 });

    res.json({ replies });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all discussions
exports.getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find({
      club: req.params.clubId,
      parent: null
    })
      .populate("author", "username email")
      .populate("club", "username")
      .populate("event", "username")
      .sort({ createdAt: -1 });

    res.json({ discussions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Get a single discussion by ID
exports.getDiscussionById = async (req, res) => {
  try {
    const discussion = await Discussion.findById(req.params.id)
      .populate('author', 'username email')
      .populate('club', 'username')
      .populate('event', 'username')
      .populate('parent', 'title');
    if (!discussion) return res.status(404).json({ error: 'Discussion not found' });
    res.json({ discussion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a discussion
exports.updateDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!discussion) return res.status(404).json({ error: 'Discussion not found' });
    res.json({ message: 'Discussion updated successfully', discussion });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a discussion
exports.deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByIdAndDelete(req.params.id);
    if (!discussion) return res.status(404).json({ error: 'Discussion not found' });
    res.json({ message: 'Discussion deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};