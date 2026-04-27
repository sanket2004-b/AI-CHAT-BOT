// hooks/useChat.js - Custom hook managing all chat state and API calls
import { useState, useCallback } from "react";
import { getBotResponse } from "../utils/chatbotRules";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Helper: send message to backend, fallback to local rules if unavailable
const fetchBotResponse = async (message) => {
  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.botResponse;
  } catch {
    // Fallback to client-side rules if backend is unreachable
    return getBotResponse(message);
  }
};

const createMessage = (sender, text, suggestions = [], action = null) => ({
  id: Date.now() + Math.random(),
  sender,
  text,
  suggestions,
  action,
  timestamp: new Date(),
});

export const useChat = () => {
  const [messages, setMessages] = useState([
    createMessage(
      "bot",
      "👋 Welcome to **Bella Vista Restaurant**! I'm your virtual assistant.\n\nAsk me about our menu, book a table, check timings, or get our contact info!",
      ["View Menu", "Book Table", "Timings", "Contact Us"]
    ),
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, createMessage("user", text)]);
    setIsTyping(true);

    // Simulate realistic typing delay (600ms – 1.2s)
    await new Promise((r) => setTimeout(r, 700 + Math.random() * 500));

    const response = await fetchBotResponse(text);
    setIsTyping(false);

    setMessages((prev) => [
      ...prev,
      createMessage("bot", response.text, response.suggestions || [], response.action || null),
    ]);

    // Handle special actions
    if (response.action === "SHOW_BOOKING_FORM") setShowBookingForm(true);
    if (response.action === "SHOW_ORDER_FORM") setShowOrderForm(true);
  }, []);

  const clearChat = useCallback(() => {
    setMessages([
      createMessage(
        "bot",
        "🔄 Chat cleared! How can I help you today?",
        ["View Menu", "Book Table", "Timings", "Contact Us"]
      ),
    ]);
    setShowBookingForm(false);
    setShowOrderForm(false);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    clearChat,
    showBookingForm,
    setShowBookingForm,
    showOrderForm,
    setShowOrderForm,
  };
};
