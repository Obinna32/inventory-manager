require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const Product = require("./src/models/Product");
const productRoutes = require("./src/routes/productRoutes");

const app = express();

app.use(express.json());
app.use(productRoutes);

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



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});