const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: false,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: false,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DiscussionReply",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Discussion", discussionSchema);
