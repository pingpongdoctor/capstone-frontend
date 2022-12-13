import "./RecipeItem.scss";
import Avatar from "../Avatar/Avatar";
import heartPic from "../../assets/images/heart.png";
import { useEffect, useState } from "react";
import axios from "axios";
const URL = process.env.REACT_APP_API_URL || "";

export default function RecipeItem({
  recipeImage,
  recipeName,
  recipePosterId,
}) {
  //STATE TO STORE THE PROFILE OF THE RECIPE POSTER
  const [posterName, setPosterName] = useState("");
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
        .get(`${URL}/poster-profile/${recipePosterId}`)
        .then((response) => {
          setPosterName(response.data.username);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  return (
    <div className="recipe-item">
      <img
        className="recipe-item__img"
        src={recipeImage}
        alt="recipe-item__picture"
      />
      <img className="recipe-item__heart-img" src={heartPic} alt="heart-pic" />
      <h3 className="recipe__name">{recipeName}</h3>
      <div className={`recipe-item__wrapper ${hiddenState}`}>
        <Avatar avatarClassName="avatar--recipe-library" />
        <p className="recipe-item__user">Simon</p>
      </div>
    </div>
  );
}
