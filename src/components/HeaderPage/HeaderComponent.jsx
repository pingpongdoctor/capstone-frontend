import "./HeaderComponent.scss";
import menu from "../../assets/icons/white-menu.png";
import userProfile from "../../assets/icons/user-profile.png";
import Logo from "../Logo/Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function HeaderComponent({
  loginState,
  handleLogout,
  popOutSideMenu,
  handleLoginExperienceAccount,
  closeMenu,
}) {
  //GET THE CURRENT ROUTE
  const location = useLocation();
  const currentRoute = location.pathname;
  //FUNCTION TO LOGIN DEMO ACCOUNT AND COME BACK TO HOMEPAGE
  const navigate = useNavigate();
  const handleLoginDemoAccountAndBackToHome = function () {
    handleLoginExperienceAccount();
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  if (currentRoute !== "/login" && currentRoute !== "/sign-up") {
    return (
      <div onMouseEnter={closeMenu} className="header-page header-page--login">
        <div className="header-page__container">
          <img
            onMouseEnter={popOutSideMenu}
            className="header-page__menu"
            alt="menu"
            src={menu}
          />
          {/* <img className="logo logo--header-page" src={logo} alt="logo" /> */}
          <Logo logoClassName="logo logo--header-page" />
          <div className="header-page__wrapper">
            {!loginState && (
              <p
                onClick={handleLoginDemoAccountAndBackToHome}
                className="header-page__text"
              >
                Demo Account
              </p>
            )}
            {!loginState && (
              <Link to={"/sign-up"} className="header-page__link">
                Sign Up
              </Link>
            )}
            {!loginState && (
              <Link to={"/login"} className="header-page__link">
                Log in
              </Link>
            )}
            {loginState && (
              <Link className="header-page__profile-link" to={"/profile"}>
                <img
                  className="header-page__user-profile-pic"
                  src={userProfile}
                  alt="user-profile"
                />
              </Link>
            )}
            {loginState && (
              <Link
                to={"/"}
                onClick={handleLogout}
                className="header-page__link"
              >
                Log out
              </Link>
            )}
          </div>
        </div>
      </div>
    );
  }
}
