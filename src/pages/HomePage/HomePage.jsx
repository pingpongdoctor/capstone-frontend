import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import "./HomePage.scss";

export default function HomePage({
  userProfile,
  loginState,
  handleCurrentPath,
}) {
  //GET THE CURRENT ROUTE
  const location = useLocation();
  const currentRoute = location.pathname;
  //USE EFFECT TO SET THE CURRENT ROUTE WHEN THE PAGE LOADS
  useEffect(() => {
    handleCurrentPath(currentRoute);
  }, []);
  return (
    <div className="home-page">
      <div className="home-page__carousel"></div>
      <SliderComponent loginState={loginState} />
    </div>
  );
}
