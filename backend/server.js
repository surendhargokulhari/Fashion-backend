const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const orderRoutes = require("./routes/orders");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// ✅ CORS Middleware – Put this AFTER express.json but BEFORE routes
app.use(cors({
  origin: ["http://localhost:3000", "https://fashion-flick-4ag8.vercel.app/"]
}));

// Routes
app.use("/api/orders", orderRoutes);

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/fashion_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
