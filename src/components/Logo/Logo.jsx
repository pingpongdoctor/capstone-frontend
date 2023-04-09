import "./Logo.scss";
import logo from "../../assets/logos/logo.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Logo({ logoClassName }) {
  //GET CURRENT PATH
  const currentPath = useLocation().pathname;
  //USE USENAVIGATE
  const navigate = useNavigate();
  return (
    <img
      onClick={() => {
        if (currentPath === "/") {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else {
          navigate("/");
        }
      }}
      className={logoClassName}
      src={logo}
      alt="logo"
    />
  );
}
