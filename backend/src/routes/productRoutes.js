import express from "express";
import multer from "multer";
import path from "path";
import { openDB } from "../config/db.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const db = await openDB();
    const rows = await db.all(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", upload.single("img"), async (req, res) => {
  try {
    const { category_id, name, quantity, instock, description } = req.body;
    if (!name || !category_id) {
      return res.status(400).json({ message: "Name & Category required" });
    }

    const imgPath = req.file ? `/uploads/products/${req.file.filename}` : null;

    const db = await openDB();
    const result = await db.run(
      `INSERT INTO products (category_id, name, quantity, instock, img, description)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [category_id, name, quantity || 0, instock || 0, imgPath, description || null]
    );

    res.json({ id: result.lastID, name, category_id, quantity, instock, img: imgPath, description });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update product
router.put("/:id", upload.single("img"), async (req, res) => {
  try {
    const { category_id, name, quantity, instock, description } = req.body;
    const db = await openDB();

    const existing = await db.get("SELECT * FROM products WHERE id = ?", [req.params.id]);
    if (!existing) return res.status(404).json({ message: "Not found" });

    const imgPath = req.file ? `/uploads/products/${req.file.filename}` : existing.img;

    const result = await db.run(
      "UPDATE products SET category_id=?, name=?, quantity=?, instock=?, description=?, img=? WHERE id=?",
      [
        category_id || existing.category_id,
        name || existing.name,
        quantity ?? existing.quantity,
        instock ?? existing.instock,
        description || existing.description,
        imgPath,
        req.params.id,
      ]
    );

    res.json({ updated: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE product
router.delete("/:id", async (req, res) => {
  try {
    const db = await openDB();
    const result = await db.run("DELETE FROM products WHERE id=?", [req.params.id]);
    res.json({ deleted: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
