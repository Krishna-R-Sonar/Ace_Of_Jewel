import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
    },
    feedback: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Testimonial = mongoose.model('Testimonial', TestimonialSchema);

export default Testimonial;
