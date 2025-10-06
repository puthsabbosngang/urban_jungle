import { Link } from "react-router-dom";
import {useAuth} from "../../context/AuthContext";
import heroBg from "../../assets/bg_img/home_hero_bg.jpg";


export default function HomeHero({loginAlert}) {
  const { user } = useAuth();
  return (
    <section style={homeHeroStyle.hero}>
      <div style={homeHeroStyle.overlayBg}></div>
      <div style={homeHeroStyle.overlay}>
        <p style={homeHeroStyle.subtitle}>WELCOME TO URBAN JUNGLE CO.</p>
        <h1 style={homeHeroStyle.title}>
          Discover the Beauty of Nature at Your Fingertips
        </h1>
        {!user ? (
          <span onClick={loginAlert} style={{ ...homeHeroStyle.button, cursor: "pointer" }}>
            Shop Now
          </span>
        ) : (
          <Link to="/shop" style={homeHeroStyle.button}>Shop Now</Link>
        )}
      </div>
    </section>

  );
}

const homeHeroStyle = {
  hero: {
    position: "relative",
    backgroundImage: `url(${heroBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop:"-67px",
    zIndex: 1,  
    
  },

  overlayBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    marginBottom: "16px",
    color: "#fff",
  },

  title: {
    fontSize: "clamp(28px, 5vw, 48px)",
    fontWeight: "bold",
    lineHeight: "1.2",
    marginBottom: "24px",
  },

  button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "12px 28px",
    borderRadius: "50px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "bold",
    display: "inline-block",
    transition: "background 0.3s ease",
  },

  buttonHover: {
    backgroundColor: "#45a049",
  },
};
