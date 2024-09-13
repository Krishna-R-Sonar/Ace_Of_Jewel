import mongoose from 'mongoose';

const GiftSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipientEmail: {
        type: String,
        required: true,
    },
    giftAmount: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        default: '',
    },
    code: {
        type: String,
        unique: true,
        required: true,
    },
    redeemed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    redeemedAt: {
        type: Date,
    },
});

GiftSchema.pre('save', function(next) {
    if(this.isModified('redeemed') && this.redeemed){
        this.redeemedAt = Date.now();
    }
    next();
});

const Gift = mongoose.model('Gift', GiftSchema);

export default Gift;

