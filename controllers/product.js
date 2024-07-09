const Product = require('../models/product');

const createProduct = async(req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock
        });

        const newProduct = await product.save();
        res.status(201).json({ message: 'Product Created Successfully!', data: newProduct });

    } catch(err) {
        res.status(400).json({ message: err.message });
    }
}

const getProduct = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product retrieved successfully', data: product });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

const updateProduct = async(req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product Updated Successfully!', data: product });
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteProduct = async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product Deleted Successfully!' });
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
}

const listProducts = async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ message: 'Products retrieved successfully', data: products });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
    listProducts
}
