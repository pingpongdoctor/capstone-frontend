import "./MacroItemComponent.scss";
import { timeConvDetail } from "../../Utils/utils";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete.png";
import editIcon from "../../assets/icons/edit.png";

export default function ItemComponent({
  macroId,
  macroName,
  macroGoal,
  macroEnergy,
  macroTime,
  handleDeleteMacro,
}) {
  //STATE FOR THE GOAL TEXT
  const [goalText, setGoalText] = useState("");
  //STATE FOR THE MACRO NAME TEXT
  const [macroText, setMacroText] = useState("");
  //USE EFFECT TO HANDLE THE GOAL TEXT
  useEffect(() => {
    if (macroGoal === "fast-lose") {
      setGoalText("Fastly Lose Weight");
    }
    if (macroGoal === "slow-lose") {
      setGoalText("Slowly Lose Weight");
    }
    if (macroGoal === "fast-gain") {
      setGoalText("Fastly Gain Weight");
    }
    if (macroGoal === "slow-gain") {
      setGoalText("Slowly Gain Weight");
    }
  }, [macroGoal]);
  //USE EFFECT TO CAPITALIZE ALL FIRST LETTER OF THE MACRO NAME
  useEffect(() => {
    let wordArr = macroName.split(" ");
    let newWordArr = [];
    for (let i = 0; i < wordArr.length; i++) {
      newWordArr.push(
        wordArr[i].split("")[0].toUpperCase() + wordArr[i].substring(1)
      );
    }
    const newWord = newWordArr.join(" ");
    setMacroText(newWord);
  }, [macroName]);
  return (
    <Link to={`/macro-list/${macroId}`} className="item">
      {" "}
      <li className="item__container">
        <p className="item__text">{macroText}</p>
        <p className="item__text item__text--hidden">{goalText}</p>
        <p className="item__text item__text--energy-hidden">
          {macroEnergy} calories
        </p>
        <p className="item__text item__text--hidden">
          {timeConvDetail(macroTime)}
        </p>
        <div className="item__icons">
          <Link to={`/edit-macro/${macroId}`}>
            <img className="item__icon" src={editIcon} alt="edit-icon" />
          </Link>
          <img
            onClick={() => {
              handleDeleteMacro(macroId);
            }}
            className="item__icon"
            src={deleteIcon}
            alt="delete-icon"
          />
        </div>
      </li>
    </Link>
  );
}
