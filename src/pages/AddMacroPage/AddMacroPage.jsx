import { useState, useEffect } from "react";
import "./AddMacroPage.scss";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackIconComponent from "../../components/BackIconComponent/BackIconComponent";
import { headers } from "../../Utils/utils";
const API_URL = process.env.REACT_APP_API_URL || "";

export default function AddMacroPage({ loginState, userProfile }) {
  //USE USENAVIGATE
  const navigate = useNavigate();
  //STATES FOR ALL INPUT BOXES
  const [macroName, setMacroName] = useState("");
  const [goal, setGoal] = useState("");
  const [targetedWeight, setTargetedWeight] = useState("");
  const [activity, setActivity] = useState("");
  const [tdee, setTdee] = useState("");
  const [neededIntake, setNeededIntake] = useState("");
  const [bodyType, setBodyType] = useState("");
  //STATE FOR CURRENT BODY INDEXES
  const [currentWeight, setCurrentWeight] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
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
  //FUNCTIONS TO VALIDATE ALL STATES
  const isCurrentWeightValid = function () {
    if (currentWeight) {
      return true;
    }
    return false;
  };

  const isHeightValid = function () {
    if (height) {
      return true;
    }
    return false;
  };

  const isAgeValid = function () {
    if (age) {
      return true;
    }
    return false;
  };

  const isGenderValid = function () {
    if (gender) {
      return true;
    }
    return false;
  };

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
      targetedWeight > currentWeight
    ) {
      return true;
    }
    if (
      targetedWeight &&
      goal.includes("lose") &&
      targetedWeight < currentWeight
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
      isTargetedWeightValid() &&
      isHeightValid() &&
      isCurrentWeightValid() &&
      isAgeValid() &&
      isGenderValid()
    ) {
      return true;
    }
    return false;
  };

  //USE EFFECT TO HANDLE APPEARANCE STATE OF THE TARGETED WEIGHT STATE
  useEffect(() => {
    if (goal === "maintain") {
      setTargetedWeightAppear(false);
      setTargetedWeight(currentWeight);
    } else {
      setTargetedWeightAppear(true);
      setTargetedWeight("");
    }
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [macroName, goal, tdee, bodyType, neededIntake, activity, targetedWeight]);

  //FUNCTION TO SUBMIT A NEW MACRO
  const handleSubmitMacro = function (event) {
    event.preventDefault();
    if (userProfile.id && isFormValid()) {
      axios
        .post(
          `${API_URL}/macros-list`,
          {
            user_id: userProfile.id,
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
          },
          headers
        )
        .then((response) => {
          alert("New macro is added");
          navigate("/macro-list");
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
        <div className="add-macro__container">
          <div className="add-macro__heading-wrapper">
            <BackIconComponent
              onClickHandler={() => {
                navigate("/macro-list");
              }}
              backClassName="back-icon"
            />
            <h1 className="add-macro__heading">Add New Macro</h1>
          </div>
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
                    placeholder="Your TDEE (calories)"
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
                    placeholder="Daily Energy Needed (calories)"
                  />
                </div>
              </div>

              {/* FLEX ITEM */}
              <div className="add-macro__flex-item">
                <div className="add-macro__wrapper">
                  <label className="add-macro__label" htmlFor="current-weight">
                    Weight
                  </label>
                  <input
                    className={`add-macro__input`}
                    value={currentWeight}
                    onChange={handleCurrentWeight}
                    id="current-weight"
                    type="number"
                    name="current-weight"
                    placeholder="Weight (kg)"
                  />
                </div>

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
                      placeholder="Targeted Weight (kg)"
                    />
                  </div>
                )}

                <div className="add-macro__wrapper">
                  <label className="macro-page__text" htmlFor="gender">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={handleGender}
                    className="add-macro__input"
                    name="gender"
                    id="gender"
                  >
                    <option value="">Choose here</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="male">Others</option>
                  </select>
                </div>

                <div className="add-macro__wrapper">
                  <label className="add-macro__label" htmlFor="age">
                    Age
                  </label>
                  <input
                    className={`add-macro__input`}
                    value={age}
                    onChange={handleAge}
                    id="age"
                    type="number"
                    name="age"
                    placeholder="Age"
                  />
                </div>

                <div className="add-macro__wrapper">
                  <label className="add-macro__label" htmlFor="height">
                    Height
                  </label>
                  <input
                    className={`add-macro__input`}
                    value={height}
                    onChange={handleHeight}
                    id="height"
                    type="number"
                    name="height"
                    placeholder="Height (cm)"
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
      </div>
    );
  } else {
    return <h1>Please log in to use this function</h1>;
  }
}
