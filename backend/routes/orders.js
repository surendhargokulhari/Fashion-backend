const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// GET all orders
router.post("/", async (req, res) => {
  try {
    const { price, ...rest } = req.body;

    const cleanedPrice = parseFloat(price.toString().replace(/[^\d.]/g, ""));

    const newOrder = new Order({
      ...rest,
      price: cleanedPrice,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("POST /api/orders error:", error);
    res.status(400).json({ error: error.message });
  }
});



// POST a new order
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: "Failed to place order", error: err.message });
  }
});

module.exports = router;
