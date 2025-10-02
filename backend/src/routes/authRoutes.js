import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { openDB } from "../config/db.js";

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "your_jwt_secret";

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Missing fields" });
    }
    if (confirmPassword !== password) {
      return res.status(400).json({ message: "Confirm Password doesn't match" });
    }

    const db = await openDB();
    const existingUser = await db.get("SELECT * FROM users WHERE email = ?", email);
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.run(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      name,
      email,
      hashedPassword,
      role || "user"
    );

    res.status(201).json({ id: result.lastID, name, email, role: role || "user" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Missing email or password" });

    const db = await openDB();
    const user = await db.get("SELECT * FROM users WHERE email = ?", email);

    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "1d" });

    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
