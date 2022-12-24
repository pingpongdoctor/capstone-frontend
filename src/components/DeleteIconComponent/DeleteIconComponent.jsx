import "./DeleteIconComponent.scss";
import deleteIcon from "../../assets/icons/delete.png";

export default function DeleteIconComponent({ delClassName, onClickHandler }) {
  return (
    <img
      onClick={onClickHandler}
      className={delClassName}
      src={deleteIcon}
      alt="delete-icon"
    />
  );
}
