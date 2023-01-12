import "./RecipeCommentItem.scss";
import Avatar from "../Avatar/Avatar";
import { useEffect, useState } from "react";
import axios from "axios";
import { handleCapitalize } from "../../Utils/utils";
import deleteIcon from "../../assets/icons/close.png";
import likeIcon from "../../assets/icons/thumb-up.png";

const API_URL = process.env.REACT_APP_API_URL || "";

export default function RecipeCommentItem({
  commentText,
  commentLike,
  userId,
  commentId,
  recipeId,
  headers,
  getCommentData,
  userProfile,
  loginState,
}) {
  //STATE TO STORE THE COMMENT POSTER NAME
  const [posterName, setPosterName] = useState("");
  //USE EFFECT THE GET THE BASIC INFORMATION OF THE COMMENT POSTER
  useEffect(() => {
    if (userId) {
      axios.get(`${API_URL}/user-profile/${userId}`).then((response) => {
        setPosterName(response.data.username);
      });
    }
    // eslint-disable-next-line
  }, []);
  //FUNCTION TO DELETE THE COMMENTS
  const handleOnclickDelete = function () {
    axios
      .delete(
        `${API_URL}/recipe-library/${recipeId}/comments/${commentId}`,
        headers
      )
      .then((response) => {
        getCommentData();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //FUNCTION TO UPDATE LIKE NUMBER
  const handleOnclickLike = function () {
    if (loginState && userProfile.id !== userId) {
      axios
        .put(`${API_URL}/recipe-library/${recipeId}/comments/${commentId}`)
        .then((response) => {
          getCommentData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <li className="recipe-comment">
      <div className="recipe-comment__wrapper">
        <Avatar avatarClassName="avatar" />
        {posterName && (
          <p className="recipe-comment__username">
            {handleCapitalize(posterName)}
          </p>
        )}
        {loginState && userProfile && userProfile.id === userId && (
          <img
            onClick={handleOnclickDelete}
            className="recipe-comment__delete-icon"
            src={deleteIcon}
            alt="delete-icon"
          />
        )}
      </div>
      <p className="recipe-comment__text">{commentText}</p>
      <div className="recipe-comment__like-wrapper">
        <p className="recipe-comment__like-text">Likes:</p>
        <p className="recipe-comment__like-number">{commentLike}</p>
        {loginState && userProfile && userProfile.id !== userId && (
          <img
            onClick={handleOnclickLike}
            className="recipe-comment__like-icon"
            src={likeIcon}
            alt="like-icon"
          />
        )}
      </div>
    </li>
  );
}
