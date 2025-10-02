import FlashSale from "../components/home_page/FlashSale";
import HomeFeature from "../components/home_page/HomeFeature";
import HomeHero from "../components/home_page/HomeHero";
import TrendingProduct from "../components/home_page/TrendingProduct";
import Navbar from "../components/Navbar";
import useTitle from "../hooks/useTitle";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PopularProduct from "../components/home_page/PopularProduct";
import HomePremier from "../components/home_page/HomePremier";
import HomeCategory from "../components/home_page/HomeCategory";

export default function Home() {
  useTitle("Home");
  const navigate = useNavigate();

  function loginAlert() {
    if (window.confirm("Please Login first!")) {
      navigate("/login");
    }
  }
  
  return (
    <>
     
      <Navbar 
        loginAlert = {loginAlert}  
      />

      <HomeHero 
        loginAlert = {loginAlert}
      />

      <HomeFeature />
      
      <TrendingProduct />
      
      <FlashSale 
        loginAlert = {loginAlert}
      /> 

      <HomeCategory />

      <HomePremier />

      <PopularProduct />

    </>
  );
}
