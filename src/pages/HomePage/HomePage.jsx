import { useNavigate } from "react-router-dom";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import dumbbellPic from "../../assets/images/dumbbell.png";
import officePic from "../../assets/images/office.png";
import cookingPic from "../../assets/images/cooking2.png";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import "./HomePage.scss";

export default function HomePage({ loginState, closeMenu }) {
  const navigate = useNavigate();
  return (
    <div onMouseEnter={closeMenu} className="home-page">
      <SliderComponent />
      <div className="home-page__infor">
        <div className="home-page__wrapper">
          <img className="home-page__img" src={dumbbellPic} alt="dumbbell" />
          <p className="home-page__descript">
            We are here to help you start your fitness journey.
          </p>
        </div>
        <div className="home-page__wrapper">
          <img className="home-page__img" src={officePic} alt="office" />
          <p className="home-page__descript">
            Based on your weight, height and age, the website platform can
            quickly calculate your macronutrients.
          </p>
        </div>
        <div className="home-page__wrapper">
          <img className="home-page__img" src={cookingPic} alt="cooking" />
          <p className="home-page__descript">
            Being on diets does not mean that you are not allowed to eat yummy
            food. We provide users with a big bunch of recipes instructing how
            to cook healthy and yummy food.
          </p>
        </div>
        {!loginState && (
          <ButtonComponent
            onClickHandler={() => {
              navigate("/sign-up");
            }}
            btnClassName="btn btn--home-page"
            btnContent="Sign up for a new account"
          />
        )}
      </div>
    </div>
  );
}
