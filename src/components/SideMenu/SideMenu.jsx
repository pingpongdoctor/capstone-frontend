import "./SideMenu.scss";
import { Link } from "react-router-dom";

export default function SideMenu({ sideMenuState }) {
  return (
    <div className={`side-menu ${sideMenuState}`}>
      <ul className="side-menu__list">
        <Link to={"/"} className="side-menu__item">
          <li>HomePage</li>
        </Link>
        <Link to={"/build-macro"} className="side-menu__item">
          <li>Build Macronutrients</li>
        </Link>
        <Link to={"/macro-list"} className="side-menu__item">
          <li>Macro List</li>
        </Link>
        <Link to={"/add-macro"} className="side-menu__item">
          <li>Add New Macro</li>
        </Link>
        <Link to={"/recipe-library"} className="side-menu__item">
          <li>Recipe Library</li>
        </Link>
        <Link to={"/recipe-list"} className="side-menu__item">
          <li>Recipe List</li>
        </Link>
        <Link to={"/add-recipe"} className="side-menu__item">
          <li>Add New Recipe</li>
        </Link>
        {/* <li className="side-menu__item">Track Body Indexes</li> */}
        {/* <li className="side-menu__item">Nutritional Facts</li>
        <li className="side-menu__item">Barcode Scanning</li> */}
      </ul>
    </div>
  );
}
