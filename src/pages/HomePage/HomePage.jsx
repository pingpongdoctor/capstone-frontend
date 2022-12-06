import { useNavigate } from "react-router-dom";
import SliderComponent from "../../components/Carousel/SliderComponent";

export default function HomePage({ userProfile, loginState }) {
  return (
    <div className="home-page">
      {loginState && <div>Welcome back {userProfile.username}</div>}
      <div className="home-page__carousel"></div>
      <SliderComponent />
    </div>
  );
}
