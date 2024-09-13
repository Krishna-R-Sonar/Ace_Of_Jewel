import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

//create a new appointment
export const createAppointment = async (req, res) => {
    //validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {userId, date, time, description} = req.body;

    try {
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({msg: 'User not found'});
        }

        const newAppointment = new Appointment({
            userId,
            date,
            time,
            description,
        });

        const savedAppointment = await newAppointment.save();
        res.status(201).json(savedAppointment);
    } catch (error) {
        console.log(error.message);
        res.status(201).json('Server error');
    }
};

// get all appointments for a specific user
export const getAppointmentsByUserId = async (req, res) => {
    const {userId} = req.params;

    try {
        const appointments = await Appointment.find({userId});

        if(!appointments.length) {
            return res.status(404).json({msg: 'No appointments found for this user'});
        }

        res.json(appointments);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

//update a specific appointment
export const updateAppointment = async (req, res) => {
    //validate request data
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {appointmentId} = req.params;
    const {date, time, description} = req.body;

    try {
        let appointment = await Appointment.findById(appointmentId);

        if(!appointment){
            return res.status(404).json({msg: 'Appointment not found'});
        }

        appointment.date = date || appointment.date;
        appointment.time = time || appointment.time;
        appointment.description = description || appointment.description;

        const updatedAppointment = await appointment.save();
        res.json(updatedAppointment);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// delete a specific appointment
export const deleteAppointment = async () => {
    const {appointmentId} = req.params;

    try {
        const appointment = await Appointment.findByIdAndDelete(appointmentId);

        if(!appointment) {
            return res.status(404).json({msg: 'Appointment not found'});
        }

        res.json({msg: 'Appointment removed'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};