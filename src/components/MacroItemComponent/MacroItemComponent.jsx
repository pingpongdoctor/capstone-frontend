import "./MacroItemComponent.scss";
import { timeConvDetail } from "../../Utils/utils";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete.png";
import editIcon from "../../assets/icons/edit.png";

export default function ItemComponent({
  macroId,
  macroName,
  macroGoal,
  macroEnergy,
  macroTime,
  handleDeleteMacroId,
}) {
  //USE USENAVIGATE
  const navigate = useNavigate();
  //STATE FOR THE GOAL TEXT
  const [goalText, setGoalText] = useState("");
  //STATE FOR THE MACRO NAME TEXT
  const [macroText, setMacroText] = useState("");
  //USE EFFECT TO HANDLE THE GOAL TEXT
  useEffect(() => {
    if (macroGoal === "fast-lose") {
      setGoalText("Fast Lose Weight");
    }
    if (macroGoal === "slow-lose") {
      setGoalText("Slowly Lose Weight");
    }
    if (macroGoal === "fast-gain") {
      setGoalText("Fast Gain Weight");
    }
    if (macroGoal === "slow-gain") {
      setGoalText("Slowly Gain Weight");
    }
    if (macroGoal === "maintain") {
      setGoalText("Maintain Weight");
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
    <li className="item__container">
      <Link className="item__wrapper" to={`/macro-list/${macroId}`}>
        <p className="item__text">{macroText}</p>
        <p className="item__text item__text--hidden">{goalText}</p>
        <p className="item__text item__text--energy-hidden">
          {macroEnergy} calories
        </p>
        <p className="item__text item__text--hidden">
          {timeConvDetail(macroTime)}
        </p>
      </Link>

      <div className="item__icons">
        <img
          onClick={() => {
            navigate(`/edit-macro/${macroId}`);
          }}
          className="item__icon item__icon-edit"
          src={editIcon}
          alt="edit-icon"
        />

        <img
          onClick={() => {
            handleDeleteMacroId(macroId);
          }}
          className="item__icon"
          src={deleteIcon}
          alt="delete-icon"
        />
      </div>
    </li>
  );
}
