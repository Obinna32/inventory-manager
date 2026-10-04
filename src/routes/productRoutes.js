const express = require("express");
const Product = require("../models/Product");
const router = express.Router();
const { getProducts, createProduct, getProduct, updateProduct, deleteProduct} = require("../controllers/productController");

router.get("/products", getProducts);

router.get("/products/:id", getProduct);

router.post("/products", createProduct);

router.put("/products/:id", updateProduct);

router.delete("products/:id", deleteProduct);

module.exports = router;