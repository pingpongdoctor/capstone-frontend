import "./FooterComponent.scss";
import Logo from "../Logo/Logo";
import phoneIcon from "../../assets/icons/phone-call.png";
import emailIcon from "../../assets/icons/gmail.png";
import { useLocation } from "react-router-dom";
export default function FooterComponent({ closeMenu }) {
  //GET THE CURRENT ROUTE
  const location = useLocation();
  const currentRoute = location.pathname;

  if (currentRoute !== "/login" && currentRoute !== "/sign-up") {
    return (
      <div onMouseEnter={closeMenu} className="site-footer">
        <div className="site-footer__container">
          <Logo logoClassName="logo logo--site-footer-tablet" />
          <div className="site-footer__flex-container">
            <div className="site-footer__wrapper">
              <p className="site-footer__main-text">Service</p>
              <p>About us</p>
              <p>Contact us</p>
              <p>Blogs</p>
              <p>Features</p>
            </div>
            <div className="site-footer__wrapper">
              <p className="site-footer__main-text">Resources</p>
              <p>Apps</p>
              <p>Developer</p>
              <p>Integration</p>
              <p>Pricing</p>
            </div>
            <div className="site-footer__wrapper">
              <p className="site-footer__main-text">Contact</p>
              <div className="site-footer__small-wrapper">
                <img
                  className="site-footer__icon"
                  src={emailIcon}
                  alt="email"
                />
                <p>buildyourdiet@gmail.com</p>
              </div>
              <div className="site-footer__small-wrapper">
                <img
                  className="site-footer__icon"
                  src={phoneIcon}
                  alt="phone"
                />
                <p>+1(778)2221879</p>
              </div>
            </div>
          </div>
          <Logo logoClassName="logo logo--site-footer-mobile" />
        </div>
      </div>
    );
  }
}
