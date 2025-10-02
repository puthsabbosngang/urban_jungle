import { Link, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div style={styles.dashboard}>
    
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}> Urban Jungle  Admin</h2>
        <nav style={styles.nav}>
          <Link to="users" style={styles.link}>👤 Users</Link>
          <Link to="products" style={styles.link}>📦 Products</Link>
          <Link to="categories" style={styles.link}>🗂 Categories</Link>
        </nav>
      </aside>

      <main style={styles.main}>
        <Outlet /> 
      </main>
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
  main: {
    flex: 1,
    padding: "30px",
    overflowY: "auto",
  },
};
