import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function HomeCategory({ role = "user" }) {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("http://localhost:5000/api/categories"); // adjust port if different
        const data = await res.json();

        // Prepend server URL to image path
        const formatted = data.map(cat => ({
          ...cat,
          img: `http://localhost:5000${cat.img}` // ✅ backend serves uploads statically
        }));

        setCategories(formatted);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div style={categoryStyles.wrapper}>
      <h2 style={categoryStyles.sectionTitle}>Our Categories</h2>
      <div style={categoryStyles.container}>
        {categories.map((cat) => (
          <div key={cat.id} style={categoryStyles.categoryCard}>
            <div
              style={{
                ...categoryStyles.categoryImg,
                backgroundImage: `url(${cat.img})`,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}

const categoryStyles = {
  wrapper: {
    padding: "40px",
    marginBottom: "40px",
    marginTop: "40px",
  },

  sectionTitle: {
    fontSize: "32px",
    fontWeight: "600",
    marginBottom: "40px",
    textAlign: "center",
    color: "#222",
  },

  container: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // ✅ 4 per row
    gap: "30px",
    width: "100%",
    minHeight: "40vh",
    margin: "30px 0",
  },

  categoryCard: {
    width: "100%",
    borderRadius: "8px",
    textAlign: "center",
    cursor: "pointer",
  },

  categoryImg: {
    width: "100%",
    height: "250px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "6px",
  },

  // ✅ Responsive breakpoints
  "@media (max-width: 1024px)": {
    container: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },

  "@media (max-width: 768px)": {
    container: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },

  "@media (max-width: 480px)": {
    container: {
      gridTemplateColumns: "1fr",
    },
  },
};
