import Testimonial from '../models/Testimonials.js';
import {validationResult} from 'express-validator';

// create a new testimonial
export const createTestimonial = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {user, content, rating} = req.body;

    try {
        const newTestimonial = new Testimonial({
            user,
            content,
            rating
        });

        const savedTestimonials = await newTestimonial.save();
        res.status(201).json(savedTestimonials);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};


// get all testimonials
export const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// get a specific testimonial by id
export const getTestimonialById = async (req, res) => {
    const {testimonialId} = req.params;

    try {
        const testimonial = await Testimonial.findById(testimonialId);

        if(!testimonial){
            return res.status(404).json({msg: 'Testimonial not found'});
        }

        res.json(testimonial);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// update a testimonial
export const updateTestimonial = async (req, res) => {
    const {testimonialId} = req.params;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {content, rating} = req.body;

    try {
        let testimonial = await Testimonial.findById(testimonialId);

        if(!testimonial){
            return res.status(404).json({msg: 'Testimonial not found'});
        }

        testimonial.content = content || testimonial.content;
        testimonial.rating = rating || testimonial.rating;

        const updatedTestimonial = await testimonial.save();
        res.json(updatedTestimonial);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

// delete a testimonial
export const deleteTestimonial = async (req, res) => {
    const {testimonial} = req.params;

    try {
        const testimonial = await Testimonial.findByIdAndDelete(testimonialId);

        if(!testimonial){
            return res.status(404).json({msg: 'Testimonial not found'});
        }

        res.json({msg: 'Testimonial removed'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};