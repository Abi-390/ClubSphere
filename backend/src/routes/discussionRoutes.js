const express = require("express");
const router = express.Router();
const discussionController = require("../controllers/discussionController");
const auth = require("../middlewares/authMiddleware");

// Create root discussion
router.post("/creatediscussion", auth, discussionController.createDiscussion);

// Reply to a discussion (threaded)
router.post("/replytodiscussion/:id", auth, discussionController.replyToDiscussion);

// Get all root discussions
router.get("/getdiscussions/:clubId", auth, discussionController.getDiscussions);

// Get replies of a discussion
router.get("/getreplies/:id", auth, discussionController.getReplies);

// Get single discussion by ID
router.get("/getdiscussionbyid/:id", auth, discussionController.getDiscussionById);

// Update discussion
router.put("/updatediscussion/:id", auth, discussionController.updateDiscussion);

// Delete discussion
router.delete("/deletediscussion/:id", auth, discussionController.deleteDiscussion);

module.exports = router;
