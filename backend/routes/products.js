const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const dataPath = path.join(__dirname, "../data/products.json");

// GET all products
router.get("/", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Unable to read products"
            });
        }

        res.json(JSON.parse(data));
    });
});

// GET product by ID
router.get("/:id", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({
                message: "Unable to read products"
            });
        }

        const products = JSON.parse(data);

        const product = products.find(
            item => item.id === parseInt(req.params.id)
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json(product);
    });
});

module.exports = router; 
