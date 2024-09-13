import Order from '../models/Order.js'

export const placeOrder = async (req, res) => {
    const {products, shippingAddress, paymentMethod, totalAmount} = req.body;

    try {
        const newOrder = new Order({
            user: req.user.id,
            products,
            shippingAddress,
            paymentMethod,
            totalAmount,
        });

        const order = await newOrder.save();
        res.json(order);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        res.json(order);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email');
        res.json(orders);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

export const updateOrderStatus = async (req, res) => {
    const {status} = req.body;

    try {
        let order = await Order.findById(req.params.id);

        if(!order) {
            return res.status(404).json({msg: 'Order not found'});
        }

        order.status = status;

        await order.save();
        res.json(order);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
}