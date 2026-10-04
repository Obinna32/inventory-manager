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

module.exports = {getProducts, createProduct, getProduct};