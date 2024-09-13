import User from '../models/User.js';
import Order from '../models/Order.js';
import Wishlist from '../models/Wishlist.js';

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

export const updateProfile = async (req, res) => {
    const {name, email, password} = req.body;

    // build user oject based on fields submiited
    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (password) updatedFields.password = password;

    try {
        let user = await User.findById(req.user.id);

        if(!user){
            return res.status(404).json({msg: 'User not found'});
        }

        user = await User.findByIdAndUpdate(
            req.user.id,
            {$set: updatedFields},
            {new: true}
        ).select('-password');

        res.json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

export const getOrderHistory = async (req, res) => {
    try {
        const orders = await Order.find({user: req.user.id });
        res.json(orders);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

export const getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.find({ user: req.user.id });
        res.json(wishlist);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};