import mongoose, { now } from "mongoose";

const CustomizationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    customization: {
        type: Map, // or object, depanding on how you want to structure the coustomizations
        of: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

CustomizationSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Customization = mongoose.model('Customization', CustomizationSchema);

export default Customization;