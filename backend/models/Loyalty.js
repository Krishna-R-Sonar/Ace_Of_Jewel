import mongoose from "mongoose";

const LoyaltySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    points: {
        type: Number,
        default: 0,
    },
    transactions: [{
        type: {
            type: String, // e.g., 'earn', 'redeem'
            required: true,
        },
        points: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

LoyaltySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Loyalty = mongoose.model('Loyalty', LoyaltySchema);

export default Loyalty;