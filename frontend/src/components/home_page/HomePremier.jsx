import React from "react";
import premierImg from "../../assets/premier.jpg"; // replace with your actual image path

export default function HomePremier() {
  return (
    <section style={homePremierStyles.section}>
      <div style={homePremierStyles.container}>
        
        
        <div style={homePremierStyles.imageWrapper}>
          <img 
            src={premierImg} 
            alt="homePremierSlants" 
            style={homePremierStyles.image}
          />
        </div>

        
        <div style={homePremierStyles.textWrapper}>
          <h1 style={homePremierStyles.heading}>
            Your Premier <br /> Destination for All Green.
          </h1>
          <p style={homePremierStyles.paragraph}>
            At Urban Jungle Co., we believe in the transformative power of plants.
            Whether you’re a seasoned gardener or just starting your green journey,
            our curated selection of plants will inspire and enrich your living space.
          </p>

        
          <div style={homePremierStyles.statsWrapper}>
            <div style={homePremierStyles.statBox}>
              <h2 style={homePremierStyles.statNumber}>98%</h2>
              <p style={homePremierStyles.statText}>Customer Satisfaction</p>
            </div>
            <div style={homePremierStyles.statBox}>
              <h2 style={homePremierStyles.statNumber}>103K</h2>
              <p style={homePremierStyles.statText}>Plants Sold</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

const homePremierStyles = {
  section: {
    backgroundColor: "#edf4e0",
    minHeight: "85vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
  },
  container: {
    maxWidth: "1200px",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "50px",
    alignItems: "center",
  },
  imageWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    objectFit: "cover",
  },
  textWrapper: {
    color: "#2c2c2c",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "700",
    lineHeight: "1.2",
    marginBottom: "20px",
  },
  paragraph: {
    fontSize: "1.1rem",
    color: "#555",
    marginBottom: "40px",
    maxWidth: "500px",
  },
  statsWrapper: {
    display: "flex",
    gap: "50px",
    paddingTop: "20px",
    borderTop: "1px solid #ccc",
  },
  statBox: {
    display: "flex",
    flexDirection: "column",
  },
  statNumber: {
    fontSize: "1.8rem",
    fontWeight: "600",
    marginBottom: "5px",
  },
  statText: {
    fontSize: "1rem",
    color: "#666",
  },
};
