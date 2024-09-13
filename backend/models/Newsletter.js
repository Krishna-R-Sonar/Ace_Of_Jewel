import mongoose from 'mongoose';

const NewsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
    },
    subscribedAt: {
        type: Date,
        default: Date.now,
    },
    isSubscribed: {
        type: Boolean,
        default: true,
    }
});

const Newsletter = mongoose.model('Newsletter', NewsletterSchema);

export default Newsletter;
