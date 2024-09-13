import Gift from '../models/Gift.js';
import User from '../models/User.js';
import {validationResult} from 'express-validator';

// create a new gift entry
export const createGift = async (req, res) => {
    // validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {userId, giftType, message, deliveryDate} = req.body;

    try {
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({msg: 'User not found'});
        }

        const newGift = new Gift({
            userId,
            giftType,
            message,
            deliveryDate,
        });

        const savedGift = await newGift.save();
        res.status(201).json(savedGift);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// get all gifts for a specific user
export const getGiftsByUserId = async (req, res) => {
    const {userId} = req.params;

    try {
        const gifts = await Gift.find({userId});

        if(!gifts.length){
            return res.status(404).json({msg: 'No gifts found for this user'});
        }

        res.json(gifts);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// update a specific gift
export const updateGift = async(req, res) => {
    // validate request data
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {giftId} = req.params;
    const {giftType, message, deliveryDate} = req.body;

    try {
        let gift = await Gift.findById(giftId);

        if(!gift){
            return res.status(404).json({msg: 'Gift not found'});
        }

        gift.giftType = giftType || gift.giftType;
        gift.message = message || gift.message;
        gift.deliveryDate = deliveryDate || gift.deliveryDate;

        const updatedGift = await gift.save();
        res.json(updatedGift);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

//delete a specific gift
export const deleteGift = async (req, res) => {
    const {gifted} = req.params;

    try {
        const gift = await Gift.findByIdAndDelete(giftId);

        if(!gift){
            return res.status(404).json({msg: 'Gift not found'});
        }

        res.json({msg: 'Gift removed'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};