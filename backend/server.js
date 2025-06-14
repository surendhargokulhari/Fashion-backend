require("dotenv").config(); // ✅ this line loads your .env file

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const orderRoutes = require("./routes/orders");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/orders", orderRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

