import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import flashsaelBg from "../../assets/bg_img/home_flashsale_bg.jpg"


export default function FlashSale({loginAlert}) {

  const { user } = useAuth();

  return (
    <section style={flashsaleStyle.flashSale}>
      <div style={flashsaleStyle.overlayBg}></div>
      <div style={flashsaleStyle.overlay}>
        <h1 style={flashsaleStyle.title}>
          Flash Sale: Up to 50% Off On Select Items!
        </h1>
        <p style={flashsaleStyle.subtitle}>Don’t miss out on our flash sale event! For a limited time, enjoy up to 50% off on a selection of our best-selling products.</p>
        {!user ? (
          <span onClick={loginAlert} style={{ ...flashsaleStyle.button, cursor: "pointer" }}>
            Shop Now
          </span>
        ) : (
          <Link to="/shop" style={flashsaleStyle.button}>Shop Now</Link>
        )}
      </div>
    </section>

  );
}

const flashsaleStyle = {
  flashSale: {
    position: "relative",
    backgroundImage: `url(${flashsaelBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  overlayBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // dark transparent overlay
    zIndex: 1,
  },

  overlay: {
    textAlign: "center",
    color: "#fff",
    maxWidth: "800px",
    padding: "0 20px",
    zIndex: 2,
  },

  subtitle: {
    fontSize: "14px",
    letterSpacing: "2px",
    textTransform: "uppercase",
    marginBottom: "50px",
    color: "#fff", // light green
  },

  title: {
    fontSize: "clamp(18px, 4vw, 38px)", // responsive scaling
    fontWeight: "bold",
    lineHeight: "1.2",
    marginBottom: "50px",
  },

  button: {
    color: "#fff",
    padding: "12px 28px",
    borderRadius: "50px",
    border: "2px solid #fff",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    display: "inline-block",
    transition: "background 0.3s ease",
  },
};
