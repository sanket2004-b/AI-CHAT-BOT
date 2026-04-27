// controllers/bookingController.js - Table reservation operations
const Booking = require("../models/Booking");

// POST /api/book-table
const createBooking = async (req, res) => {
  try {
    const { name, phone, date, time, guests } = req.body;

    // Validation
    if (!name || !phone || !date || !time || !guests) {
      return res.status(400).json({ error: "All fields are required: name, phone, date, time, guests." });
    }

    if (guests < 1 || guests > 20) {
      return res.status(400).json({ error: "Guests must be between 1 and 20." });
    }

    const booking = await Booking.create({ name, phone, date, time, guests });

    res.status(201).json({
      success: true,
      message: `✅ Table booked successfully for ${name}! Your booking ID is #${booking._id.toString().slice(-6).toUpperCase()}.`,
      data: booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Failed to create booking. Please try again." });
  }
};

// GET /api/book-table
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
};

module.exports = { createBooking, getBookings };
