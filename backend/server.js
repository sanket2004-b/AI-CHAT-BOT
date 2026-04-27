// server.js - Main entry point for the Restaurant Chatbot API
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const chatRoutes = require("./routes/chatRoutes");
const menuRoutes = require("./routes/menuRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/chat", chatRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/book-table", bookingRoutes);
app.use("/api/order", orderRoutes);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "🍕 Restaurant Chatbot API is running!" });
});

// ─── MongoDB Connection ───────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/restaurant_chatbot";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
