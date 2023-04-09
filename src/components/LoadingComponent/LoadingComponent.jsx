import "./LoadingComponent.scss";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useState } from "react";
import { useEffect } from "react";
import { useWindowSize } from "../../Utils/utils";
export default function LoadingComponent() {
  const [loadPercent, setLoadPercent] = useState(0);
  const [size, setSize] = useState(80);
  const currentWidth = useWindowSize().width;
  useEffect(() => {
    if (loadPercent < 100)
      setTimeout(() => {
        setLoadPercent(loadPercent + 1);
      }, 40);
  }, [loadPercent]);
  useEffect(() => {
    if (currentWidth < 500) {
      setSize(40);
    } else {
      setSize(80);
    }
  }, [size]);
  return (
    <div className="loading-component">
      <div>
        <PacmanLoader
          color="#e26e5cfe"
          loading={true}
          size={size}
          aria-label="Loading Spinner"
        />
      </div>
      <p className="loading-component__text">
        LOADING <span>{loadPercent}%</span>
      </p>
    </div>
  );
}
