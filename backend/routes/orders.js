const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// POST a new order
router.post("/", async (req, res) => {
  try {
    const { price, ...rest } = req.body;

    // Clean price (remove ₹ or other non-numeric symbols)
    const cleanedPrice = parseFloat(price.toString().replace(/[^\d.]/g, ""));

    const newOrder = new Order({
      ...rest,
      price: cleanedPrice,
    });

    const savedOrder = await newOrder.save();

    // ✅ Return saved order (with _id) to frontend
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("POST /api/orders error:", error);
    res.status(400).json({ message: "Failed to place order", error: error.message });
  }
});

// DELETE an order by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/orders/:id error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// GET all orders
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});



module.exports = router;
