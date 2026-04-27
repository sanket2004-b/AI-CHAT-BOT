// controllers/menuController.js - Menu CRUD operations
const Menu = require("../models/Menu");

// Seed menu data if DB is empty
const seedMenu = async () => {
  const count = await Menu.countDocuments();
  if (count > 0) return;

  const items = [
    // Pizza
    { itemName: "Margherita Classic", category: "Pizza", price: 299, description: "Classic tomato sauce, mozzarella, fresh basil", available: true },
    { itemName: "Pepperoni Feast", category: "Pizza", price: 399, description: "Loaded with spicy pepperoni & mozzarella", available: true },
    { itemName: "BBQ Chicken", category: "Pizza", price: 429, description: "Smoky BBQ sauce, grilled chicken, onions", available: true },
    { itemName: "Veggie Supreme", category: "Pizza", price: 349, description: "Bell peppers, mushrooms, olives, onions", available: true },
    { itemName: "Four Cheese", category: "Pizza", price: 449, description: "Mozzarella, cheddar, parmesan, ricotta", available: true },
    { itemName: "Spicy Paneer", category: "Pizza", price: 369, description: "Tandoori paneer, capsicum, Indian spices", available: true },
    // Burger
    { itemName: "Classic Beef Burger", category: "Burger", price: 249, description: "100% beef patty, lettuce, tomato, cheese", available: true },
    { itemName: "Double Smash Burger", category: "Burger", price: 329, description: "Two smashed beef patties, special sauce", available: true },
    { itemName: "Crispy Chicken Burger", category: "Burger", price: 279, description: "Crispy fried chicken, coleslaw, mayo", available: true },
    { itemName: "Veggie Delight Burger", category: "Burger", price: 229, description: "Plant-based patty, avocado, fresh veggies", available: true },
    // Pasta
    { itemName: "Spaghetti Carbonara", category: "Pasta", price: 319, description: "Creamy egg sauce, pancetta, parmesan", available: true },
    { itemName: "Penne Arrabbiata", category: "Pasta", price: 289, description: "Spicy tomato sauce, garlic, herbs", available: true },
    { itemName: "Fettuccine Alfredo", category: "Pasta", price: 329, description: "Rich cream sauce, parmesan, butter", available: true },
    // Drinks
    { itemName: "Fresh Orange Juice", category: "Drinks", price: 89, description: "Freshly squeezed orange juice", available: true },
    { itemName: "Cappuccino", category: "Drinks", price: 99, description: "Espresso with steamed milk foam", available: true },
    { itemName: "Mango Shake", category: "Drinks", price: 129, description: "Fresh Alphonso mango blended shake", available: true },
    // Desserts
    { itemName: "Chocolate Lava Cake", category: "Desserts", price: 179, description: "Warm chocolate cake with molten center", available: true },
    { itemName: "Tiramisu", category: "Desserts", price: 199, description: "Classic Italian coffee dessert", available: true },
    { itemName: "Gulab Jamun", category: "Desserts", price: 99, description: "Soft milk solids dumplings in sugar syrup", available: true },
    // Sides
    { itemName: "Crispy French Fries", category: "Sides", price: 99, description: "Seasoned golden fries", available: true },
    { itemName: "Onion Rings", category: "Sides", price: 119, description: "Battered and fried onion rings", available: true },
  ];

  await Menu.insertMany(items);
  console.log("✅ Menu seeded successfully");
};

// GET /api/menu
const getMenu = async (req, res) => {
  try {
    await seedMenu();
    const { category } = req.query;
    const filter = { available: true };
    if (category) filter.category = category;

    const menu = await Menu.find(filter).sort({ category: 1, price: 1 });
    res.status(200).json({ success: true, count: menu.length, data: menu });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu items." });
  }
};

module.exports = { getMenu };
