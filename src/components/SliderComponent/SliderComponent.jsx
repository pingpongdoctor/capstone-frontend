import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import buildMacrosPic from "../../assets/images/build-macro-pic.jpg";
import trackBodyIndexPic from "../../assets/images/track-body-index.jpg";
import recipePic from "../../assets/images/recipe.jpg";
import nutritionFactPic from "../../assets/images/nutrition-fact.jpg";
import addRecipePic from "../../assets/images/add-recipe.jpg";
import buildRecipe from "../../assets/images/build-recipe.jpg";
import "./SliderComponent.scss";
import nextBtn from "../../assets/icons/next.png";
import backBtn from "../../assets/icons/back.png";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWindowSize } from "../../Utils/utils";

export default function SliderComponent() {
  //FUNCTION TO FIND THE CURRENT SLIDE
  const [cardArr, setCardArr] = useState([]);

  const carousel = useRef();

  useEffect(() => {
    const slideCardArr = document.querySelectorAll(".slick-slide");
    setCardArr(slideCardArr);
  }, []);

  const findCurrentSlide = function () {
    for (let i = 0; i < cardArr.length; i++) {
      if (cardArr[i].classList.contains("slick-current")) {
        return i;
      }
    }
  };
  //FUNCTION TO MOVE TO THE NEXT SLIDE
  const moveToNextSlide = function () {
    const currentSlide = findCurrentSlide();

    if (currentSlide > 5) {
      carousel.current.slickGoTo(0);
    } else {
      carousel.current.slickGoTo(currentSlide - 1);
    }
  };
  //FUNCTION TO MOVE TO THE PREVIOUS SLIDE
  const moveToPreviousSlide = function () {
    const currentSlide = findCurrentSlide();

    if (currentSlide < 3) {
      carousel.current.slickGoTo(4);
    } else {
      carousel.current.slickGoTo(currentSlide - 3);
    }
  };
  //USE USEWINDOWSIZE HOOK TO GET THE CURRENT SIZES OF THE SCREEN
  const size = useWindowSize();
  //SETTING FOR THE CAROUSEL DATA
  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: size.width > 768 ? 2 : 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div className="slider">
      <img
        onClick={moveToNextSlide}
        className="next-btn"
        src={nextBtn}
        alt="next-btn"
      />
      <img
        onClick={moveToPreviousSlide}
        className="back-btn"
        src={backBtn}
        alt="back-btn"
      />
      <Slider {...settings} ref={carousel}>
        <div className="slider__card">
          <Link className="slider__link" to={"/build-macro"}>
            <img
              className="slider__image"
              src={buildMacrosPic}
              alt="build-macro-pic"
            />
            <div className="slider__text">
              <h3>Build your macro ratios right now</h3>
              <p>Let's design your Macronutrient ratios here</p>
            </div>
          </Link>
        </div>

        <div className="slider__card">
          <Link className="slider__link" to={"/macro-list"}>
            <img
              className="slider__image"
              src={nutritionFactPic}
              alt="build-macro-pic"
            />
            <div className="slider__text">
              <h3>Enjoy your own macro list</h3>
              <p>You can easily save the macros you built into a list</p>
            </div>
          </Link>
        </div>

        <div className="slider__card">
          <Link className="slider__link" to={"/add-macro"}>
            <img
              className="slider__image"
              src={trackBodyIndexPic}
              alt="build-macro-pic"
            />
            <div className="slider__text">
              <h3>Construct a new macro based on your preference</h3>
              <p>We allow users to build macros based on their calculators</p>
            </div>
          </Link>
        </div>

        <div className="slider__card">
          <Link className="slider__link" to={"/recipe-library"}>
            <img
              className="slider__image"
              src={recipePic}
              alt="build-macro-pic"
            />
            <div className="slider__text">
              <h3>Enjoy our recipe library</h3>
              <p>We provide you with many recipies to diversify your dishes</p>
            </div>
          </Link>
        </div>

        <div className="slider__card">
          <Link className="slider__link" to={"/recipe-list"}>
            <img
              className="slider__image"
              src={buildRecipe}
              alt="build-macro-pic"
            />
            <div className="slider__text">
              <h3>Let's build your own favourite recipe list</h3>
              <p>
                The website platform allows you to construct your recipe list
              </p>
            </div>
          </Link>
        </div>

        <div className="slider__card">
          <Link className="slider__link" to={"/add-recipe"}>
            <img
              className="slider__image"
              src={addRecipePic}
              alt="build-macro-pic"
            />
            <div className="slider__text">
              <h3>Become a recipe creator</h3>
              <p>Post your recipe and share it with the other users</p>
            </div>
          </Link>
        </div>
      </Slider>
    </div>
  );
}
