import "./LoadingComponent.scss";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useState } from "react";
import { useEffect } from "react";
import { useWindowSize } from "../../Utils/utils";
export default function LoadingComponent({ displayNoneClass }) {
  //LOADING PERCENT STATE
  const [loadPercent, setLoadPercent] = useState(0);
  //LOADING COMPONENT SIZE
  const [size, setSize] = useState(80);
  //LOADING DOT TEXT
  const [dotText, setDotText] = useState(".");
  //GET THE CURRENT WIDHT OF THE VIEWPORT
  const currentWidth = useWindowSize().width;
  //USEEFFECT TO SET THE LOADING PERCENT STATE
  useEffect(() => {
    if (loadPercent < 100)
      setTimeout(() => {
        setLoadPercent(loadPercent + 1);
      }, 5);
  }, [loadPercent]);
  //USEEFFECT TO SET THE LOADING COMPONENT STATE
  useEffect(() => {
    if (currentWidth < 500) {
      setSize(40);
    } else {
      setSize(80);
    }
  }, [size]);
  //SETINTERVAL TO SET THE DOT TEXT STATE
  setInterval(() => {
    if (dotText.split("").length < 5) {
      setDotText(dotText + ".");
    } else {
      setDotText(".");
    }
  }, 700);

  return (
    <div className={`loading-component ${displayNoneClass}`}>
      <div>
        <PacmanLoader
          color="#e26e5cfe"
          loading={true}
          size={size}
          aria-label="Loading Spinner"
        />
      </div>

      <p className="loading-component__text">{`LOADING${dotText}`}</p>

      {showPercent && (
        <p className="loading-component__text">
          LOADING <span>{loadPercent}%</span>
        </p>
      )}
    </div>
  );
}
