import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import "./HomePage.scss";

export default function HomePage({ userProfile, loginState }) {
  return (
    <div className="home-page">
      <div className="home-page__carousel"></div>
      <SliderComponent loginState={loginState} />
    </div>
  );
}
