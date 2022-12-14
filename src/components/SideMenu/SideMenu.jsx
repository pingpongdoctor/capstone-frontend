import "./SideMenu.scss";
import { Link } from "react-router-dom";

export default function SiteMenu({ sideMenuState }) {
  return (
    <div className={`side-menu ${sideMenuState}`}>
      <ul className="side-menu__list">
        <Link to={"/"} className="side-menu__item">
          <li>HomePage</li>
        </Link>
        <Link to={"/build-macro"} className="side-menu__item">
          <li>Build Macronutrients</li>
        </Link>
        <li className="side-menu__item">Track Body Indexes</li>
        <Link to={"/macro-list"} className="side-menu__item">
          <li>Macro List</li>
        </Link>
        <li className="side-menu__item">Recipe List</li>
        <Link to={"/recipe-library"}>
          <li className="side-menu__item">Recipe Library</li>
        </Link>
        <li className="side-menu__item">Nutritional Facts</li>
        <li className="side-menu__item">Barcode Scanning</li>
      </ul>
    </div>
  );
}
