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

module.exports = {getProducts, createProduct};