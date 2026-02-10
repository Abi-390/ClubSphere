const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    required: true
  },
  location: String,
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    required: true
  },
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
}

}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);