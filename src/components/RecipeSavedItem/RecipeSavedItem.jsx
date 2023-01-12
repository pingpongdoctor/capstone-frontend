import "./RecipeSavedItem.scss";
import { timeConvDetail } from "../../Utils/utils";
import { useNavigate, Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete.png";
import editIcon from "../../assets/icons/edit.png";
import { handleCapitalize } from "../../Utils/utils";

export default function RecipeSavedItem({
  recipeName,
  recipeId,
  readyTime,
  recipeLevel,
  timeCreate,
  recipePosterId,
  userProfile,
  handleOpenBox,
}) {
  //USE USENAVIGATE
  const navigate = useNavigate();
  return (
    <li className="recipe-save-item__container">
      <Link
        className="recipe-save-item__wrapper"
        to={`/recipe-library/${recipeId}`}
      >
        <p className="recipe-save-item__text">{recipeName}</p>
        <p className="recipe-save-item__text recipe-save-item__text--ready-time-hidden">
          {readyTime} minutes
        </p>
        <p className="recipe-save-item__text recipe-save-item__text--hidden">
          {handleCapitalize(recipeLevel)}
        </p>
        <p className="recipe-save-item__text recipe-save-item__text--hidden">
          {timeConvDetail(timeCreate)}
        </p>
      </Link>

      <div className="recipe-save-item__icons">
        {recipePosterId === userProfile.id && (
          <img
            onClick={() => {
              navigate(`/edit-recipe/${recipeId}`);
            }}
            className="recipe-save-item__icon recipe-save-item__icon-edit"
            src={editIcon}
            alt="edit-icon"
          />
        )}

        <img
          onClick={() => {
            handleOpenBox(recipeId);
          }}
          className="recipe-save-item__icon"
          src={deleteIcon}
          alt="delete-icon"
        />
      </div>
    </li>
  );
}
