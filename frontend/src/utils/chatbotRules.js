// utils/chatbotRules.js
// Frontend-side rule engine for instant responses (mirrors backend logic)
// This allows the app to work even if backend is unavailable

export const getBotResponse = (message) => {
  const msg = message.toLowerCase().trim();

  if (/^(hi|hello|hey|howdy|good morning|good evening|good afternoon)/.test(msg)) {
    return {
      text: "👋 Welcome to **Bella Vista Restaurant**! I'm your virtual assistant.\n\nHow can I help you today? You can ask about our menu, book a table, check our timings, or get our contact details!",
      suggestions: ["View Menu", "Book Table", "Timings", "Contact Us"],
    };
  }
  if (msg.includes("menu") || msg.includes("food") || msg.includes("eat")) {
    return {
      text: "🍽️ Here are our menu categories:\n\n🍕 **Pizza** — Classic & gourmet\n🍔 **Burgers** — Juicy & loaded\n🍝 **Pasta** — Italian favorites\n🥗 **Salads** — Fresh & healthy\n🥤 **Drinks** — Cold & hot beverages\n🍰 **Desserts** — Sweet endings\n🍟 **Sides** — Fries & more\n\nAsk me about any category for items & prices!",
      suggestions: ["Pizza", "Burger", "Pasta", "Desserts"],
    };
  }
  if (msg.includes("pizza")) {
    return {
      text: "🍕 **Our Pizza Menu:**\n\n• Margherita Classic — ₹299\n• Pepperoni Feast — ₹399\n• BBQ Chicken — ₹429\n• Veggie Supreme — ₹349\n• Four Cheese — ₹449\n• Spicy Paneer — ₹369\n\n*Available in Regular (9\") & Large (12\")*",
      suggestions: ["Order Now", "Burger", "View Full Menu"],
    };
  }
  if (msg.includes("burger")) {
    return {
      text: "🍔 **Our Burger Menu:**\n\n• Classic Beef Burger — ₹249\n• Double Smash Burger — ₹329\n• Crispy Chicken Burger — ₹279\n• Veggie Delight Burger — ₹229\n• BBQ Bacon Burger — ₹359\n• Mushroom Swiss Burger — ₹299\n\n*All served with fries & coleslaw!*",
      suggestions: ["Order Now", "Pizza", "View Menu"],
    };
  }
  if (msg.includes("pasta")) {
    return {
      text: "🍝 **Our Pasta Menu:**\n\n• Spaghetti Carbonara — ₹319\n• Penne Arrabbiata — ₹289\n• Fettuccine Alfredo — ₹329\n• Pesto Pasta — ₹309\n• Lasagna Bolognese — ₹359\n• Mac & Cheese — ₹269",
      suggestions: ["Order Now", "Salads", "View Menu"],
    };
  }
  if (msg.includes("salad") || msg.includes("healthy")) {
    return {
      text: "🥗 **Our Salad Menu:**\n\n• Caesar Salad — ₹199\n• Greek Salad — ₹219\n• Garden Fresh Salad — ₹179\n• Grilled Chicken Salad — ₹259\n• Quinoa Bowl — ₹279\n• Avocado Salad — ₹249",
      suggestions: ["Order Now", "Drinks", "View Menu"],
    };
  }
  if (msg.includes("drink") || msg.includes("coffee") || msg.includes("juice") || msg.includes("beverage")) {
    return {
      text: "🥤 **Our Drinks:**\n\n☕ **Hot:** Espresso ₹79 | Cappuccino ₹99 | Latte ₹109\n🧃 **Juices:** Orange ₹89 | Mango ₹99 | Watermelon ₹79\n🥤 **Cold:** Coke ₹49 | Lemonade ₹69 | Iced Tea ₹79\n🥛 **Shakes:** Chocolate ₹129 | Vanilla ₹119",
      suggestions: ["Order Now", "Desserts", "View Menu"],
    };
  }
  if (msg.includes("dessert") || msg.includes("sweet") || msg.includes("cake")) {
    return {
      text: "🍰 **Our Desserts:**\n\n• Chocolate Lava Cake — ₹179\n• Tiramisu — ₹199\n• New York Cheesecake — ₹189\n• Vanilla Ice Cream — ₹129\n• Brownie Sundae — ₹159\n• Gulab Jamun — ₹99",
      suggestions: ["Order Now", "Drinks", "View Menu"],
    };
  }
  if (msg.includes("book") || msg.includes("reservation") || msg.includes("table") || msg.includes("reserve")) {
    return {
      text: "🪑 **Book a Table**\n\nGreat! To reserve your table, click the **Book Table** button below and fill in your details.\n\n📞 Or call us directly: **+91 98765 43210**\n\n*We're open for bookings 7 days a week!*",
      suggestions: ["Book Table Now", "Timings", "Contact Us"],
      action: "SHOW_BOOKING_FORM",
    };
  }
  if (msg.includes("timing") || msg.includes("open") || msg.includes("hour") || msg.includes("close") || msg.includes("when")) {
    return {
      text: "🕐 **Restaurant Timings:**\n\n📅 **Mon – Fri:**\n• Lunch: 11:30 AM – 3:30 PM\n• Dinner: 6:00 PM – 11:00 PM\n\n📅 **Sat & Sun:**\n• Brunch: 10:00 AM – 4:00 PM\n• Dinner: 6:00 PM – 11:30 PM\n\n🎉 Open **7 days a week!**",
      suggestions: ["Book Table", "Contact Us", "View Menu"],
    };
  }
  if (msg.includes("contact") || msg.includes("location") || msg.includes("address") || msg.includes("phone") || msg.includes("where")) {
    return {
      text: "📍 **Contact & Location:**\n\n🏠 **Bella Vista Restaurant**\n42, MG Road, Koregaon Park\nPune, Maharashtra – 411001\n\n📞 **+91 98765 43210**\n📧 **hello@bellavista.com**\n\n🅿️ Free basement parking available",
      suggestions: ["Book Table", "Timings", "View Menu"],
    };
  }
  if (msg.includes("order status") || msg.includes("track") || msg.includes("my order")) {
    return {
      text: "📦 **Track Your Order**\n\nPlease share your **Order ID** (e.g., ORD-ABC123) and I'll check the status!\n\nYou received the Order ID via SMS/email after placing your order.\n\n📞 Urgent? Call: **+91 98765 43210**",
      suggestions: ["Contact Us", "View Menu"],
    };
  }
  if (msg.includes("offer") || msg.includes("discount") || msg.includes("deal") || msg.includes("special")) {
    return {
      text: "🎉 **Current Offers:**\n\n• 🌞 **10% off** weekday lunch (Mon–Fri, 12–3 PM)\n• 🍹 **Buy 1 Get 1** drinks during Happy Hour (6–7 PM)\n• 🎓 **15% Student Discount** with valid ID\n• 👨‍👩‍👧 **Free dessert** for groups of 4+\n• 📱 **₹50 off** first online order with BELLA50",
      suggestions: ["View Menu", "Book Table", "Contact Us"],
    };
  }
  if (msg.includes("thank") || msg.includes("thanks") || msg.includes("awesome") || msg.includes("great")) {
    return {
      text: "😊 You're most welcome! We're always happy to help.\n\nLooking forward to seeing you at **Bella Vista** soon! 🍽️✨",
      suggestions: ["View Menu", "Book Table", "Timings"],
    };
  }
  if (msg.includes("bye") || msg.includes("goodbye")) {
    return {
      text: "👋 Goodbye! Thank you for choosing Bella Vista.\n\nHave a wonderful day! *Come hungry, leave happy!* 🍕❤️",
      suggestions: ["Start Over"],
    };
  }
  if (msg.includes("order") || msg.includes("want to order") || msg.includes("place order")) {
    return {
      text: "🛒 **Place an Order**\n\nYou can order in 3 ways:\n1. 📱 **Call:** +91 98765 43210\n2. 💬 **Tell me** what you'd like!\n3. 🌐 **Online order form** below\n\n*Delivery: 30–45 mins within 5km*",
      suggestions: ["View Menu", "Pizza", "Burger"],
      action: "SHOW_ORDER_FORM",
    };
  }
  // Fallback
  return {
    text: "🤔 I didn't quite catch that! Here are some things I can help you with:",
    suggestions: ["View Menu", "Book Table", "Timings", "Contact Us", "Offers"],
  };
};
