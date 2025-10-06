import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();

  function handleLogout() {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      window.location.href = "/home";
    }
  }

  return (
    <div style={styles.dashboard}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>Urban Jungle Admin</h2>
        <nav style={styles.nav}>
          <Link to="dashboards" style={styles.link}>📊 Dashboard</Link>
          <Link to="categories" style={styles.link}>🗂 Categories</Link>
          <Link to="products" style={styles.link}>📦 Products</Link>
          <Link to="users" style={styles.link}>👤 Users</Link>
        </nav>
      </aside>

      <div style={styles.mainWrapper}>
        <header style={styles.navbar}>
          <div style={styles.navLinks}>
            <Link to="/home" style={styles.navItem}>🏠 Home</Link>
            <Link to="/shop" style={styles.navItem}>🛒 Shop</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>🚪 Logout</button>
          </div>
        </header>

        <main style={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const styles = {
  dashboard: {
    display: "flex",
    minHeight: "100vh",
    background: "#f9f9f9",
  },
  sidebar: {
    width: "250px",
    background: "#222",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  logo: {
    fontSize: "20px",
    marginBottom: "30px",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    padding: "10px",
    borderRadius: "6px",
    transition: "background 0.2s",
  },
  mainWrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  navbar: {
    background: "#fff",
    padding: "15px 25px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  navLinks: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
  },
  navItem: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
    fontSize: "16px",
  },
  logoutBtn: {
    background: "none",
    border: "none",
    color: "#e74c3c",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
  },
  main: {
    flex: 1,
    padding: "30px",
    overflowY: "auto",
  },
};
