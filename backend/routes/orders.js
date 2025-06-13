const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// POST /api/orders
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Order saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving order" });
  }
});


// Optional: GET all orders (for testing)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

module.exports = router;
