const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const orderRoutes = require("./routes/orders");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS Setup
app.use(cors({
  origin: [
    "http://localhost:3000",               // for local dev
    "https://your-frontend.onrender.com"   // for deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/orders", orderRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(process.env.PORT, () =>
    console.log(`🚀 Server running on port ${process.env.PORT}`)
  );
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
