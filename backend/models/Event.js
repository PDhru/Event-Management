const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  maxAttendees: { type: Number, required: true },
  eventType: { type: String, required: true },
  image: { type: String }, // Optional image field
  rsvpList: {
    type: [mongoose.Schema.Types.ObjectId], 
    ref: 'User',
    default: [] 
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Event = mongoose.model('Event', eventSchema); 
module.exports = Event; 
