import "./RecipeLibraryPage.scss";
import RecipeItem from "../../components/RecipeItem/RecipeItem";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import heartPic from "../../assets/images/heart.png";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
const API_URL = process.env.REACT_APP_API_URL || "";

export default function RecipeLibraryPage({
  loginState,
  userProfile,
  closeMenu,
}) {
  //USE USENAVIGATE
  const navigate = useNavigate();
  //STATE TO GET DATA OF ALL RECIPES AND THE CORRESPONDING INGREDIENTS
  const [recipes, setRecipes] = useState("");
  //STATE TO MANIPULATE THE LOADING PAGE
  const [displayNoneClass, setDisplayNoneClass] = useState("");
  //USE EFFECT TO GET THE RECIPE DATA
  useEffect(() => {
    axios
      .get(`${API_URL}/recipe-library`)
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //USEEFFECT TO SET DISPLAYNONECLASS FOR THE LOADING PAGE
  useEffect(() => {
    if (recipes.length > 0) {
      setTimeout(() => {
        setDisplayNoneClass("loading-component__display-none");
      }, 2000);
    }
  }, [recipes.length]);

  return (
    <div onMouseEnter={closeMenu} className="recipe-library">
      <LoadingComponent displayNoneClass={displayNoneClass} />
      <div className="recipe-library__container">
        <div className="recipe-library__wrapper">
          <h1 className="recipe-library__heading">Recipe Library</h1>
          {loginState && (
            <ButtonComponent
              onClickHandler={() => {
                navigate("/add-recipe");
              }}
              btnClassName="btn btn--recipe-library"
              btnContent="Add new recipe"
            />
          )}
        </div>
        <div className="recipe-library__heart-wrapper">
          <img
            className="recipe-library__heart-pic"
            src={heartPic}
            alt="heart-img"
          />
          <p className="recipe-library__text">
            Recipes marked with the heart icon are your posted recipes and you
            can edit them
          </p>
        </div>
        <ul className="recipe-library__items">
          {recipes &&
            recipes.map((recipe) => (
              <RecipeItem
                key={recipe.id}
                id={recipe.id}
                recipeImage={recipe.image}
                recipeName={recipe.recipe_name}
                recipePosterId={recipe.poster_id}
                loginState={loginState}
                userProfile={userProfile}
              />
            ))}
        </ul>
      </div>
    </div>
  );
}
