const express = require("express");
const router = express.Router();
const discussionController = require("../controllers/discussionController");
const auth = require("../middlewares/authMiddleware");
const roleCheck = require("../middlewares/rollcheckMiddleware");

router.post("/creatediscussion", auth, discussionController.createDiscussion);

router.get("/getdiscussions/:clubId", auth, discussionController.getDiscussions);

router.get("/getdiscussionbyid/:id", auth, discussionController.getDiscussionById);

router.put("/updatediscussion/:id", auth, /* roleCheck(['admin', 'owner']),-->future scope*/ discussionController.updateDiscussion);

router.delete("/deletediscussion/:id", auth, /* roleCheck(['admin', 'owner']),-->future scope*/ discussionController.deleteDiscussion);

module.exports = router;
