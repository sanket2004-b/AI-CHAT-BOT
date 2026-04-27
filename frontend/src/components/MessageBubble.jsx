// components/MessageBubble.jsx - Renders a single chat message
import { useRef, useEffect } from "react";

// Render markdown-style **bold** text
const renderText = (text) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} style={{ color: "#e8a055" }}>{part.slice(2, -2)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
};

const formatTime = (date) =>
  new Date(date).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

export default function MessageBubble({ message, onSuggestionClick, onActionClick }) {
  const isBot = message.sender === "bot";

  return (
    <div className={`flex items-end gap-2 msg-animate ${isBot ? "justify-start" : "justify-end"}`}>
      {/* Bot avatar */}
      {isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm"
          style={{ background: "linear-gradient(135deg, #d4813a, #8b3a0a)", marginBottom: "20px" }}>
          🍽️
        </div>
      )}

      <div className={`max-w-[82%] ${isBot ? "" : ""}`}>
        {/* Bubble */}
        <div
          className="px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
          style={
            isBot
              ? { background: "#1f1008", border: "1px solid #3a1a05", color: "#f5e6d0", borderRadius: "4px 18px 18px 18px" }
              : { background: "linear-gradient(135deg, #8b3a0a, #5a2005)", color: "#fff", borderRadius: "18px 4px 18px 18px" }
          }
        >
          {isBot ? renderText(message.text) : message.text}
        </div>

        {/* Timestamp */}
        <p className="text-xs mt-1 px-1" style={{ color: "#5a3a20" }}>
          {formatTime(message.timestamp)}
        </p>

        {/* Suggestion chips */}
        {isBot && message.suggestions && message.suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => s === "Book Table Now" ? onActionClick?.("SHOW_BOOKING_FORM") : onSuggestionClick(s)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 active:scale-95"
                style={{
                  background: "transparent",
                  border: "1px solid #d4813a",
                  color: "#d4813a",
                }}
                onMouseEnter={e => { e.target.style.background = "#d4813a"; e.target.style.color = "#fff"; }}
                onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#d4813a"; }}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* User avatar */}
      {!isBot && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm"
          style={{ background: "#2a1005", border: "1px solid #5a2a0a", marginBottom: "20px" }}>
          👤
        </div>
      )}
    </div>
  );
}
