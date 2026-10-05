const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },
    
    quantity: {
        type: Number,
        required: true,
        min: 0
    },

    category: {
        type: String,
        required: true,
        trim: true,
        minlength: 2
    }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;