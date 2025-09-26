import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, SECRET || "default_secret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.sendStatus(403).json({ message: "Invalid token" });
  }
}

