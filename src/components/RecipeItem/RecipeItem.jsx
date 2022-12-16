import "./RecipeItem.scss";
import Avatar from "../Avatar/Avatar";
import heartPic from "../../assets/images/heart.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { handleCapitalizeAWord } from "../../Utils/utils";
const URL = process.env.REACT_APP_API_URL || "";

export default function RecipeItem({
  recipeImage,
  recipeName,
  recipePosterId,
  id,
}) {
  //STATE TO STORE THE NAME OF THE POSTER
  const [recipePosterName, setRecipePosterName] = useState("");
  //STATE FOR THE HIDDEN CLASSNAME
  const [hiddenState, setHiddenSate] = useState("");
  //USE EFFECT TO SET THE HIDDEN STATE
  useEffect(() => {
    if (recipePosterId === null) {
      setHiddenSate("recipe-item__wrapper--visibility-hidden");
    } else {
      setHiddenSate("");
    }
  }, [recipePosterId]);
  //USE EFFECT TO GET PROFILE OF THE RECIPE POSTER
  useEffect(() => {
    if (recipePosterId !== null) {
      axios
        .get(`${URL}/user-profile/${recipePosterId}`)
        .then((response) => {
          setRecipePosterName(response.data.username);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  if (id) {
    return (
      <Link to={`/recipe-library/${id}`} className="recipe-item">
        <li className="recipe-item__container">
          <img
            className="recipe-item__img"
            src={recipeImage}
            alt="recipe-item__picture"
          />
          <img
            className="recipe-item__heart-img"
            src={heartPic}
            alt="heart-pic"
          />
          <h3 className="recipe__name">{recipeName}</h3>
          <div className={`recipe-item__wrapper ${hiddenState}`}>
            <Avatar avatarClassName="avatar--recipe-library" />
            {recipePosterName && (
              <p className="recipe-item__user">
                {handleCapitalizeAWord(recipePosterName)}
              </p>
            )}
          </div>
        </li>
      </Link>
    );
  }
}
