import { useAuth } from "../../context/AuthContext";
import trendingProduct1 from "../../assets/trending/product01.jpg";
import trendingProduct2 from "../../assets/trending/product02.jpg";
import trendingProduct3 from "../../assets/trending/product03.jpg";

export default function TrendingProduct({ role = "user" }) {
  const {user} = useAuth();
  const trendingProducts = [
    {
      id: 1,
      image: trendingProduct1,
      title: "Zen Bamboo Grove",
      category: "Indoor Plants",
      price: "90.00",
      rating: 5,
    },
    {
      id: 2,
      image: trendingProduct2,
      title: "Starlight Succulent",
      category: "Indoor Plants",
      price: "95.00",
      rating: 5,
    },
    {
      id: 3,
      image: trendingProduct3,
      title: "Silver Mist",
      category: "Indoor Plants",
      price: "92.00",
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, index) => (
      <span key={index} style={{ color: index < rating ? "#f5c518" : "#ddd" }}>
        ★
      </span>
    ));
  };

  const handleEdit = (id) => {
    console.log("Edit product:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete product:", id);
  };

  return (
    <div style={trendingProductStyles.wrapper}>
      <h2 style={trendingProductStyles.sectionTitle}>Trending Products</h2>
      <div style={trendingProductStyles.container}>
        {trendingProducts.map((product) => (
          <div key={product.id} style={trendingProductStyles.productCard}>
            <div
              style={{
                ...trendingProductStyles.productImg,
                backgroundImage: `url(${product.image})`,
              }}
            ></div>
            <div style={trendingProductStyles.description}>
              <div style={trendingProductStyles.rating}>{renderStars(product.rating)}</div>
              <h3 style={trendingProductStyles.title}>{product.title}</h3>
              <p style={trendingProductStyles.category}>{product.category}</p>
              <p style={trendingProductStyles.price}>{"$ " + product.price}</p>

              {user?.role === "admin" && (
                <div style={trendingProductStyles.adminActions}>
                  <button
                    style={{ ...trendingProductStyles.btn, ...trendingProductStyles.editBtn }}
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ ...trendingProductStyles.btn, ...trendingProductStyles.deleteBtn }}
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const trendingProductStyles = {
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
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "80px",
    width: "100%",
    minHeight: "60vh",
    margin: "30px 0",
  },

  productCard: {
    flex: "0 0 30%",
    maxWidth: "300px",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    transition: "transform 0.3s",
    cursor: "pointer",
  },

  productImg: {
    width: "100%",
    height: "350px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    borderRadius: "6px",
    marginBottom: "15px",
  },

  description: {
    textAlign: "left",
  },

  rating: {
    fontSize: "16px",
    marginBottom: "5px",
  },

  title: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "5px 0",
  },

  category: {
    fontSize: "14px",
    color: "#777",
    margin: "5px 0",
  },

  price: {
    fontSize: "16px",
    fontWeight: "bold",
    marginTop: "10px",
  },

  adminActions: {
    marginTop: "15px",
    display: "flex",
    gap: "10px",
  },

  btn: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  },

  editBtn: {
    backgroundColor: "#4caf50",
    color: "#fff",
  },

  deleteBtn: {
    backgroundColor: "#f44336",
    color: "#fff",
  },

  "@media (max-width: 1024px)": {
    productCard: {
      flex: "0 0 45%",
    },
  },

  "@media (max-width: 768px)": {
    productCard: {
      flex: "0 0 100%",
    },
  },
};
