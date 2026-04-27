// controllers/orderController.js - Order management operations
const Order = require("../models/Order");

// POST /api/order
const createOrder = async (req, res) => {
  try {
    const { customerName, items, totalPrice } = req.body;

    if (!customerName || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "customerName and at least one item are required." });
    }

    if (!totalPrice || totalPrice <= 0) {
      return res.status(400).json({ error: "Valid totalPrice is required." });
    }

    const order = await Order.create({ customerName, items, totalPrice });

    res.status(201).json({
      success: true,
      message: `🎉 Order placed successfully! Your Order ID is ORD-${order._id.toString().slice(-6).toUpperCase()}. Estimated delivery: 30-45 mins.`,
      data: order,
    });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ error: "Failed to place order. Please try again." });
  }
};

// GET /api/order/:id
const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: "Order not found." });

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order." });
  }
};

module.exports = { createOrder, getOrder };
