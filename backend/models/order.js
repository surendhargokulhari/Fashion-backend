const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: String,
  price: Number,
  img: String,
  selectedSize: String,
  address: {
    doorNo: String,
    city: String,
    pincode: String,
    phone: String,
  },
  paymentMethod: String,
  date: String,
});

module.exports = mongoose.model("Order", orderSchema);
