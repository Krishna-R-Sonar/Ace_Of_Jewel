import Newsletter from '../models/Newsletter.js';
import {validationResult} from 'express-validator';
import {sendEmail} from '../services/emailService.js';

// subscribe to the newsletter
export const subscribeNewsletter = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email} = req.body;

    try {
        // check if the email is already subscribed
        let existingSubscription = await Newsletter.findOne({email});
        if(existingSubscription){
            return res.status(400).json({msg: 'Email is already subscribed'});
        }

        // create a new newsletter subscription

        const newSubscription = new Newsletter({email});
        const savedSubscription = await newSubscription.save();

        // send a welcome email
        await sendEmail.sendWelcomeEmail(email);

        res.status(201).json({msg: 'Subscribed successfully', subscription: savedSubscription});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// unsubscribe from the newsletter
export const unsubscribeNewsletter = async (req, res) => {
    const {email} = req.body;

    try {
        // check if the email is subscribed
        const subscription = await Newsletter.findByIdAndDelete(email);

        if(!subscription){
            return res.status(404).json({msg: 'Subscription not found'});
        }

        res.json({msg: 'Unsubscribed successfully'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// get all newsletter subscriptions (for admin use)
export const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Newsletter.find();
        res.json(subscriptions);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};