import { useState } from "react";
import "./AddMacroPage.scss";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import axios from "axios";
import { useEffect } from "react";
const URL = process.env.REACT_APP_API_URL || "";

export default function AddMacroPage({ loginState, userProfile }) {
  //GET JWT
  const jwtToken = localStorage.getItem("jwt_token");
  //STATES FOR ALL INPUT BOXES
  const [macroName, setMacroName] = useState("");
  const [goal, setGoal] = useState("");
  const [targetedWeight, setTargetedWeight] = useState("");
  const [activity, setActivity] = useState("");
  const [tdee, setTdee] = useState("");
  const [neededIntake, setNeededIntake] = useState("");
  const [bodyType, setBodyType] = useState("");

  //ERROR STATE FOR ALL INPUT BOXES
  const [macroNameError, setMacroNameError] = useState("");
  const [goalError, setGoalError] = useState("");
  const [targetedWeightError, setTargetedWeightError] = useState("");
  const [activityError, setActivityError] = useState("");
  const [tdeeError, setTdeeError] = useState("");
  const [neededIntakeError, setNeededIntakeError] = useState("");
  const [macroBodyError, setMacroBodyError] = useState("");

  //APPEAR STATES FOR THE TARGETED WEIGHT BOX
  const [targetedWeightAppear, setTargetedWeightAppear] = useState(true);

  //FUNCTION TO HANDLE ALL INPUT STATES
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
  //FUNCTIONS TO VALIDATE ALL STATES
  const isMacroNameValid = function () {
    if (macroName) {
      return true;
    }
    return false;
  };

  const isGoalValid = function () {
    if (goal) {
      return true;
    }
    return false;
  };

  const isTargetedWeightValid = function () {
    if (
      targetedWeight &&
      goal.includes("gain") &&
      targetedWeight > userProfile.weight
    ) {
      return true;
    }
    if (
      targetedWeight &&
      goal.includes("lose") &&
      targetedWeight < userProfile.weight
    ) {
      return true;
    }
    return false;
  };

  const isActivityValid = function () {
    if (activity) {
      return true;
    }
    return false;
  };

  const isTdeeValid = function () {
    if (tdee) {
      return true;
    }
    return false;
  };

  const isNeededIntakeValid = function () {
    if (neededIntake && goal.includes("gain") && neededIntake > tdee) {
      return true;
    }
    if (neededIntake && goal.includes("lose") && neededIntake < tdee) {
      return true;
    }
    return false;
  };

  const isBodyTypeValid = function () {
    if (bodyType) {
      return true;
    }
    return false;
  };

  const isFormValid = function () {
    if (
      isMacroNameValid() &&
      isBodyTypeValid() &&
      isActivityValid() &&
      isGoalValid() &&
      isTdeeValid() &&
      isNeededIntakeValid() &&
      isTargetedWeightValid()
    ) {
      return true;
    }
    return false;
  };

  //USE EFFECT TO HANDLE APPEARANCE STATE OF THE TARGETED WEIGHT STATE
  useEffect(() => {
    if (goal === "maintain") {
      setTargetedWeightAppear(false);
      setTargetedWeight(userProfile.weight);
    } else {
      setTargetedWeightAppear(true);
      setTargetedWeight("");
    }
  }, [goal]);

  //USE EFFECT TO HANDLE THE VALUE OF ENERGY INTAKE
  useEffect(() => {
    if (goal === "maintain") {
      setNeededIntake(tdee);
    }
  }, [tdee, neededIntake, goal]);

  //USE EFFECT TO CLEAR THE ERROR
  useEffect(() => {
    if (isMacroNameValid()) {
      setMacroNameError("");
    }

    if (isBodyTypeValid()) {
      setMacroBodyError("");
    }

    if (isGoalValid()) {
      setGoalError("");
    }

    if (isTargetedWeightValid()) {
      setTargetedWeightError("");
    }

    if (isActivityValid()) {
      setActivityError("");
    }

    if (isTdeeValid()) {
      setTdeeError("");
    }

    if (isNeededIntakeValid()) {
      setNeededIntakeError("");
    }
  }, [macroName, goal, tdee, bodyType, neededIntake, activity, targetedWeight]);

  //FUNCTION TO SUBMIT A NEW MACRO
  const handleSubmitMacro = function (event) {
    event.preventDefault();
    console.log("running");
    if (userProfile.id && isFormValid()) {
      axios
        .post(
          `${URL}/macros-list`,
          {
            user_id: userProfile.id,
            macro_name: macroName,
            targeted_weight: targetedWeight,
            activity: activity,
            tdee: tdee,
            tdee_need: neededIntake,
            goal: goal,
            body_type: bodyType,
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          alert("New macro is added");
        })
        .catch((error) => console.log(error));
    } else {
      alert("Please fulfill all correct fields");
      if (!isMacroNameValid()) {
        setMacroNameError("add-macro__input--error");
      }

      if (!isBodyTypeValid()) {
        setMacroBodyError("add-macro__input--error");
      }

      if (!isGoalValid()) {
        setGoalError("add-macro__input--error");
      }

      if (!isTargetedWeightValid()) {
        setTargetedWeightError("add-macro__input--error");
      }

      if (!isActivityValid()) {
        setActivityError("add-macro__input--error");
      }

      if (!isTdeeValid()) {
        setTdeeError("add-macro__input--error");
      }

      if (!isNeededIntakeValid()) {
        setNeededIntakeError("add-macro__input--error");
      }
    }
  };

  if (loginState) {
    return (
      <div className="add-macro">
        <h1>Add New Macro</h1>
        <form onSubmit={handleSubmitMacro} className="add-macro__form">
          <div className="add-macro__flex-container">
            {/* FLEX ITEM */}
            <div className="add-macro__flex-item">
              <div className="add-macro__wrapper">
                <label className="add-macro__label" htmlFor="name">
                  Macro Name
                </label>
                <input
                  className={`add-macro__input ${macroNameError}`}
                  value={macroName}
                  onChange={handleMacroName}
                  id="name"
                  type="text"
                  name="macro-name"
                  placeholder="Macro Name"
                />
              </div>
              <div className="add-macro__wrapper">
                <label className="add-macro__label" htmlFor="body-type">
                  Body Type
                </label>
                <select
                  className={`add-macro__input ${macroBodyError}`}
                  value={bodyType}
                  onChange={handleBodyType}
                  name="body-type"
                  id="body-type"
                >
                  <option value="">Choose here</option>
                  <option value="ectomorph">Ectomorph</option>
                  <option value="mesomorph">Mesomorph</option>
                  <option value="endomorph">Endomorph</option>
                </select>
              </div>

              <div className="add-macro__wrapper">
                <label className="add-macro__label" htmlFor="goal">
                  Goal of Macro
                </label>
                <select
                  value={goal}
                  onChange={handleGoal}
                  className={`add-macro__input ${goalError}`}
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
              <div className="add-macro__wrapper">
                <label className="add-macro__label" htmlFor="activity">
                  Intensity Level of Activity
                </label>
                <select
                  value={activity}
                  onChange={handleActivity}
                  className={`add-macro__input ${activityError}`}
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
            </div>

            {/* FLEX ITEM */}
            <div className="add-macro__flex-item">
              {targetedWeightAppear && (
                <div className="add-macro__wrapper">
                  <label
                    className={"add-macro__label"}
                    htmlFor="targeted-weight"
                  >
                    Targeted Weight
                  </label>
                  <input
                    value={targetedWeight}
                    onChange={handleTargetedWeight}
                    className={`add-macro__input ${targetedWeightError}`}
                    id="targeted-weight"
                    type="number"
                    name="targeted-weight"
                    placeholder="Targeted Weight"
                  />
                </div>
              )}

              <div className="add-macro__wrapper">
                <label className="add-macro__label" htmlFor="tdee">
                  Your Balanced TDEE
                </label>
                <input
                  value={tdee}
                  onChange={handleTdee}
                  className={`add-macro__input ${tdeeError}`}
                  id="tdee"
                  type="number"
                  name="tdee"
                  placeholder="Your TDEE"
                />
              </div>

              <div className="add-macro__wrapper">
                <label className="add-macro__label" htmlFor="needed-intake">
                  Daily Needed Energy Intake
                </label>
                <input
                  value={neededIntake}
                  onChange={handleNeededIntake}
                  className={`add-macro__input ${neededIntakeError}`}
                  id="needed-intake"
                  type="number"
                  name="needed-intake"
                  placeholder="Daily Energy Needed"
                />
              </div>

              <div className="edit-macro__wrapper">
                <label className={"edit-macro__label"}>
                  Your Current Weight
                </label>
                <input
                  value={userProfile.weight}
                  className={`edit-macro__input`}
                  id="current-weight"
                  name="current-weight"
                />
              </div>
            </div>
          </div>
          <ButtonComponent
            btnType="submit"
            btnClassName="btn btn--add-macro"
            btnContent="Add"
          />
        </form>
      </div>
    );
  }
}
