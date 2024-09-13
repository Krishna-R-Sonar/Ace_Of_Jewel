import Product from '../models/Product.js';
import Category from '../models/Category.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        if(!category){
            return res.status(404).msg({msg: 'Category not found'});
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

export const searchProducts = async(req, res) => {
    try {
        const {query} = req.query;
        const products = await Product.find({name: {$regex: query, $options: 'i'}});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
}

export const addProduct = async (req, res) => {
    const {name, price, category, description, stock} = req.body;

    try {
        const newProduct = new Product({
            name,
            price,
            category,
            description,
            stock,
        });

        const product = await newProduct.save();
        res.json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

export const updateProduct = async (req, res) => {
    const {name, price, category, description, stock} = req.body;

    try {
        let product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({ msg: 'Product not found'});
        }

        product.name = name;
        product.price = price;
        product.category = category;
        product.description = description;
        product.stock = stock;

        await product.save();
        res.json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        await product.remove();
        res.json({msg: 'Product removed'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error');
    }
};