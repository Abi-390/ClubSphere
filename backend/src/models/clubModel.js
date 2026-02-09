const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Club name is required"],
      unique: true,
      trim: true,
      minlength: [3, "Club name must be at least 3 characters"],
      maxlength: [50, "Club name cannot exceed 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Club description is required"],
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    image: {
      type: String,
      default: null,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["owner", "moderator", "member"],
          default: "member",
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    category: {
      type: String,
      enum: [
        "Sports",
        "Gaming",
        "Academic",
        "Social",
        "Music",
        "Art",
        "Technology",
        "Programming",
        "Other",
      ],
      default: "Other",
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Create indexes for faster queries
clubSchema.index({ owner: 1 });
clubSchema.index({ name: 1 });
clubSchema.index({ category: 1 });

const clubModel = mongoose.model("Club", clubSchema);

module.exports = clubModel;