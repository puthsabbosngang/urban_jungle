import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
   
  function loginAlert() {
    if (window.confirm("You need to login first!")) {
      window.location.href = "/login";
    }
  }

  function handleLogout() {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      window.location.href = "/login";
    }
  }

  // if (user) {
    return (
      <nav
        style={navbarStyles.nav}
      >
        <h2 style={navbarStyles.h2}>📦 Stockify</h2>

        <div style={navbarStyles.menu}>
          <Link to="/home" style={navbarStyles.link}>
            Home
          </Link>
          <Link to="/products" style={navbarStyles.link} onClick={!user ? loginAlert : undefined}>
            Products
          </Link>
          <Link to="/categories" style={navbarStyles.link} onClick={!user ? loginAlert : undefined}>
            Categories
          </Link>

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
              <Link to={"/register"} style={navbarStyles.link}>
                Register
              </Link>
            </>
          )}

        </div>

      </nav>
    );
  // } 
  // else {
  //     return (
  //       <nav
  //         style={navbarStyles.nav}
  //       >
  //         <h2 style={navbarStyles.h2}>📦 Stockify</h2>

  //         <div style={navbarStyles.menu}>
  //           <Link to="/" style={navbarStyles.link}>
  //             Home
  //           </Link>
  //           <Link style={navbarStyles.link} onClick={loginAlert}>
  //             Products
  //           </Link>
  //           <Link style={navbarStyles.link} onClick={loginAlert}>
  //             Categories
  //           </Link>
  //         </div>
          
  //         <div style={navbarStyles.menulogin }>
  //           <Link to="/login" style={navbarStyles.link}>
  //             Login
  //           </Link>
  //           <Link to="/register" style={navbarStyles.link}>
  //             Register
  //           </Link>
  //         </div>

  //       </nav>
  //   );
  // }
}

const navbarStyles = {
  nav: {
    background: "#222",
    padding: "10px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
  },

  h2: {
    margin: 0,
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
}