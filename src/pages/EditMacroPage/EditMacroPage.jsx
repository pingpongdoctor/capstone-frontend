import "./EditMacroPage.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useParams } from "react-router-dom";
import { handleCapitalize } from "../../Utils/utils";
const URL = process.env.REACT_APP_API_URL || "";

export default function EditMacroPage({ userProfile, loginState }) {
  //GET JWT
  const jwtToken = localStorage.getItem("jwt_token");
  //GET MACRO ID
  const { macroId } = useParams();
  //STATE FOR CURRENT BODY INDEXES
  const [currentWeight, setCurrentWeight] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  //STATE FOR THE MACRO OBJECT
  const [macroObj, setMacroObj] = useState(null);
  //STATES FOR ALL INPUT BOXES
  const [macroName, setMacroName] = useState("");
  const [goal, setGoal] = useState("");
  const [targetedWeight, setTargetedWeight] = useState("");
  const [activity, setActivity] = useState("");
  const [tdee, setTdee] = useState("");
  const [neededIntake, setNeededIntake] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [capitalizedNamePlaceholder, setCapitalizedNamePlaceholder] =
    useState("");

  //ERROR STATE FOR ALL INPUT BOXES
  const [macroError, setMacroError] = useState("");
  //DECLARE HEADERS
  const headers = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  //USE EFFECT TO GET THE MACRO INFOR
  useEffect(() => {
    if (loginState) {
      axios.get(`${URL}/macros-list/${macroId}`, headers).then((response) => {
        setMacroObj(response.data);
      });
    }
  }, [loginState, jwtToken]);

  //USE EFFECT TO SET THE CAPITALIZED NAME PLACEHOLDER
  useEffect(() => {
    if (macroObj) {
      const capitalizedName = handleCapitalize(macroObj.macro_name);
      setCapitalizedNamePlaceholder(capitalizedName);
    }
  }, [macroObj]);
  //USE EFFECT TO CLEAR THE ERROR STATE
  useEffect(() => {
    if (
      macroName ||
      goal ||
      targetedWeight ||
      activity ||
      tdee ||
      neededIntake ||
      bodyType ||
      currentWeight ||
      height ||
      gender ||
      age
    ) {
      setMacroError("");
    }
  }, [macroName, goal, targetedWeight, activity, tdee, neededIntake, bodyType]);

  //FUNCTION TO HANDLE ALL INPUT STATES
  const handleCurrentWeight = function (event) {
    setCurrentWeight(Number(event.target.value));
  };
  const handleHeight = function (event) {
    setHeight(Number(event.target.value));
  };
  const handleAge = function (event) {
    setAge(Number(event.target.value));
  };
  const handleGender = function (event) {
    setGender(event.target.value);
  };

  const handleMacroName = function (event) {
    setMacroName(event.target.value);
  };

  const handleGoal = function (event) {
    setGoal(event.target.value);
  };

  const handleTargetedWeight = function (event) {
    setTargetedWeight(Math.round(event.target.value));
  };

  const handleActivity = function (event) {
    setActivity(event.target.value);
  };

  const handleTdee = function (event) {
    setTdee(Math.round(event.target.value));
  };

  const handleNeededIntake = function (event) {
    setNeededIntake(Math.round(event.target.value));
  };

  const handleBodyType = function (event) {
    setBodyType(event.target.value);
  };
  //FUNCTION TO UPDATE A MACRO
  const handleUpdateMacro = function (event) {
    event.preventDefault();
    if (
      macroName ||
      goal ||
      targetedWeight ||
      activity ||
      tdee ||
      neededIntake ||
      bodyType ||
      gender ||
      currentWeight ||
      height ||
      age
    ) {
      const valueObject = {
        macro_name: macroName,
        targeted_weight: targetedWeight,
        activity: activity,
        tdee: tdee,
        tdee_need: neededIntake,
        goal: goal,
        body_type: bodyType,
        gender: gender,
        height,
        weight: currentWeight,
        age,
      };
      let newValueObject = {};

      if (valueObject.macro_name !== "") {
        newValueObject = { ...newValueObject, macro_name: macroName };
      }

      if (valueObject.targeted_weight !== "") {
        newValueObject = { ...newValueObject, targeted_weight: targetedWeight };
      }

      if (valueObject.activity !== "") {
        newValueObject = { ...newValueObject, activity: activity };
      }

      if (valueObject.tdee !== "") {
        newValueObject = { ...newValueObject, tdee: tdee };
      }

      if (valueObject.tdee_need !== "") {
        newValueObject = { ...newValueObject, tdee_need: neededIntake };
      }

      if (valueObject.goal !== "") {
        newValueObject = { ...newValueObject, goal: goal };
      }

      if (valueObject.body_type !== "") {
        newValueObject = { ...newValueObject, body_type: bodyType };
      }

      if (valueObject.weight !== "") {
        newValueObject = { ...newValueObject, body_type: bodyType };
      }

      if (valueObject.height !== "") {
        newValueObject = { ...newValueObject, body_type: bodyType };
      }

      if (valueObject.age !== "") {
        newValueObject = { ...newValueObject, body_type: bodyType };
      }

      if (valueObject.gender !== "") {
        newValueObject = { ...newValueObject, body_type: bodyType };
      }

      console.log(newValueObject);

      axios
        .put(`${URL}/macros-list/${macroId}`, newValueObject, headers)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Please edit at least one field");
      setMacroError("edit-macro__input--error");
    }
  };
  console.log(currentWeight, height, age, gender);
  if (loginState && macroObj) {
    return (
      <div className="edit-macro">
        <h1>Edit Macro {handleCapitalize(macroObj.macro_name)}</h1>
        <form onSubmit={handleUpdateMacro} className="edit-macro__form">
          <div className="edit-macro__flex-container">
            {/* FLEX ITEM */}
            <div className="edit-macro__flex-item">
              <div className="edit-macro__wrapper">
                <label className="edit-macro__label" htmlFor="name">
                  Macro Name
                </label>
                <input
                  className={`edit-macro__input ${macroError}`}
                  value={macroName}
                  onChange={handleMacroName}
                  id="name"
                  type="text"
                  name="macro-name"
                  placeholder={capitalizedNamePlaceholder}
                />
              </div>
              <div className="edit-macro__wrapper">
                <label className="edit-macro__label" htmlFor="body-type">
                  Body Type
                </label>
                <select
                  className={`edit-macro__input ${macroError}`}
                  value={bodyType || macroObj.body_type}
                  onChange={handleBodyType}
                  name="body-type"
                  id="body-type"
                >
                  <option value="ectomorph">Ectomorph</option>
                  <option value="mesomorph">Mesomorph</option>
                  <option value="endomorph">Endomorph</option>
                </select>
              </div>

              <div className="edit-macro__wrapper">
                <label className="edit-macro__label" htmlFor="goal">
                  Goal of Macro
                </label>
                <select
                  value={goal || macroObj.goal}
                  onChange={handleGoal}
                  className={`edit-macro__input ${macroError}`}
                  name="goal"
                  id="goal"
                >
                  <option value="">Choose here</option>
                  <option value="slow-lose">Gradually Lose Weight</option>
                  <option value="slow-gain">Gradually Gain Weight</option>
                  <option value="fast-lose">Fast Lose Weight</option>
                  <option value="fast-gain">Fast Gain Weight</option>
                  <option value="maintain">Maintain Weight</option>
                </select>
              </div>
              <div className="edit-macro__wrapper">
                <label className="edit-macro__label" htmlFor="activity">
                  Intensity Level of Activity
                </label>
                <select
                  value={activity || macroObj.activity}
                  onChange={handleActivity}
                  className={`edit-macro__input ${macroError}`}
                  name="activity"
                  id="activity"
                >
                  <option value="">Choose here</option>
                  <option value="sedentary">
                    Sedentary - about 2 days doing exercise a week
                  </option>
                  <option value="light">
                    Light - about 3 days doing exercise a week
                  </option>
                  <option value="moderate">
                    Moderate - about 4 days doing exercise a week
                  </option>
                  <option value="active">
                    Active - about 5 days doing exercise a week
                  </option>
                  <option value="extreme">
                    Extreme - about 6 days doing exercise a week
                  </option>
                </select>
              </div>

              <div className="edit-macro__wrapper">
                <label className="edit-macro__label" htmlFor="tdee">
                  Your Balanced TDEE
                </label>
                <input
                  value={tdee}
                  onChange={handleTdee}
                  className={`edit-macro__input ${macroError}`}
                  id="tdee"
                  type="number"
                  name="tdee"
                  placeholder={macroObj.tdee}
                />
              </div>

              <div className="edit-macro__wrapper">
                <label className="edit-macro__label" htmlFor="needed-intake">
                  Daily Needed Energy Intake
                </label>
                <input
                  value={neededIntake}
                  onChange={handleNeededIntake}
                  className={`edit-macro__input ${macroError}`}
                  id="needed-intake"
                  type="number"
                  name="needed-intake"
                  placeholder={macroObj.tdee_need}
                />
              </div>
            </div>

            {/* FLEX ITEM */}
            <div className="edit-macro__flex-item">
              <div className="edit-macro__wrapper">
                <label className="edit-macro__label" htmlFor="current-weight">
                  Weight
                </label>
                {macroObj && (
                  <input
                    className={`edit-macro__input ${macroError}`}
                    value={currentWeight}
                    onChange={handleCurrentWeight}
                    id="current-weight"
                    type="number"
                    name="current-weight"
                    placeholder={macroObj.weight}
                  />
                )}
              </div>

              <div className="edit-macro__wrapper">
                <label className="edit-macro__label" htmlFor="targeted-weight">
                  Targeted Weight
                </label>
                <input
                  value={targetedWeight}
                  onChange={handleTargetedWeight}
                  className={`edit-macro__input ${macroError}`}
                  id="targeted-weight"
                  type="number"
                  name="targeted-weight"
                  placeholder={macroObj.targeted_weight}
                />
              </div>

              <div className="add-macro__wrapper">
                <label className="macro-page__text" htmlFor="gender">
                  Gender
                </label>
                {macroObj && (
                  <select
                    value={gender || macroObj.gender}
                    onChange={handleGender}
                    className={`add-macro__input ${macroError}`}
                    name="gender"
                    id="gender"
                  >
                    <option value="">Choose here</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="male">Others</option>
                  </select>
                )}
              </div>

              <div className="add-macro__wrapper">
                <label className="add-macro__label" htmlFor="age">
                  Age
                </label>
                {macroObj && (
                  <input
                    className={`add-macro__input ${macroError}`}
                    value={age}
                    onChange={handleAge}
                    id="age"
                    type="number"
                    name="age"
                    placeholder={macroObj.age}
                  />
                )}
              </div>

              <div className="add-macro__wrapper">
                <label className="add-macro__label" htmlFor="height">
                  Height
                </label>
                {macroObj && (
                  <input
                    className={`add-macro__input ${macroError}`}
                    value={height}
                    onChange={handleHeight}
                    id="height"
                    type="number"
                    name="height"
                    placeholder={macroObj.height}
                  />
                )}
              </div>
            </div>
          </div>
          <ButtonComponent
            btnType="submit"
            btnClassName="btn btn--edit-macro"
            btnContent="Update"
          />
        </form>
      </div>
    );
  }
}
