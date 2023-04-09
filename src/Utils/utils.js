import { useState, useEffect } from "react";
//FUNCTION USED TO CONVERT TIMESTAMPS
export const timeConvDetail = function (timestamp) {
  const timeInfo = new Date(timestamp).getTime();
  const timeInfoCurrent = Date.now();
  const timeSince = timeInfoCurrent - timeInfo;
  const secondAgo = timeSince / 1000;
  const mitnuteAgo = secondAgo / 60;
  const hourAgo = mitnuteAgo / 60;
  const dayAgo = hourAgo / 24;
  const monthAgo = dayAgo / 30;
  const yearAgo = dayAgo / 365;

  if (mitnuteAgo < 1) {
    const timeDisplayDetail = `${Math.round(secondAgo)} seconds ago`;
    return timeDisplayDetail;
  } else if (mitnuteAgo >= 1 && mitnuteAgo < 60) {
    const timeDisplayDetail = `${Math.round(mitnuteAgo)} minutes ago`;
    return timeDisplayDetail;
  } else if (mitnuteAgo >= 60 && dayAgo < 1) {
    const timeDisplayDetail = `${Math.round(hourAgo)} hours ago`;
    return timeDisplayDetail;
  } else if (dayAgo >= 1 && dayAgo < 30) {
    const timeDisplayDetail = `${Math.round(dayAgo)} days ago`;
    return timeDisplayDetail;
  } else if (monthAgo >= 1 && monthAgo < 12) {
    const timeDisplayDetail = `${Math.round(monthAgo)} months ago`;
    return timeDisplayDetail;
  } else if (yearAgo >= 1) {
    const timeDisplayDetail = `${Math.trunc(yearAgo)} years ago`;
    return timeDisplayDetail;
  }
};

//FUNCTION TO CAPITALIZE WORDS
export const handleCapitalize = (value) => {
  let wordArr = value.split(" ");
  if (wordArr.length > 1) {
    let newWordArr = [];
    for (let i = 0; i < wordArr.length; i++) {
      newWordArr.push(
        wordArr[i].split("")[0].toUpperCase() + wordArr[i].substring(1)
      );
    }
    const newWord = newWordArr.join(" ");
    return newWord;
  } else {
    const caplitalizedWord = value.replace(
      value.split("")[0],
      value.split("")[0].toUpperCase()
    );
    return caplitalizedWord;
  }
};

//GET JWT TOKEN FROM LOCAL STORAGE
export const jwtToken = localStorage.getItem("jwt_token");

//DEFINE HEADERS
export const headers = {
  headers: {
    Authorization: `Bearer ${jwtToken}`,
  },
};

//DECLARE URL
export const API_URL = process.env.REACT_APP_API_URL;

//FUNCTION TO FILTER OUT ALL "-" OPERATOR FROM THE INPUT VALUES
export const handleFilterMinusOperator = function (string) {
  const newString = string
    .split("")
    .filter((letter) => letter !== "-" && letter !== ".")
    .join("");

  return newString;
};

//DECLARE THE HOOK USE WINDOW SIZE
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}
