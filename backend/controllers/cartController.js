import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({user: req.user.id}).populate('products.product');
        res.json(cart);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;

    try {
        const product = await Product.findById(productId);

        if(!product) {
            return res.status(404).json({msg: 'Product not found'});
        }

        let cart = await Cart.findOne({ user: req.user.id});

        if(!cart){
            cart = new Cart({user: req.user.id, products: []});
        }

        const itemIndex = cart.products.findIndex(p => p.product.toString() === productId);

        if(itemIndex > -1){
            cart.products[itemIndex].quantity += quantity;
        } else {
            cart.products.push({product: productId, quantity});
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

export const removeFromCart = async (req, res) => {
    const {productId} = req.body;

    try {
        let cart = await Cart.findOne({user: req.user.id});
        if(!cart){
            return res.status(404).json({msg: 'Cart not found'});
        }

        cart.products = cart.products.filter(p => p.product.toString() !== productId);

        await cart.save();
        res.json(cart);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};