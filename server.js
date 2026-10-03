const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

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
    productId = Number(req.params.id) - 1;
    whatProduct = products[productId]
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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});