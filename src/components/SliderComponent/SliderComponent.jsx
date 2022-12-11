import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import buildMacrosPic from "../../assets/images/build-macro-pic.jpg";
import trackBodyIndexPic from "../../assets/images/track-body-index.jpg";
import recipePic from "../../assets/images/recipe.jpg";
import nutritionFactPic from "../../assets/images/nutrition-fact.jpg";
import "./SliderComponent.scss";
import nextBtn from "../../assets/icons/next.png";
import backBtn from "../../assets/icons/back.png";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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

    if (currentSlide > 4) {
      carousel.current.slickGoTo(0);
    } else {
      carousel.current.slickGoTo(currentSlide - 1);
      console.log(currentSlide - 1);
    }
  };
  //FUNCTION TO MOVE TO THE PREVIOUS SLIDE
  const moveToPreviousSlide = function () {
    const currentSlide = findCurrentSlide();
    console.log(currentSlide);

    if (currentSlide < 3) {
      carousel.current.slickGoTo(3);
      console.log(cardArr.length);
    } else {
      carousel.current.slickGoTo(currentSlide - 3);
    }
  };

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 2,
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
              <h3>Build your macro ratios fast</h3>
              <p>Let's design your Macronutrient ratios here</p>
            </div>
          </Link>
        </div>

        <div className="slider__card">
          <img
            className="slider__image"
            src={trackBodyIndexPic}
            alt="build-macro-pic"
          />
          <div className="slider__text">
            <h3>Track your body indexes</h3>
            <p>
              We help you track your body indexes to let you know how far you go
            </p>
          </div>
        </div>
        <div className="slider__card">
          <img
            className="slider__image"
            src={recipePic}
            alt="build-macro-pic"
          />
          <div className="slider__text">
            <h3>Enjoy our recipe library</h3>
            <p>We provide you with many recipies to diversify your dishes</p>
          </div>
        </div>
        <div className="slider__card">
          <img
            className="slider__image"
            src={nutritionFactPic}
            alt="build-macro-pic"
          />
          <div className="slider__text">
            <h3>Learn about nutrition with fun facts</h3>
            <p>There are a lot of fun facts to take a look here</p>
          </div>
        </div>
      </Slider>
    </div>
  );
}
