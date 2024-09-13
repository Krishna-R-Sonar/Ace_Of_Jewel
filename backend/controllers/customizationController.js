import Customization from '../models/Customization.js';
import {validationResult} from 'express-validator';

//create a new customization
export const createCustomization = async (req, res) => {
    // validate request data
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {userId, customizationDetails} = req.body;

    try {
        const newCustomization = new Customization({
            userId,
            customizationDetails,
        });

        const savedCustomization = await newCustomization.save();
        res.status(201).json(savedCustomization);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// get customization by user id
export const getCustomizationByUserId = async (req, res) => {
    const {userId} = req.params;

    try {
        const customization = await Customization.findOne({userId});

        if(customization) {
            return res.status(404).json({msg: 'Customization not found'});
        }

        res.json(customization);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// update customization by user id
export const updateCustomization = async (req, res) => {
    // validate request data
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {userId} = req.params;
    const {customizationDetails} = req.body;

    try {
        let customization = await Customization.findOne({userId});

        if(!customization) {
            return res.status(404).json({msg: 'Customization not found'});
        }

        customization.customizationDetails = customizationDetails;

        const updatedCustomization = await customizationDetails;
        res.json(updatedCustomization);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

export const deleteCustomization = async (req, res) => {
    const {userId} = req.params;

    try {
        const customization = await Customization.findOneAndDelete({userId});

        if(!customization) {
            return res.status(404).json({msg: 'Customization not found'});
        }

        res.json({msg: 'Customization removed'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};