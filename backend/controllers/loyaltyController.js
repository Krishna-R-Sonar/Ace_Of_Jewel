import Loyalty from '../models/Loyalty.js';
import {validationResult} from 'express-validator';

// create a new loyalty program entry
export const createLoyalty = async (req, res) => {
    // validate request data
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return resizeBy.status(400).json({errors: errors.array()});
    }

    const {userId, points, level} = req.body;

    try {
        const newLoyalty = new Loyalty({
            userId,
            points,
            level,
        });

        const savedLoyalty = await newLoyalty.save();
        resizeBy.status(201).json(savedLoyalty);
    } catch (error) {
        console.log(error.message);
        resizeBy.status(500).send('Server error');
    }
};

// get loyalty program by user id

export const getLoyalByUserId = async (req, res) => {
    const {userId} = req.params;

    try {
        const loyalty = await Loyalty.findOne({userId});

        if(!loyalty) {
            return res.status(404).json({msg: 'Loyalty program not found'});
        }

        res.json(loyalty);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// update loyalty program by user id
export const updateLoyalty = async (req, res) => {
    // validate request data
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {userId} = req.params;
    const {points, level} = req.body;

    try {
        let loyalty = await Loyalty.findOne({userId});

        if(!loyalty) {
            return res.status(404).json({msg: 'Loyalty program not found'});
        }

        loyalty.points = points || loyalty.points;
        loyalty.level = level || loyalty.level;

        const updatedLoyalty = await loyalty.save();
        res.json(updatedLoyalty);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// delete loyalty program by user id
export const deleteLoyalty = async (req, res) => {
    const {userId} = req.params;

    try {
        const loyalty = await Loyalty.findOneAndDelete({userId});

        if(!loyalty) {
            return res.status(404).json({msg: 'Loyalty program not found'});
        }

        res.json({msg: 'Loyalty program removed'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};