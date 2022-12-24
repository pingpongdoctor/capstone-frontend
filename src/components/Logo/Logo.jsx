import "./Logo.scss";
import logo from "../../assets/logos/logo.png";
import { useNavigate } from "react-router-dom";

export default function Logo({ logoClassName }) {
  //USE USENAVIGATE
  const navigate = useNavigate();
  return (
    <img
      onClick={() => {
        navigate("/");
      }}
      className={logoClassName}
      src={logo}
      alt="logo"
    />
  );
}
