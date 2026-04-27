// controllers/chatController.js - Rule-based chatbot logic (NO AI used)

/**
 * Processes a user message and returns an appropriate bot response
 * using keyword matching and rule-based logic.
 */
const getBotResponse = (message) => {
  // Normalize: lowercase and trim whitespace for easy matching
  const msg = message.toLowerCase().trim();

  // ─── Greetings ──────────────────────────────────────────────────────────────
  if (/^(hi|hello|hey|howdy|good morning|good evening|good afternoon|greetings)/.test(msg)) {
    return {
      text: "👋 Welcome to **Bella Vista Restaurant**! I'm your virtual assistant. How can I help you today?\n\nYou can ask me about our menu, book a table, check timings, or place an order!",
      suggestions: ["View Menu", "Book Table", "Timings", "Contact Us"],
    };
  }

  // ─── Menu overview ──────────────────────────────────────────────────────────
  if (msg.includes("menu") || msg.includes("food") || msg.includes("eat") || msg.includes("what do you serve")) {
    return {
      text: "🍽️ Here are our menu categories:\n\n🍕 **Pizza** - Classic & gourmet options\n🍔 **Burgers** - Juicy & loaded\n🍝 **Pasta** - Italian favorites\n🥗 **Salads** - Fresh & healthy\n🥤 **Drinks** - Cold & hot beverages\n🍰 **Desserts** - Sweet endings\n🍟 **Sides** - Fries, onion rings & more\n\nAsk me about any category for detailed items & prices!",
      suggestions: ["Pizza", "Burger", "Pasta", "Desserts"],
    };
  }

  // ─── Pizza ──────────────────────────────────────────────────────────────────
  if (msg.includes("pizza")) {
    return {
      text: "🍕 **Our Pizza Menu:**\n\n• Margherita Classic — ₹299\n• Pepperoni Feast — ₹399\n• BBQ Chicken — ₹429\n• Veggie Supreme — ₹349\n• Four Cheese — ₹449\n• Spicy Paneer — ₹369\n\n*All pizzas available in Regular (9\") and Large (12\") sizes.*\n\nWant to place an order? 😊",
      suggestions: ["Order Now", "View Full Menu", "Book Table"],
    };
  }

  // ─── Burger ─────────────────────────────────────────────────────────────────
  if (msg.includes("burger")) {
    return {
      text: "🍔 **Our Burger Menu:**\n\n• Classic Beef Burger — ₹249\n• Double Smash Burger — ₹329\n• Crispy Chicken Burger — ₹279\n• Veggie Delight Burger — ₹229\n• BBQ Bacon Burger — ₹359\n• Mushroom Swiss Burger — ₹299\n\n*All burgers served with fries & coleslaw!*",
      suggestions: ["Order Now", "View Menu", "Sides"],
    };
  }

  // ─── Pasta ──────────────────────────────────────────────────────────────────
  if (msg.includes("pasta") || msg.includes("spaghetti") || msg.includes("penne")) {
    return {
      text: "🍝 **Our Pasta Menu:**\n\n• Spaghetti Carbonara — ₹319\n• Penne Arrabbiata — ₹289\n• Fettuccine Alfredo — ₹329\n• Pesto Pasta — ₹309\n• Lasagna Bolognese — ₹359\n• Mac & Cheese — ₹269\n\n*Made fresh with authentic Italian sauces!*",
      suggestions: ["Order Now", "View Menu", "Salads"],
    };
  }

  // ─── Salads ─────────────────────────────────────────────────────────────────
  if (msg.includes("salad") || msg.includes("healthy") || msg.includes("vegan")) {
    return {
      text: "🥗 **Our Salad Menu:**\n\n• Caesar Salad — ₹199\n• Greek Salad — ₹219\n• Garden Fresh Salad — ₹179\n• Grilled Chicken Salad — ₹259\n• Quinoa Bowl — ₹279\n• Avocado Salad — ₹249\n\n*Fresh ingredients sourced daily!*",
      suggestions: ["Order Now", "Drinks", "View Menu"],
    };
  }

  // ─── Drinks ─────────────────────────────────────────────────────────────────
  if (msg.includes("drink") || msg.includes("beverage") || msg.includes("juice") || msg.includes("coffee") || msg.includes("tea")) {
    return {
      text: "🥤 **Our Drinks Menu:**\n\n☕ **Hot Beverages:**\n• Espresso — ₹79 | Cappuccino — ₹99 | Latte — ₹109\n\n🧃 **Fresh Juices:**\n• Orange — ₹89 | Mango — ₹99 | Watermelon — ₹79\n\n🥤 **Cold Drinks:**\n• Coke/Pepsi — ₹49 | Lemonade — ₹69 | Iced Tea — ₹79\n\n🥛 **Shakes:**\n• Chocolate — ₹129 | Vanilla — ₹119 | Strawberry — ₹129",
      suggestions: ["Order Now", "Desserts", "View Menu"],
    };
  }

  // ─── Desserts ───────────────────────────────────────────────────────────────
  if (msg.includes("dessert") || msg.includes("sweet") || msg.includes("cake") || msg.includes("ice cream")) {
    return {
      text: "🍰 **Our Desserts Menu:**\n\n• Chocolate Lava Cake — ₹179\n• Tiramisu — ₹199\n• New York Cheesecake — ₹189\n• Vanilla Ice Cream (2 scoops) — ₹129\n• Brownie Sundae — ₹159\n• Gulab Jamun — ₹99\n• Kulfi (seasonal) — ₹119\n\n*The perfect sweet ending! 🍫*",
      suggestions: ["Order Now", "Drinks", "View Menu"],
    };
  }

  // ─── Book a table ───────────────────────────────────────────────────────────
  if (
    msg.includes("book") ||
    msg.includes("reservation") ||
    msg.includes("reserve") ||
    msg.includes("table")
  ) {
    return {
      text: "🪑 **Table Booking**\n\nGreat choice! To reserve your table at Bella Vista, please use the booking form below or call us directly.\n\n📞 **Call:** +91 98765 43210\n🌐 **Online:** Use the 'Book Table' button in the chat\n\n*We're open for bookings 7 days a week!*\n\n**Walk-in Policy:** Tables for 1-2 guests are usually available without prior booking.",
      suggestions: ["Book Table Now", "Timings", "Contact Us"],
      action: "SHOW_BOOKING_FORM",
    };
  }

  // ─── Timings / Hours ────────────────────────────────────────────────────────
  if (
    msg.includes("timing") ||
    msg.includes("time") ||
    msg.includes("open") ||
    msg.includes("hour") ||
    msg.includes("close") ||
    msg.includes("when")
  ) {
    return {
      text: "🕐 **Restaurant Timings:**\n\n📅 **Monday – Friday:**\n• Lunch: 11:30 AM – 3:30 PM\n• Dinner: 6:00 PM – 11:00 PM\n\n📅 **Saturday & Sunday:**\n• Brunch: 10:00 AM – 4:00 PM\n• Dinner: 6:00 PM – 11:30 PM\n\n🎉 We're **open 7 days a week!**\n\n*Last order accepted 30 mins before closing.*",
      suggestions: ["Book Table", "Contact Us", "View Menu"],
    };
  }

  // ─── Contact / Location ─────────────────────────────────────────────────────
  if (
    msg.includes("contact") ||
    msg.includes("location") ||
    msg.includes("address") ||
    msg.includes("phone") ||
    msg.includes("call") ||
    msg.includes("email") ||
    msg.includes("where")
  ) {
    return {
      text: "📍 **Contact & Location:**\n\n🏠 **Address:**\nBella Vista Restaurant\n42, MG Road, Koregaon Park\nPune, Maharashtra – 411001\n\n📞 **Phone:** +91 98765 43210\n📧 **Email:** hello@bellavista.com\n🌐 **Website:** www.bellavista.com\n\n🗺️ **Landmarks:** Near Osho Ashram, opposite Starbucks\n\n🅿️ **Parking:** Free parking available in basement",
      suggestions: ["Book Table", "Timings", "View Menu"],
    };
  }

  // ─── Order status ───────────────────────────────────────────────────────────
  if (msg.includes("order status") || msg.includes("track order") || msg.includes("my order") || msg.includes("where is my")) {
    return {
      text: "📦 **Order Tracking**\n\nPlease share your **Order ID** (e.g., ORD-12345) and we'll check your order status right away!\n\nYou would have received your Order ID via:\n• SMS on your registered mobile\n• Email confirmation\n\n📞 For urgent queries: **+91 98765 43210**",
      suggestions: ["Contact Us", "Place New Order", "View Menu"],
    };
  }

  // ─── Place an order ─────────────────────────────────────────────────────────
  if (msg.includes("order") || msg.includes("place order") || msg.includes("want to order") || msg.includes("i'll have") || msg.includes("i want")) {
    return {
      text: "🛒 **Place an Order**\n\nYou can order in 3 ways:\n\n1. 📱 **Call us:** +91 98765 43210\n2. 🌐 **Online:** Use our ordering form\n3. 💬 **Tell me:** What would you like to order?\n\n*Delivery available within 5km radius.*\n*Estimated delivery time: 30-45 minutes*",
      suggestions: ["View Menu", "Pizza", "Burger", "Contact Us"],
      action: "SHOW_ORDER_FORM",
    };
  }

  // ─── Price / Cost ───────────────────────────────────────────────────────────
  if (msg.includes("price") || msg.includes("cost") || msg.includes("how much") || msg.includes("rate") || msg.includes("expensive")) {
    return {
      text: "💰 **Pricing at Bella Vista:**\n\nWe offer great value for money!\n\n• Starters: ₹99 – ₹199\n• Main Course: ₹229 – ₹449\n• Desserts: ₹99 – ₹199\n• Beverages: ₹49 – ₹129\n\n*Average meal for 2: ₹600 – ₹900*\n\nWe also offer:\n• 10% discount on weekday lunch\n• Happy Hour drinks (6–7 PM)\n• Student discount (15% with ID)",
      suggestions: ["View Menu", "Book Table", "Contact Us"],
    };
  }

  // ─── Offers / Discounts ──────────────────────────────────────────────────────
  if (msg.includes("offer") || msg.includes("discount") || msg.includes("deal") || msg.includes("coupon") || msg.includes("happy hour") || msg.includes("special")) {
    return {
      text: "🎉 **Current Offers & Deals:**\n\n• 🌞 **Weekday Lunch Special** – 10% off Mon–Fri (12–3 PM)\n• 🍹 **Happy Hour** – Buy 1 Get 1 on drinks (6–7 PM daily)\n• 🎓 **Student Discount** – 15% off with valid student ID\n• 👨‍👩‍👧 **Family Meal Deal** – Free dessert for groups of 4+\n• 📱 **First Order Online** – ₹50 off with code BELLA50\n\n*Offers cannot be combined. T&C apply.*",
      suggestions: ["View Menu", "Book Table", "Contact Us"],
    };
  }

  // ─── Wifi ────────────────────────────────────────────────────────────────────
  if (msg.includes("wifi") || msg.includes("wi-fi") || msg.includes("internet")) {
    return {
      text: "📶 **WiFi Available!**\n\nYes, we offer free high-speed WiFi for all our guests.\n\n• **Network:** BellaVista_Guest\n• **Password:** Available at the reception\n\n*Perfect for remote workers! Our café section is open from 10 AM.*",
      suggestions: ["Timings", "Book Table", "Contact Us"],
    };
  }

  // ─── Parking ─────────────────────────────────────────────────────────────────
  if (msg.includes("parking") || msg.includes("park")) {
    return {
      text: "🅿️ **Parking Information:**\n\nYes! We have **free parking** available:\n\n• **Basement Parking** – 50 car spaces\n• **Valet Service** – Available on weekends (₹50 tip)\n• **Two-Wheeler Parking** – Free in designated area\n\n📍 Entrance from MG Road service lane.",
      suggestions: ["Location", "Book Table", "Timings"],
    };
  }

  // ─── Thank you ───────────────────────────────────────────────────────────────
  if (msg.includes("thank") || msg.includes("thanks") || msg.includes("awesome") || msg.includes("great") || msg.includes("nice")) {
    return {
      text: "😊 You're most welcome! It's our pleasure to assist you.\n\nWe hope to see you at **Bella Vista** soon! 🍽️✨\n\nIs there anything else I can help you with?",
      suggestions: ["View Menu", "Book Table", "Timings", "Contact Us"],
    };
  }

  // ─── Bye / Goodbye ───────────────────────────────────────────────────────────
  if (msg.includes("bye") || msg.includes("goodbye") || msg.includes("see you") || msg.includes("later")) {
    return {
      text: "👋 **Goodbye!** Thank you for visiting Bella Vista Restaurant.\n\nHave a wonderful day! We look forward to serving you. 🍕❤️\n\n*Come hungry, leave happy!*",
      suggestions: ["Start Over"],
    };
  }

  // ─── Help ─────────────────────────────────────────────────────────────────────
  if (msg.includes("help") || msg.includes("assist") || msg.includes("support") || msg.includes("what can you")) {
    return {
      text: "🤖 **I can help you with:**\n\n1. 🍽️ Browse our full menu\n2. 📋 Check specific food items & prices\n3. 🪑 Book a table\n4. 📦 Track your order\n5. 🕐 Restaurant timings\n6. 📍 Location & contact info\n7. 🎉 Current offers & deals\n8. 🅿️ Parking information\n\nJust type or tap a quick reply below!",
      suggestions: ["View Menu", "Book Table", "Timings", "Contact Us"],
    };
  }

  // ─── Fallback ────────────────────────────────────────────────────────────────
  return {
    text: "🤔 Hmm, I didn't quite understand that. Let me suggest some options:\n\nYou can ask me about our **menu**, **book a table**, check **timings**, or get our **contact details**.",
    suggestions: ["View Menu", "Book Table", "Timings", "Contact Us", "Help"],
  };
};

// ─── Controller: POST /api/chat ────────────────────────────────────────────────
const processChat = (req, res) => {
  try {
    const { message } = req.body;

    // Validate input
    if (!message || typeof message !== "string" || message.trim() === "") {
      return res.status(400).json({ error: "Message is required and must be a non-empty string." });
    }

    const response = getBotResponse(message);

    return res.status(200).json({
      success: true,
      userMessage: message,
      botResponse: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat processing error:", error);
    return res.status(500).json({ error: "Internal server error. Please try again." });
  }
};

module.exports = { processChat };
