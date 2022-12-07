import "./BuildMacroPage.scss";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
const fitnessCalculatorFunctions = require("fitness-calculator");

export default function BuildMacroPage({ userProfile, loginState }) {
  //STATES FOR THE ACTIVITY INTENSE LEVEL
  const [activity, setActivity] = useState("");
  const [tdee, setTdee] = useState("");
  const [goal, setGoal] = useState("");
  const [neededIntake, setNeededIntake] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [proteinRatio, setProteinRatio] = useState("");
  const [carbRatio, setCarbRatio] = useState("");
  const [fatRatio, setFatRatio] = useState("");
  const [protein, setProtein] = useState("");
  const [carb, setCarb] = useState("");
  const [fat, setFat] = useState("");

  //FUNCTION TO SET PROTEIN, CARB AND FAT RATIOS
  const handleRatios = function () {
    //RDA
    if (goal && goal === "maintain") {
      setProteinRatio(20);
      setCarbRatio(55);
      setFatRatio(25);
    }
    //GAIN MUSCLE
    if (
      goal &&
      (goal === "fast-gain" || goal === "slow-gain") &&
      trainingType &&
      trainingType === "strength"
    ) {
      setProteinRatio(30);
      setCarbRatio(50);
      setFatRatio(20);
    }
    //LOSE WEIGHT
    if (
      goal &&
      (goal === "fast-lose" || goal === "slow-lose") &&
      trainingType &&
      trainingType === "strength"
    ) {
      setProteinRatio(30);
      setCarbRatio(50);
      setFatRatio(20);
    }
  };

  //FUNCTION TO HANDLE THE TRAINING STATE
  const handleTrainingType = function (event) {
    setTrainingType(event.target.value);
  };

  //FUNCTION TO HANDLE THE STATE OF THE ACTIVITY INTENSE LEVEL
  const handleActivity = function (event) {
    setActivity(event.target.value);
  };

  ////FUNCTION TO HANDLE THE GOAL STATE
  const handleGoal = function (event) {
    setGoal(event.target.value);
  };
  console.log(goal);

  //FUNCTION TO CALCULATE TDEE (REQUIRED INPUT VALUES: GENDER, AGE, HEIGHT, WEIGHT, ACTIVITY)
  const handleBalancedTdee = function () {
    const balancedTdee = Math.round(
      fitnessCalculatorFunctions.TDEE(
        userProfile.gender,
        userProfile.age,
        userProfile.height,
        userProfile.weight,
        activity
      )
    );

    setTdee(balancedTdee);
  };

  //FUNCTION TO CALCULATE NEEDED ENERGY INTAKE
  const handleNeededEnergy = function () {
    if (goal && goal === "slow-lose") {
      setNeededIntake(tdee - 300);
    }
    if (goal && goal === "slow-gain") {
      setNeededIntake(tdee + 300);
    }
    if (goal && goal === "fast-lose") {
      setNeededIntake(tdee - 500);
    }
    if (goal && goal === "fast-gain") {
      setNeededIntake(tdee + 500);
    }
    if (goal && goal === "maintain") {
      setNeededIntake(tdee);
    }
  };
  //DATA FOR THE PIE CHART THAT IS BUILT BASED ON THE TRAINING TYPE
  const data = {
    labels: ["Protein", "Carb", "Fat"],
    datasets: [
      {
        label: "Percent",
        data: [12, 19, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  if (loginState) {
    return (
      <div className="macro-page">
        <h2>
          Hey {userProfile.username}! Follow these below steps to build your
          ideal macro ratios
        </h2>
        <p>
          Here are some data retrieved from your profile that are needed to
          calculate your TDEE. If this is not correct, please update your
          profile.
        </p>
        <button>Update Profile</button>
        <ul>
          <li>Gender: {userProfile.gender}</li>
          <li>Age: {userProfile.age}</li>
          <li>Height: {userProfile.height}</li>
          <li>Weight: {userProfile.weight}</li>
        </ul>

        {/* STEP 1 */}
        <div className="macro-page__first-step">
          <img src="" alt="" />
          <h3>Step 1: Calculate your Balanced TDEE</h3>
          <p>
            Balanced TDEE: Total daily energy expenditure (TDEE) estimates how
            many calories your body burns daily. Based on this, you can know how
            much you need to eat everyday to make your weight remain unchanged.
          </p>
          {/* OPTION BOX */}
          <div>
            <label htmlFor="activity">
              How many day do you do exercise in a week?
            </label>
            <select
              value={activity}
              onChange={handleActivity}
              name="activity"
              id="activity"
            >
              <option>Choose here</option>
              <option value="sedentary">2 days a week</option>
              <option value="light">3 days a week</option>
              <option value="moderate">4 days a week</option>
              <option value="active">5 days a week</option>
              <option value="extreme">more than 6 days a week</option>
            </select>
            <button onClick={handleBalancedTdee}>Calculate now</button>
            {/* RESULT */}
            {tdee && <p>Your Balanced TDEE is: {tdee} calories</p>}
          </div>
        </div>

        {/* STEP 2 */}
        <div>
          <h3>
            Step 2: Now we can calculate your needed daily energy intake based
            on your Balanced TDEE
          </h3>
          {/* OPTION BOX */}
          <div>
            <label htmlFor="goal">What is your general goal?</label>
            <select value={goal} onChange={handleGoal} name="goal" id="goal">
              <option>Choose here</option>
              <option value="slow-lose">Gradually Lose Weight</option>
              <option value="slow-gain">Gradually Gain Weight</option>
              <option value="fast-lose">Fast Lose Weight</option>
              <option value="fast-gain">Fast Gain Weight</option>
              <option value="maintain">Maintain Weight</option>
            </select>
            <button onClick={handleNeededEnergy}>
              Calculate your needed daily energy intake
            </button>
            {/* RESULT */}
            {neededIntake && tdee && (
              <p>Your Needed Calories Intake is: {neededIntake} calories</p>
            )}
          </div>
          <div>
            <h3>
              Step 3:Now we need to know what type of your training to design
              the macro ratios and macronutrients
            </h3>
            {/* OPTION BOX */}
            <div>
              <label htmlFor="training">What is your training type?</label>
              <select
                value={trainingType}
                onChange={handleTrainingType}
                name="training"
                id="training"
              >
                <option>Choose here</option>
                <option value="strength">Strength Training</option>
                <option value="endurance">Endurance Training</option>
              </select>
              <button onClick={handleNeededEnergy}>
                Show your macro ratios your macronutrients in charts
              </button>
              {/* RESULT */}
              <div className="pie">
                <Pie data={data} />
              </div>
            </div>
          </div>
          {/* <p>Please answer some question below</p>
          <label>What is your goal?</label>
          <select name="goal" id="activity">
            <option value="sedentary">Lose Weight</option>
            <option value="light">
              Gain Weight Without Needing To Gain Muscle
            </option>
            <option value="moderate">Remaining Weight and Gain Muscle</option>
            <option value="active">Gain Weight and Gain Muscle</option>
          </select> */}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Please log in to use this function</h1>
      </div>
    );
  }
}
