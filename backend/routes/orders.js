const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// POST: Create new order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Order saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save order", details: error });
  }
});

// GET: Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders", details: error });
  }
});

module.exports = router;
