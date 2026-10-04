const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const { getProducts } = require("../controllers/productController");

router.get("/products", getProducts);

router.get("/products/:id", async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.json(product);
    }catch(error){
        res.status(400).json({message: "Invalid product ID"});
    }
});

router.post("/products", async (req,res) => {
    try{
        const product = await Product.create(req.body);

        res.status(201).json(product);
    } catch(error){
        res.status(400).json({
            message: error.message
        });
    }
});

router.put("/products/:id", async (req, res) => {
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
});

router.delete("products/:id", async(req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.json({message: "Product deleted successfully", product});
    }catch(error){
        res.status(400).json({message: "Invalid product ID"});
    }
});


module.exports = router;