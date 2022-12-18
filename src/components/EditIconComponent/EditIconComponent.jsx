import "./EditIconComponent.scss";
import editIcon from "../../assets/icons/edit.png";

export default function EditIconComponent({ onClickHandler, editClassName }) {
  return (
    <img
      onClick={onClickHandler}
      className={editClassName}
      src={editIcon}
      alt="edit-icon"
    />
  );
}
