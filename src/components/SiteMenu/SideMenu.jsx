import "./SideMenu.scss";
import { useState } from "react";

export default function SiteMenu({ sideMenuState }) {
  return (
    <div className={`side-menu ${sideMenuState}`}>
      <ul className="side-menu__list">
        <li className="side-menu__item">HomePage</li>
        <li className="side-menu__item">Build Macronutrients</li>
        <li className="side-menu__item">Track Body Indexes</li>
        <li className="side-menu__item">Macro item</li>
        <li className="side-menu__item">Recipe item</li>
        <li className="side-menu__item">Recipe Library</li>
        <li className="side-menu__item">Nutritional Facts</li>
        <li className="side-menu__item">Barcode Scanning</li>
      </ul>
    </div>
  );
}
