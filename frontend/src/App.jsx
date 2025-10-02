import { Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Dashboard from "./pages/Dashboard";
import User from "./components/dashboard/User"
import Category from "./components/dashboard/Category";

function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/dashboard" element={<Dashboard />}> 
          <Route path="users" element={<User />} />
          <Route path="categories" element={<Category />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
