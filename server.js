require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

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

const products = [
    {
        id: 1,
        name: "Wireless Mouse",
        price: 8500,
        quantity: 10
    },
    {
        id: 2,
        name: "Keyboard",
        price: 12000,
        quantity: 5
    }
]

app.get("/", (req, res) => {
    res.send("Inventory Manager API is running");
});

app.get("/products", (req, res) => {
    res.json(products);
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

app.post("/products", (req,res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
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