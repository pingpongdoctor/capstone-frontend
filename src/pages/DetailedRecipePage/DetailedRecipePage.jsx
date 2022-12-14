import "./DetailedRecipePage.scss";
import Avatar from "../../components/Avatar/Avatar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import likeIcon from "../../assets/icons/like.png";
import ingredientPic from "../../assets/images/ingredients.png";
import stepPic from "../../assets/images/steps.png";
const URL = process.env.REACT_APP_API_URL || "";

export default function DetailedRecipePage({ loginState, userProfile }) {
  // //STATE TO STORE THE SINGLE RECIPE DATA
  const [recipeData, setRecipeData] = useState("");
  //STATE TO STORE THE NAME OF THE POSTER
  const [posterName, setPosterName] = useState("");
  //STATE TO STORE NEW CUSTOMIZED INGREDIENTS ARRAY
  const [ingredientArr, setIngredientArr] = useState("");
  //STATE TO STORE NEW CUSTOMIZED STEP ARRAY
  const [directionsArr, setDirectionsArr] = useState("");
  //USE USEPARAMS TO GET THE RECIPE ID
  const { detailRecipeId } = useParams();

  //USE EFFECT TO CUSTOMIZE THE INGREDIENTS ARRAY
  useEffect(() => {
    if (recipeData) {
      setIngredientArr(recipeData.ingredients.split(";"));
    }
  }, [recipeData]);

  //USE EFFECT TO CUSTOMIZE THE DIRECTIONS ARRAY
  useEffect(() => {
    if (recipeData && recipeData.directions) {
      const arr = recipeData.directions.split(";");
      let newArr = [];
      for (let i = 1; i <= arr.length; i++) {
        newArr.push(`Step ${i}: ${arr[i - 1]}`);
      }
      setDirectionsArr(newArr);
    }
  }, [recipeData]);

  // //USE EFFECT TO GET A SINGLE RECIPE DATA
  useEffect(() => {
    if (detailRecipeId) {
      axios
        .get(`${URL}/recipe-library/${detailRecipeId}`)
        .then((response) => {
          setRecipeData(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [detailRecipeId]);

  //USE EFFECT TO GET PROFILE OF THE RECIPE POSTER
  useEffect(() => {
    if (recipeData && recipeData.poster_id) {
      axios
        .get(`${URL}/poster-profile/${recipeData.poster_id}`)
        .then((response) => {
          setPosterName(response.data.username);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [recipeData]);

  if (recipeData) {
    return (
      <div className="detail-recipe">
        {/* FIRST BIG WRAP */}
        <div className="detail-recipe__first-wrapper">
          <img
            className="detail-recipe__img"
            src={recipeData.image}
            alt="recipe-img"
          />
          {posterName && (
            <div className="detail-recipe__avatar-wrapper">
              <Avatar avatarClassName="avatar" />
              <p>
                Recipe by{" "}
                {posterName.replace(
                  posterName.split("")[0],
                  posterName.split("")[0].toUpperCase()
                )}
              </p>
            </div>
          )}
        </div>
        {/* SECOND BIG WRAP */}
        <div className="detail-recipe__second-wrapper">
          {/* RECIPE NAME */}
          <h2 className="detail-recipe__heading">{recipeData.recipe_name}</h2>
          <div className="detail-recipe__recipe-infor">
            {/* READY TIME INFOR */}
            <p className="detail-recipe__ready-time">
              <span className="detail-recipe__small-text">Ready time:</span>{" "}
              {recipeData.ready_time} minutes
            </p>
            {/* LIKES INFOR */}
            <div className="detail-recipe__like-infor">
              <p>
                <span className="detail-recipe__small-text">Likes:</span>{" "}
                {recipeData.likes}
              </p>
              <img
                className="detail-recipe__like-icon"
                src={likeIcon}
                alt="like-icon"
              />
            </div>
          </div>

          <div className="detail-recipe__ingre-step-boxes">
            <div className="detail-recipe__ingre-step-box">
              <img
                className="detail-recipe__ingredient-pic"
                src={ingredientPic}
                alt="ingredient-pic"
              />
              {/* INGREDIENT NUMBER */}
              <div className="detail-recipe__ingredients-infor-wrapper">
                <h3>Ingredients:</h3>
                <p>{ingredientArr.length} ingredients</p>
              </div>
              {/* INGREDIENTS */}
              <ul className="detail-recipe__ingredients">
                {ingredientArr &&
                  ingredientArr.map((ingredient) => (
                    <li key={ingredient} className="detail-recipe__ingredient">
                      {ingredient}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="detail-recipe__ingre-step-box">
              <img
                className="detail-recipe__step-pic"
                src={stepPic}
                alt="steps-pic"
              />
              {/* DIRECTION NUMBER */}
              <div className="detail-recipe__directions-infor-wrapper">
                <h3>Steps to do:</h3>
                <p>{directionsArr.length} steps</p>
              </div>
              {/* DIRECTIONS */}
              <ul className="detail-recipe__steps">
                {directionsArr &&
                  directionsArr.map((step) => (
                    <li key={step} className="detail-recipe__step">
                      {step}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
