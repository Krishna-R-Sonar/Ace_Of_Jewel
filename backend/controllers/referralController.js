import Referral from '../models/Referral.js';
import User from '../models/User.js';
import {validationResult} from 'express-validator';

//create a new referral
export const createReferral = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {userId, referralUserId} = req.body;

    try {
        const user = await User.findById(userId);
        const referredUser = await User.findById(referralUserId);

        if(!user || !referredUser){
            return res.status(404).json({msg: 'User or referred user not found'});
        }

        const newReferral = new Referral({
            userId,
            referralUserId,
            status: 'Pending', // default status when a referral is created
        });

        const savedReferral = await newReferral.save();
        res.status(201).json(savedReferral);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// get all referrals for a specific user
export const getReferralsByUserId = async (req, res) => {
    const {userId} = req.params;

    try {
        const referrals = await Referral.find({userId});

        if(!referrals.length){
            return res.status(404).json({msg: 'No referrals found for this user'});
        }

        res.json(referrals);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// update the status of a specific referral
export const updateReferralStatus = async (req, res) => {
    const {referralId} = req.params;
    const {status} = req.body;

    //validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        let referral = await Referral.findById(referralId);

        if(!referral){
            return res.status(404).json({msg: 'Referral not found'});
        }

        referral.status = status || referral.status;

        const updatedReferral = await referral.save();
        res.json(updatedReferral);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

//delete a specific referral
export const deleteReferral = async (req, res) => {
    const {referralId} = req.params;

    try {
        const referral = await Referral.findByIdAndDelete(referralId);

        if(!referral){
            return res.status(404).json({msg: 'Referral not found'});
        }

        res.json({msg: 'Referral removed'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};