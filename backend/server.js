import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./src/routes/auth.js";
import { authenticateToken } from "./src/middleware/auth.js";



dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/api/auth/me", authenticateToken, (req, res) => {
    res.json({user: req.user});
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
