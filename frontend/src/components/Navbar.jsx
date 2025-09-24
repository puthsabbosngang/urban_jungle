import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        background: "#222",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
  
      }}
    >
      <h2 style={{ margin: 0 }}>📦 Stockify</h2>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
          Dashboard
        </Link>
        <Link to="/products" style={{ color: "#fff", textDecoration: "none" }}>
          Products
        </Link>
        <Link to="/categories" style={{ color: "#fff", textDecoration: "none" }}>
          Categories
        </Link>
        <Link to="/login" style={{ color: "#fff", textDecoration: "none" }}>
          Login
        </Link>
        <Link to="/register" style={{ color: "#fff", textDecoration: "none" }}>
          Register
        </Link>
      </div>
    </nav>
  );
}
