// models/Menu.js - Schema for restaurant menu items
const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Pizza", "Burger", "Pasta", "Salad", "Drinks", "Desserts", "Sides"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    description: {
      type: String,
      default: "",
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
