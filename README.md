# 🍽️ Bella Vista — Rule-Based Restaurant Chatbot (MERN Stack)

A complete, production-style restaurant chatbot built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) using **zero AI APIs** — entirely rule-based keyword matching.

---

## 📁 Project Structure

```
restaurant-chatbot/
├── backend/
│   ├── controllers/
│   │   ├── chatController.js      ← Rule-based chatbot engine
│   │   ├── menuController.js      ← Menu CRUD + seeding
│   │   ├── bookingController.js   ← Table reservations
│   │   └── orderController.js     ← Order management
│   ├── models/
│   │   ├── Booking.js             ← Mongoose schema
│   │   ├── Order.js               ← Mongoose schema
│   │   └── Menu.js                ← Mongoose schema
│   ├── routes/
│   │   ├── chatRoutes.js
│   │   ├── menuRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── orderRoutes.js
│   ├── server.js                  ← Express entry point
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── MessageBubble.jsx  ← Chat message renderer
    │   │   └── BookingForm.jsx    ← Table reservation modal
    │   ├── hooks/
    │   │   └── useChat.js         ← Chat state & API hook
    │   ├── utils/
    │   │   └── chatbotRules.js    ← Frontend rule engine (fallback)
    │   ├── App.jsx                ← Main app component
    │   ├── index.js
    │   └── index.css
    ├── tailwind.config.js
    └── package.json
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

---

### 1. Clone / Download
```bash
cd restaurant-chatbot
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create environment file
cp .env.example .env
# Edit .env:
#   PORT=5000
#   MONGO_URI=mongodb://localhost:27017/restaurant_chatbot
```

### 3. Start Backend
```bash
npm run dev      # development (nodemon)
# or
npm start        # production
```
✅ Backend runs on `http://localhost:5000`

---

### 4. Frontend Setup
```bash
cd ../frontend
npm install
```

### 5. Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 6. Start Frontend
```bash
npm start
```
✅ Frontend runs on `http://localhost:3000`

---

## 🌐 API Endpoints

| Method | Endpoint          | Description               |
|--------|-------------------|---------------------------|
| POST   | `/api/chat`       | Process user message      |
| GET    | `/api/menu`       | Get all menu items        |
| GET    | `/api/menu?category=Pizza` | Filter by category |
| POST   | `/api/book-table` | Create table booking      |
| GET    | `/api/book-table` | List all bookings         |
| POST   | `/api/order`      | Place new order           |
| GET    | `/api/order/:id`  | Get order by ID           |

### Example: POST /api/chat
```json
// Request
{ "message": "show me pizza menu" }

// Response
{
  "success": true,
  "userMessage": "show me pizza menu",
  "botResponse": {
    "text": "🍕 Our Pizza Menu:\n\n• Margherita Classic — ₹299\n...",
    "suggestions": ["Order Now", "Burger", "View Full Menu"]
  },
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Example: POST /api/book-table
```json
// Request
{
  "name": "Rahul Sharma",
  "phone": "+91 98765 43210",
  "date": "2024-02-14",
  "time": "7:30 PM",
  "guests": 4
}

// Response
{
  "success": true,
  "message": "✅ Table booked successfully for Rahul Sharma! Your booking ID is #AB1C2D.",
  "data": { ...bookingObject }
}
```

---

## 🤖 Chatbot Keywords

| User Says | Bot Responds With |
|-----------|-------------------|
| hi / hello / hey | Welcome greeting |
| menu / food | Show all categories |
| pizza | Pizza items with prices |
| burger | Burger items with prices |
| pasta | Pasta items |
| salad / healthy | Salad options |
| drink / coffee / juice | Beverages menu |
| dessert / sweet | Desserts |
| book / table / reserve | Booking instructions + form |
| timing / open / hours | Opening hours |
| contact / location / address | Contact info |
| order status / track | Order tracking |
| offer / discount / deal | Current promotions |
| price / cost / how much | Price ranges |
| wifi | WiFi info |
| parking | Parking details |
| thank you / awesome | Friendly reply |
| bye / goodbye | Farewell |
| *anything else* | Fallback with suggestions |

---

## 🗄️ MongoDB Schemas

### Booking
```js
{ name, phone, date, time, guests: Number(1-20), status: "confirmed" }
```

### Order
```js
{ customerName, items: [{name, price, quantity}], totalPrice, status: "received" }
```

### Menu
```js
{ itemName, category, price, description, available: Boolean }
```

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| HTTP Client | Fetch API (built-in) |
| Dev Tools | nodemon, dotenv |

---

## 📝 Environment Variables

**backend/.env**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/restaurant_chatbot
```

**frontend/.env** (optional)
```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## ✨ Features

- ✅ Pure rule-based chatbot (no AI APIs)
- ✅ Dual-mode: API + client-side fallback rules
- ✅ Typing animation with realistic delay
- ✅ Auto-scroll to latest message
- ✅ Message timestamps
- ✅ Quick reply suggestion chips
- ✅ Table booking form with validation
- ✅ MongoDB persistence for bookings & orders
- ✅ Menu auto-seeded on first run
- ✅ Mobile responsive design
- ✅ Clear chat button
- ✅ Dark restaurant-themed UI (Playfair Display + DM Sans)

---

*Built with ❤️ — Bella Vista Restaurant Chatbot*
