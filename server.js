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

app.get("/products/:id", async(req, res) => {
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

app.post("/products", async (req, res) => {
  try {
    // Check if the request body is an array (bulk insert)
    if (Array.isArray(req.body)) {
      const products = await Product.insertMany(req.body);
      return res.status(201).json(products);
    }

    // Single product insert
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
});

app.put("/products/:id", async (req, res) => {
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

app.delete("products/:id", async(req, res) => {
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});