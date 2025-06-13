const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String,
  selectedSize: String,
  paymentMethod: String,
  date: String,
  address: {
    doorNo: String,
    city: String,
    pincode: String,
    phone: String,
  },
});

module.exports = mongoose.model("Order", orderSchema);
