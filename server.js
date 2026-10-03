require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Product = require("./src/models/Product");

const app = express();

app.use(express.json());

const PORT = 3000;

mongoose
.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((error) => {
    console.error("MongoDB connection failed:", error);
});


app.get("/", (req, res) => {
    res.send("Inventory Manager API is running");
});

app.get("/products", async(req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    }catch(error){
        res.status(500).json({
            message: error.message
        });
    }
});

app.get("/products/:id", (req, res) => {
    const productId = Number(req.params.id);
    if(Number.isNaN(productId)){
        return res.status(400).json({message: "Product ID must be a number"});
    }
    const whatProduct = products.find((product) => product.id === productId);
    if (!whatProduct){
        return res.status(404).json({message: "Product not found"});
    }
    res.json(whatProduct);
})

app.post("/products", async (req,res) => {
    try{
        const product = await Product.create(req.body);

        res.status(201).json(product);
    } catch(error){
        res.status(400).json({
            message: error.message
        });
    }
});

app.put("/products/:id", (req, res) => {
    const productId = Number(req.params.id);
    const product = products.find((product) => product.id === productId);

    if (!product) {
        return res.status(404).json({message: "Product not found"});
    }
    const { name, price, quantity } = req.body;
    if (!name || price === undefined || quantity === undefined){
        return res.status(400).json({message: "Name, price and quantity are require"});
    }

    if (price < 0 || quantity < 0){
        return res.status(400).json({message: "Price and quantity cannot be negative"});
    }
    product.name = name;
    product.price = price;
    product.quantity = quantity;

    res.json(product);
});

app.delete("products/:id", (req, res) => {
    const productId = Number(req.params.id);

    const productIndex = products.findIndex((product) => product.id === productId);
    
    if (productIndex === -1){
        return res.status(404).json({message: "Product not found"});
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.json({message: "Product deleted successfully", product: deletedProduct[0]});
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});