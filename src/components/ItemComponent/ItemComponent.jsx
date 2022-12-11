import "./ItemComponent.scss";
import { timeConvDetail } from "../../Utils/utils";
import { useState, useEffect } from "react";
import deleteIcon from "../../assets/icons/delete.png";
import editIcon from "../../assets/icons/edit.png";

export default function ItemComponent({
  id,
  macroName,
  macroGoal,
  macroEnergy,
  macroTime,
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
    <li className="item">
      <p className="item__text">{macroText}</p>
      <p className="item__text item__text--hidden">{goalText}</p>
      <p className="item__text item__text--energy-hidden">
        {macroEnergy} calories
      </p>
      <p className="item__text item__text--hidden">
        {timeConvDetail(macroTime)}
      </p>
      <div className="item__icons">
        <img className="item__icon" src={editIcon} alt="edit-icon" />
        <img className="item__icon" src={deleteIcon} alt="delete-icon" />
      </div>
    </li>
  );
}
