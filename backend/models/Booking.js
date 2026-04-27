// models/Booking.js - Schema for table reservations
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Booking date is required"],
    },
    time: {
      type: String,
      required: [true, "Booking time is required"],
    },
    guests: {
      type: Number,
      required: [true, "Number of guests is required"],
      min: [1, "At least 1 guest required"],
      max: [20, "Maximum 20 guests per booking"],
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
