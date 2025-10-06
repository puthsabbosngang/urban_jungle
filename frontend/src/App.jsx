import { Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Dashboard from "./pages/Dashboard";
import User from "./components/dashboard/User"
import Category from "./components/dashboard/Category";
import Product from "./components/dashboard/Product";
import DashboardComponent from "./components/dashboard/DashboardComponent";

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
          <Route path="dashboards" element={<DashboardComponent />} />
          <Route path="categories" element={<Category />} />
          <Route path="products" element={<Product />} />
          <Route path="users" element={<User />} />
          
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
