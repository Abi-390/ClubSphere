const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"]
    },
    email: { 
      type: String, 
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Invalid email format"]
    },
    passwordHash: { 
      type: String, 
      required: true,
      minlength: 6
    },
    role: { 
      type: String, 
      enum: ["admin", "user"], 
      default: "user",
      index: true
    },
    profile: {
      avatar: { type: String, default: null },
      bio: { type: String, default: "", maxlength: 500 },
      fullName: { type: String, default: "" },
    },
    clubs: [
      {
        clubId: { type: mongoose.Schema.Types.ObjectId, ref: "Club", required: true },
        role: { 
          type: String, 
          enum: ["owner", "moderator", "member"], 
          default: "member" 
        },
        joinedAt: { type: Date, default: Date.now }
      },
    ],
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

// Create indexes for faster queries
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;