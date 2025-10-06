import { useEffect, useState } from "react";

export default function DashboardComponent() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboards")
      .then((res) => res.json())
      .then(setStats)
      .catch((err) => console.error("Error loading dashboard data:", err));
  }, []);

  if (!stats) return <p style={{ textAlign: "center" }}>Loading dashboard...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Admin Dashboard</h2>
      <div style={styles.cards}>
        <div style={styles.card}>
          <h3>Total Users</h3>
          <p style={styles.number}>{stats.total_users}</p>
        </div>
        <div style={styles.card}>
          <h3>Total Categories</h3>
          <p style={styles.number}>{stats.total_categories}</p>
        </div>
        <div style={styles.card}>
          <h3>Total Products</h3>
          <p style={styles.number}>{stats.total_products}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px", // expand width to fit 3 cards easily
    margin: "50px auto",
    textAlign: "center",
  },
  title: {
    marginBottom: "40px",
    color: "#222",
  },
  cards: {
    display: "flex",
    justifyContent: "space-around", // evenly space 3 cards
    alignItems: "stretch",
    flexWrap: "nowrap", // force single row
    gap: "30px",
  },
  card: {
    flex: "1",
    maxWidth: "300px",
    padding: "25px",
    borderRadius: "15px",
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  number: {
    fontSize: "40px",
    fontWeight: "bold",
    color: "#007bff",
    marginTop: "10px",
  },
};
