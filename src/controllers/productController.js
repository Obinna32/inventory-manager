const Product = require("../models/Product");

const getProducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    }catch(error){
        res.staus(500).json({message: error.message});
    }
};

const createProduct = async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(201).json(product);
    }catch(error){
        res.status(400).json({message: error.message});
    }
};

const getProduct = async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.json(product);
    }catch(error){
        res.status(400).json({message: "Invalid product ID"});
    }
};

const updateProduct = async (req, res) => {
    try{
        const { name, price, quantity, category } = req.body;

        if (!name || price === undefined || quantity === undefined || !category){
            return res.status(400).json({ message: "Name, price, quantity and category are required"});
        }
        if (price < 0 || quantity < 0){
            return res.status(400).json({message: "Price and quantity cannot be negative"});
        }

        const product = await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, category}, {new: true, runValidators: true});

        if (!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.json(product);
    }catch(error){
        res.status(400).json({message: "Invalid product ID"});
    }
};

const deleteProduct = async(req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.json({message: "Product deleted successfully", product});
    }catch(error){
        res.status(400).json({message: "Invalid product ID"});
    }
};


module.exports = {getProducts, createProduct, getProduct, updateProduct, deleteProduct};