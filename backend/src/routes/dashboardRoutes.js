import express from "express";
import { openDB } from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = await openDB();

    const totalUsers = await db.get("SELECT COUNT(*) AS count FROM users");
    const totalCategories = await db.get("SELECT COUNT(*) AS count FROM categories");
    const totalProducts = await db.get("SELECT COUNT(*) AS count FROM products");

    res.json({
      total_users: totalUsers.count,
      total_categories: totalCategories.count,
      total_products: totalProducts.count,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
