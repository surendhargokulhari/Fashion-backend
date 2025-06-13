const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Order = require("./models/order"); // Adjust the path as needed

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
mongoose.connect("mongodb+srv://root:MySecurePassword@cluster0.l7sub8i.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Atlas connected"))
.catch((err) => console.error("❌ MongoDB connection failed:", err));

// Routes
app.post("/api/orders", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error("❌ Order save error:", err);
    res.status(400).json({ error: "Failed to save order" });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
