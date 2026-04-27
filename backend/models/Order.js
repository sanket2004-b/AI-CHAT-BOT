// models/Order.js - Schema for customer orders
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, "Total price is required"],
      min: 0,
    },
    status: {
      type: String,
      enum: ["received", "preparing", "ready", "delivered", "cancelled"],
      default: "received",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
