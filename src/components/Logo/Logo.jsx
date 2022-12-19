import "./Logo.scss";
import logo from "../../assets/logos/logo.png";

export default function Logo({ logoClassName }) {
  return <img className={logoClassName} src={logo} alt="logo" />;
}
