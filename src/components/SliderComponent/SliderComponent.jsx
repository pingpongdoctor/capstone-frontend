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
import { useWindowSize } from "../../Utils/utils";
import { useState } from "react";

export default function SliderComponent() {
  //STATE FOR THE BRIGHTER STATES
  const [macroBuildBrighter, setMacroBuildBrighter] = useState("");
  const [macroListBrighter, setMacroListBrighter] = useState("");
  const [recipeLibraryBrighter, setRecipeLibraryBrighter] = useState("");
  const [recipeListBrighter, setRecipeListBrighter] = useState("");
  const [macroCreateBrighter, setMacroCreateBrighter] = useState("");
  const [recipeCreateBrighter, setRecipeCreateBrighter] = useState("");
  //FUNCTION TO SET THE BRIGHTER STATES WHEN USING THE MOUSEENTER EVENT HANDLER
  const handleMouseEnterBrighter = function (event) {
    if (event.target.classList.contains("slider__build-macro")) {
      setMacroBuildBrighter("slider__image--brighter");
    }

    if (event.target.classList.contains("slider__macro-list")) {
      setMacroListBrighter("slider__image--brighter");
    }

    if (event.target.classList.contains("slider__add-macro")) {
      setMacroCreateBrighter("slider__image--brighter");
    }

    if (event.target.classList.contains("slider__recipe-library")) {
      setRecipeLibraryBrighter("slider__image--brighter");
    }

    if (event.target.classList.contains("slider__recipe-list")) {
      setRecipeListBrighter("slider__image--brighter");
    }

    if (event.target.classList.contains("slider__add-recipe")) {
      setRecipeCreateBrighter("slider__image--brighter");
    }
  };
  //FUNCTION TO SET THE BRIGHTER STATES WHEN USING THE MOUSELEAVE EVENT HANDLER
  const handleMouseLeaveDarker = function (event) {
    setMacroBuildBrighter("");

    setMacroListBrighter("");

    setMacroCreateBrighter("");

    setRecipeLibraryBrighter("");

    setRecipeListBrighter("");

    setRecipeCreateBrighter("");
  };
  //FUNCTION TO FIND THE CURRENT SLIDE
  const carousel = useRef();
  //FUNCTION TO FIND THE CURRENT SLIDE
  const findCurrentSlide = function () {
    const cardArr = document.querySelectorAll(".slick-slide");
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
        <div
          onMouseEnter={handleMouseEnterBrighter}
          onMouseLeave={handleMouseLeaveDarker}
          className="slider__card slider__build-macro"
        >
          <Link
            className="slider__link slider__build-macro"
            to={"/build-macro"}
          >
            <img
              className={`slider__image slider__build-macro ${macroBuildBrighter}`}
              src={buildMacrosPic}
              alt="build-macro"
            />
            <div className="slider__text slider__build-macro">
              <h3 className="slider__build-macro">
                Build your macro ratios right now
              </h3>
              <p className="slider__build-macro">
                Let's design your Macronutrient ratios here
              </p>
            </div>
          </Link>
        </div>

        <div
          onMouseEnter={handleMouseEnterBrighter}
          onMouseLeave={handleMouseLeaveDarker}
          className="slider__card slider__macro-list"
        >
          <Link className="slider__link slider__macro-list" to={"/macro-list"}>
            <img
              className={`slider__image slider__macro-list ${macroListBrighter}`}
              src={nutritionFactPic}
              alt="macro-list"
            />
            <div className="slider__text slider__macro-list">
              <h3 className="slider__macro-list">Enjoy your own macro list</h3>
              <p className="slider__macro-list">
                You can easily save the macros you built into a list
              </p>
            </div>
          </Link>
        </div>

        <div
          onMouseEnter={handleMouseEnterBrighter}
          onMouseLeave={handleMouseLeaveDarker}
          className="slider__card slider__add-macro"
        >
          <Link className="slider__link slider__add-macro" to={"/add-macro"}>
            <img
              className={`slider__image slider__add-macro ${macroCreateBrighter}`}
              src={trackBodyIndexPic}
              alt="add-macro"
            />
            <div className="slider__text slider__add-macro">
              <h3 className="slider__add-macro">
                Construct a new macro based on your preference
              </h3>
              <p className="slider__add-macro">
                We allow users to build macros based on their calculators
              </p>
            </div>
          </Link>
        </div>

        <div
          onMouseEnter={handleMouseEnterBrighter}
          onMouseLeave={handleMouseLeaveDarker}
          className="slider__card slider__recipe-library"
        >
          <Link
            className="slider__link slider__recipe-library"
            to={"/recipe-library"}
          >
            <img
              className={`slider__image slider__recipe-library ${recipeLibraryBrighter}`}
              src={recipePic}
              alt="recipe-library"
            />
            <div className="slider__text slider__recipe-library">
              <h3 className="slider__recipe-library">
                Enjoy our recipe library
              </h3>
              <p className="slider__recipe-library">
                We provide you with many recipies to diversify your dishes
              </p>
            </div>
          </Link>
        </div>

        <div
          onMouseEnter={handleMouseEnterBrighter}
          onMouseLeave={handleMouseLeaveDarker}
          className="slider__card slider__recipe-list"
        >
          <Link
            className="slider__link slider__recipe-list"
            to={"/recipe-list"}
          >
            <img
              className={`slider__image slider__recipe-list ${recipeListBrighter}`}
              src={buildRecipe}
              alt="recipe-list"
            />
            <div className="slider__text slider__recipe-list">
              <h3 className="slider__recipe-list">
                Let's build your own favourite recipe list
              </h3>
              <p className="slider__recipe-list">
                The website platform allows you to construct your recipe list
              </p>
            </div>
          </Link>
        </div>

        <div
          onMouseEnter={handleMouseEnterBrighter}
          onMouseLeave={handleMouseLeaveDarker}
          className="slider__card slider__add-recipe"
        >
          <Link className="slider__link slider__add-recipe" to={"/add-recipe"}>
            <img
              className={`slider__image slider__add-recipe ${recipeCreateBrighter}`}
              src={addRecipePic}
              alt="add-recipe"
            />
            <div className="slider__text slider__add-recipe">
              <h3 className="slider__add-recipe">Become a recipe creator</h3>
              <p className="slider__add-recipe">
                Post your recipe and share it with the other users
              </p>
            </div>
          </Link>
        </div>
      </Slider>
    </div>
  );
}
