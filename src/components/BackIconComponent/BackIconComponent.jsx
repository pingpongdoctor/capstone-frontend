import "./BackIconComponent.scss";
import backIcon from "../../assets/icons/previous.png";

export default function BackIconComponent({ backClassName, onClickHandler }) {
  return (
    <img
      onClick={onClickHandler}
      className={backClassName}
      src={backIcon}
      alt="back-icon"
    />
  );
}
