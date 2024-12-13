const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
    const { title, description, date, location, maxAttendees, eventType } = req.body;

    try {
        const event = new Event({
            title,
            description,
            date,
            location,
            maxAttendees,
            eventType,
            image: req.file ? req.file.path : null, 
            createdBy: req.user.userId, 
        });

        await event.save();
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
};

  