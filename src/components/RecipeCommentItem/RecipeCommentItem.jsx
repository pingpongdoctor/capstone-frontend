import "./RecipeCommentItem.scss";
import Avatar from "../Avatar/Avatar";
import { useEffect, useState } from "react";
import axios from "axios";

const URL = process.env.REACT_APP_API_URL || "";

export default function RecipeCommentItem({
  commentText,
  commentLike,
  commentUserId,
}) {
  //STATE TO STORE THE COMMENT POSTER NAME
  const [posterName, setPosterName] = useState("");
  //USE EFFECT THE GET THE BASIC INFORMATION OF THE COMMENT POSTER
  useEffect(() => {
    if (commentUserId) {
      axios.get(`${URL}/user-profile/${commentUserId}`).then((response) => {
        setPosterName(response.data.username);
      });
    }
  }, []);
  return (
    <li className="recipe-comment">
      <div className="recipe-comment__wrapper">
        <Avatar avatarClassName="avatar" />
        {posterName && <p className="recipe-comment__username">{posterName}</p>}
      </div>
      <p className="recipe-comment__text">{commentText}</p>
      {/* <img src="" alt="like-icon" />
      <img src="" alt="delete-icon" /> */}
    </li>
  );
}
