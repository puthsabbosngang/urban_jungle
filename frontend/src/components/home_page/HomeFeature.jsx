export default function HomeFeature() {
  return (
    <div style={homeFeatureStyle.container}>
      <div style={homeFeatureStyle.featureBox}>
        <div style={homeFeatureStyle.icon}>🔒</div>
        <h3 style={homeFeatureStyle.title}>Secure Payment</h3>
        <p style={homeFeatureStyle.description}>
          Your transactions are safe with our secure payment system.
        </p>
      </div>

      <div style={homeFeatureStyle.featureBox}>
        <div style={homeFeatureStyle.icon}>🚚</div>
        <h3 style={homeFeatureStyle.title}>Free Shipping</h3>
        <p style={homeFeatureStyle.description}>
          Enjoy free shipping on all orders over $50.
        </p>
      </div>

      <div style={homeFeatureStyle.featureBox}>
        <div style={homeFeatureStyle.icon}>📦</div>
        <h3 style={homeFeatureStyle.title}>Delivery with Care</h3>
        <p style={homeFeatureStyle.description}>
          We handle your products with the utmost care during delivery.
        </p>
      </div>

      <div style={homeFeatureStyle.featureBox}>
        <div style={homeFeatureStyle.icon}>🤝</div>
        <h3 style={homeFeatureStyle.title}>Excellent Service</h3>
        <p style={homeFeatureStyle.description}>
          Our customer service team is here to assist you 24/7.
        </p>
      </div>
    </div>
  );
}

const homeFeatureStyle = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center", 
    gap: "20px",
    padding: "20px",
    margin: "40px 20px",
  },

  featureBox: {
    flex: "1 1 250px", 
    maxWidth: "300px", 
    margin: "10px",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    transition: "transform 0.3s",
    cursor: "pointer",
    border: "1px solid #eee",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    background: "#fff",
  },

  icon: {
    fontSize: "40px",
    marginBottom: "10px",
    color: "#222",
  },

  title: {
    fontSize: "20px",
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#333",
  },

  description: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.5",
  },
};
