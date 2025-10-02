import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({loginAlert}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/home");
    }
  }

  return (
    <nav style={navbarStyles.nav}>
      <h2 style={navbarStyles.h2}>URBAN JUNGLE CO.</h2>

      <div style={navbarStyles.menu}>
        <Link to="/home" style={navbarStyles.link}>
          Home
        </Link>

        {!user ? (
          <span onClick={loginAlert} style={{ ...navbarStyles.link, cursor: "pointer" }}>
            Shop
          </span>
        ) : (
          <Link to="/shop" style={navbarStyles.link}>Shop</Link>
        )}
        

        {user?.role === "admin" && (
          <Link to="/dashboard" style={navbarStyles.link}>
            Dashboard
          </Link>
        )}

      </div>
      
      <div style={navbarStyles.menulogin}>
        {user && (
          <>
          <Link style={navbarStyles.link} onClick={handleLogout}>
            Logout
          </Link>
          </>
        )}

        {!user && (
          <>
            <Link to={"/login"} style={navbarStyles.link}>
              Login
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}

  const navbarStyles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#fff",
      zIndex: "1000",
      position: "relative",
      background: "rgba(214, 214, 214, 0.15)",
      top: "30px",
      right: "30px",
      left: "30px",
      padding: "20px",
      width: "93.5vw",
      borderRadius: "20px",
    },

    h2: {
      margin: "0px 0px 0px 20px",
    },

    menu:{
      display: "flex",
      gap: "100px",
  
    },

    menulogin:{
      display: "flex",
      gap: "15px",
    },

    link:{
      color: "#fff",
      textDecoration: "none",
    },
  };