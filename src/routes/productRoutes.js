const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const { getProducts, createProduct, getProduct, updateProduct} = require("../controllers/productController");

router.get("/products", getProducts);

router.get("/products/:id", getProduct);

router.post("/products", createProduct);

router.put("/products/:id", updateProduct);

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