const express = require('express');
const { createEvent } = require('../controllers/eventController');
const authMiddleware = require('../middlewares/authMiddleware'); // Import the auth middleware
const upload = require('../middlewares/multerConfig'); // Import Multer config
const Event = require('../models/Event'); 

const router = express.Router();

router.post('/create', authMiddleware, upload.single('image'), createEvent);

router.get('/', async (req, res) => {
    try {
      const events = await Event.find(); 
      res.status(200).json(events);
      console.log('Event Model:', Event);
    } catch (error) {
      console.error('Error fetching events:', error.message);
      res.status(500).json({ error: 'Failed to fetch events' });
    }
  });
  
  router.get('/user-events', authMiddleware, async (req, res) => {
    try {
      const userId = req.user.userId; // Extract user ID from the JWT token
      const events = await Event.find({ createdBy: userId }); // Find events created by this user
      res.status(200).json(events);
    } catch (err) {
      console.error('Error fetching user events:', err.message);
      res.status(500).json({ error: 'Failed to fetch user events' });
    }
  });

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // If a new image is uploaded, use it, otherwise keep the old one
    const updatedEvent = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      maxAttendees: req.body.maxAttendees,
      eventType: req.body.eventType,
      image: req.file ? req.file.path : event.image // Use the new image or keep the old one
    };

    const updated = await Event.findByIdAndUpdate(req.params.id, updatedEvent, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ msg: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});



router.post('/:id/rsvp', authMiddleware, async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.userId; // Assuming the user ID is available from the JWT

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Check if the user has already RSVP'd
    if (event.rsvpList.includes(userId)) {
      return res.status(400).json({ message: 'You have already RSVP\'d to this event' });
    }

    // Check if max attendees limit is reached
    if (event.rsvpList.length >= event.maxAttendees) {
      return res.status(400).json({ message: 'Event has reached maximum number of attendees' });
    }

    // Add user to the RSVP list
    event.rsvpList.push(userId);
    await event.save();

    res.status(200).json({ message: 'You have successfully RSVP\'d to the event' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to RSVP to the event' });
  }
});

module.exports = router;
