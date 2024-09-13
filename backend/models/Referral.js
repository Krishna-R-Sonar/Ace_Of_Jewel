import mongoose from 'mongoose';

const ReferralSchema = new mongoose.Schema({
    referrer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    referredUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    referralCode: {
        type: String,
        required: true,
        unique: true,
    },
    reward: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Expired'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
});

ReferralSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Referral = mongoose.model('Referral', ReferralSchema);

export default Referral;
