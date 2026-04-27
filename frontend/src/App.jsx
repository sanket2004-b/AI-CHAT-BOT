// App.jsx - Main Restaurant Chatbot Application
import { useState, useRef, useEffect } from "react";
import { useChat } from "./hooks/useChat";
import MessageBubble from "./components/MessageBubble";
import BookingForm from "./components/BookingForm";

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #d4813a, #8b3a0a)" }}>
        🍽️
      </div>
      <div className="px-4 py-3 rounded-2xl" style={{ background: "#1f1008", border: "1px solid #3a1a05", borderRadius: "4px 18px 18px 18px" }}>
        <div className="flex gap-1.5 items-center">
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
      </div>
    </div>
  );
}

// ─── Quick reply bar ──────────────────────────────────────────────────────────
const QUICK_REPLIES = [
  { label: "🍕 Menu", value: "View Menu" },
  { label: "🪑 Book Table", value: "Book Table" },
  { label: "📦 Track Order", value: "Track Order" },
  { label: "🕐 Timings", value: "Timings" },
  { label: "📍 Contact", value: "Contact Us" },
];

export default function App() {
  const {
    messages, isTyping, sendMessage, clearChat,
    showBookingForm, setShowBookingForm,
  } = useChat();

  const [input, setInput] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleSuggestion = (text) => {
    sendMessage(text);
    inputRef.current?.focus();
  };

  const handleAction = (action) => {
    if (action === "SHOW_BOOKING_FORM") setShowBookingForm(true);
  };

  const handleBookingSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 5000);
    sendMessage("I just made a table booking!");
  };

  return (
    <div className="grain min-h-screen flex flex-col items-center justify-center p-3 md:p-6"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #2a0e00 0%, #0d0500 60%)" }}>

      {/* ─── Chat Card ─── */}
      <div className="w-full max-w-lg flex flex-col rounded-3xl overflow-hidden shadow-2xl"
        style={{ height: "min(700px, 92vh)", border: "1px solid #3a1a05", background: "#0d0500" }}>

        {/* ─── Header ─── */}
        <div className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #1a0800 0%, #2a1005 100%)", borderBottom: "1px solid #3a1a05" }}>
          {/* Logo */}
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #d4813a, #8b3a0a)" }}>
            🍽️
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-base truncate" style={{ color: "#f5e6d0", fontFamily: "'Playfair Display', serif" }}>
              Bella Vista Restaurant
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
              <span className="text-xs" style={{ color: "#a0845c" }}>Virtual Assistant • Always Online</span>
            </div>
          </div>

          {/* Clear button */}
          <button
            onClick={clearChat}
            className="flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors"
            style={{ background: "#1f0d05", border: "1px solid #3a1a05", color: "#a0845c" }}
            title="Clear chat"
          >
            Clear
          </button>
        </div>

        {/* ─── Quick Replies ─── */}
        <div className="flex gap-2 px-4 py-2.5 overflow-x-auto flex-shrink-0 hide-scrollbar"
          style={{ borderBottom: "1px solid #1f0d05" }}>
          {QUICK_REPLIES.map((r) => (
            <button
              key={r.value}
              onClick={() => handleSuggestion(r.value)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all"
              style={{ background: "#1a0800", border: "1px solid #3a1a05", color: "#d4813a" }}
              onMouseEnter={e => { e.target.style.background = "#3a1805"; }}
              onMouseLeave={e => { e.target.style.background = "#1a0800"; }}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* ─── Messages ─── */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              onSuggestionClick={handleSuggestion}
              onActionClick={handleAction}
            />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* ─── Success Banner ─── */}
        {successMessage && (
          <div className="mx-4 mb-2 px-4 py-2 rounded-xl text-sm text-center msg-animate"
            style={{ background: "#0a2010", border: "1px solid #2a5a20", color: "#4ade80" }}>
            {successMessage}
          </div>
        )}

        {/* ─── Input ─── */}
        <div className="flex gap-2 px-4 py-3 flex-shrink-0"
          style={{ borderTop: "1px solid #1f0d05", background: "#0d0500" }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything… e.g. 'Show me pizza'"
            className="flex-1 px-4 py-2.5 rounded-2xl text-sm outline-none"
            style={{
              background: "#1a0800",
              border: "1px solid #3a1a05",
              color: "#f5e6d0",
              caretColor: "#d4813a",
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all active:scale-95"
            style={{
              background: input.trim() && !isTyping
                ? "linear-gradient(135deg, #d4813a, #8b3a0a)"
                : "#1a0800",
              border: "1px solid #3a1a05",
              color: input.trim() && !isTyping ? "#fff" : "#5a3a20",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* ─── Branding ─── */}
      <p className="mt-4 text-xs text-center" style={{ color: "#3a2010" }}>
        Bella Vista © 2024 · Rule-Based Chatbot · No AI APIs
      </p>

      {/* ─── Booking Modal ─── */}
      {showBookingForm && (
        <BookingForm
          onClose={() => setShowBookingForm(false)}
          onSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
}
