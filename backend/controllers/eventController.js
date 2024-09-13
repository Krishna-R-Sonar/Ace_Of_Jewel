import Event from '../models/Event.js';
import {validationResult} from 'express-validator';

//create a new event
export const createEvent = async (req, res) => {
    //validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {title, description, date, location, organizer} = req.body;

    try {
        const newEvent = new Event({
            title,
            description,
            date,
            location,
            organizer
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// get all events
export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// get a specific event by id
export const getEventById = async (req, res) => {
    const {eventId} = req.params;

    try {
        const event = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({msg: 'Event not found'});
        }

        res.json(event);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// update a specific event
export const updateEvent = async (req, res) => {
    const {eventId} = req.params;

    //validate request data
    const errors = validationResult(req);
    if(!errors){
        return res.status(400).json({errors: errors.array()});
    }

    const {title, description, date, location, organizer} = req.body;

    try {
        let event = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({msg: 'Event not found'});
        }

        event.title = title || event.title;
        event.description = description || event.description;
        event.date = date || event.date;
        event.location = location || event.location;
        event.organizer = organizer || event.organizer;

        const updatedEvent = await event.save();
        res.json(updatedEvent);

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// delete a specific event
export const deleteEvent = async (req, res) => {
    const {eventId} = req.params;

    try {
        const event = await Event.findByIdAndDelete(eventId);

        if(!event){
            return res.status(404).json({msg: 'Event not found'});
        }

        res.json({msg: 'Event removed'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};