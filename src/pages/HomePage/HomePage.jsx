import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import "./HomePage.scss";

export default function HomePage({ userProfile, loginState, sideMenuState }) {
  const [homePageState, setHomePageState] = useState("");
  useEffect(() => {
    if (sideMenuState === "side-menu--appear") {
      setHomePageState("home-page--blur");
    } else {
      setHomePageState("");
    }
  }, [sideMenuState]);
  return (
    <div className={`home-page ${homePageState}`}>
      {loginState && <div>Welcome back {userProfile.username}</div>}
      <div className="home-page__carousel"></div>
      <SliderComponent loginState={loginState} />
    </div>
  );
}
