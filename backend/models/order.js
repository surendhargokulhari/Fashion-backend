const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  img: String,
  price: Number,
  selectedSize: String,
  address: {
    doorNo: String,
    city: String,
    pincode: String,
    phone: String
  },
  paymentMethod: String,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Order", orderSchema);
