import express from "express";
import bcrypt from "bcrypt";
import { openDB } from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = await openDB();
    const rows = await db.all("SELECT id, name, email, role, created_at FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const db = await openDB();
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.run(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role || "user"]
    );

    res.json({ id: result.lastID, name, email, role: role || "user" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const db = await openDB();

    const result = await db.run(
      "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
      [name, email, role, req.params.id]
    );

    res.json({ updated: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const db = await openDB();
    const result = await db.run("DELETE FROM users WHERE id = ?", req.params.id);
    res.json({ deleted: result.changes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
