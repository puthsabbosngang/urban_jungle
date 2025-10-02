import express from "express";
import multer from "multer";
import path from "path";
import { openDB } from "../config/db.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/categories");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const db = await openDB();
    const rows = await db.all("SELECT * FROM categories");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", upload.single("img"), async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "Name required" });

    const imgPath = req.file ? `/uploads/categories/${req.file.filename}` : null;

    const db = await openDB();
    const result = await db.run(
      "INSERT INTO categories (name, img, description) VALUES (?, ?, ?)",
      [name, imgPath, description || null]
    );

    res.json({ id: result.lastID, name, description, img: imgPath });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id", upload.single("img"), async (req, res) => {
  try {
    const { name, description } = req.body;
    const db = await openDB();

    const existing = await db.get("SELECT * FROM categories WHERE id = ?", [
      req.params.id,
    ]);
    if (!existing) return res.status(404).json({ message: "Not found" });

    const imgPath = req.file
      ? `/uploads/categories/${req.file.filename}`
      : existing.img;

    const result = await db.run(
      "UPDATE categories SET name=?, description=?, img=? WHERE id=?",
      [name || existing.name, description || existing.description, imgPath, req.params.id]
    );

    res.json({ updated: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const db = await openDB();
    const result = await db.run("DELETE FROM categories WHERE id=?", [
      req.params.id,
    ]);
    res.json({ deleted: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
