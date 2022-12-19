import "./Avatar.scss";
import avatarPic from "../../assets/images/avatar.png";

export default function Avatar({ avatarClassName }) {
  return <img className={avatarClassName} src={avatarPic} alt="avatar" />;
}
