import "./HeaderComponent.scss";
import logo from "../../assets/logos/logo.png";
import menu from "../../assets/icons/white-menu.png";
import userProfile from "../../assets/icons/user-profile.png";
import { Link } from "react-router-dom";

export default function HeaderComponent({
  loginState,
  handleLogout,
  popOutSideMenu,
}) {
  return (
    <div className="header-page">
      <img
        onClick={popOutSideMenu}
        className="menu menu--header-page"
        alt="menu"
        src={menu}
      />

      <img className="logo logo--header-page" src={logo} alt="logo" />
      <div className="header-page__wrapper">
        <Link className="header-page__link header-page__build-macro">
          Build Macronutrients
        </Link>
        {loginState && (
          <Link className="header-page__link header-page__track">
            Track Body Indexes
          </Link>
        )}
        {loginState && (
          <Link className="header-page__link header-page__macro-list">
            Macro List
          </Link>
        )}
        {loginState && (
          <Link className="header-page__link header-page__recipe-list">
            Recipe List
          </Link>
        )}
        <Link className="header-page__link header-page_recipe-library">
          Recipe Library
        </Link>
        {!loginState && <Link className="header-page__link">Sign Up</Link>}
        {!loginState && (
          <Link to={"/login"} className="header-page__link">
            Log in
          </Link>
        )}
        {loginState && (
          <img
            className="header-page__user-profile"
            src={userProfile}
            alt="user-profile"
          />
        )}
        {loginState && (
          <Link onClick={handleLogout} className="header-page__link">
            Log out
          </Link>
        )}
      </div>
    </div>
  );
}
