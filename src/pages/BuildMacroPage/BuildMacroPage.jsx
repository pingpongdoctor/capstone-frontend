import "./BuildMacroPage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pie, Line } from "react-chartjs-2";
import { useEffect } from "react";
import workoutPic1 from "../../assets/images/workout-1.png";
import workoutPic2 from "../../assets/images/workout-2.png";
import workoutPic3 from "../../assets/images/workout-3.png";
import cookingPic from "../../assets/images/cooking.png";
import pieChartPic from "../../assets/images/pie-chart.png";
import barChartPic from "../../assets/images/bar-chart.png";
import lineChartPic from "../../assets/images/line-chart.png";
import meditationPic from "../../assets/images/meditation.png";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const URL = process.env.REACT_APP_API_URL || "";
const fitnessCalculatorFunctions = require("fitness-calculator");

export default function BuildMacroPage({ userProfile, loginState }) {
  //GET JWT TOKEN FROM LOCAL STRING
  const jwtToken = localStorage.getItem("jwt_token");
  //STATES FOR THE ACTIVITY INTENSE LEVEL
  const [activity, setActivity] = useState("");
  const [tdee, setTdee] = useState("");
  const [goal, setGoal] = useState("");
  const [neededIntake, setNeededIntake] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [proteinRatio, setProteinRatio] = useState("");
  const [carbRatio, setCarbRatio] = useState("");
  const [fatRatio, setFatRatio] = useState("");
  const [protein, setProtein] = useState("");
  const [carb, setCarb] = useState("");
  const [fat, setFat] = useState("");
  const [macroFirstBtnState, setMacroFirstBtnState] = useState("");
  const [macroSecondBtnState, setMacroSecondBtnState] = useState("");
  const [macroThirdBtnState, setMacroThirdBtnState] = useState("");
  const [macroFifthBtnState, setMacroFifthBtnState] = useState("");
  const [macroName, setMacroName] = useState("");
  const [targetedWeight, setTargetedWeight] = useState("");
  const [estimatedWeekArr, setEstimatedWeekArr] = useState([]);
  const [estimatedWeightArr, setEstimatedWeightArr] = useState([]);
  const [currentWeight, setCurrentWeight] = useState("");
  const [showSaveMacro, setShowSaveMacro] = useState(false);
  //USE USENAVIGATE
  const navigate = useNavigate();
  //FUNCTION TO SET PROTEIN, CARB AND FAT RATIOS
  const handleRatios = function () {
    //Ectomorph body type
    if (bodyType && bodyType === "ectomorph") {
      setProteinRatio(25);
      setCarbRatio(55);
      setFatRatio(20);
      setMacroThirdBtnState("");
    }
    //Mesomorph body type
    if (bodyType && bodyType === "mesomorph") {
      setProteinRatio(30);
      setCarbRatio(40);
      setFatRatio(30);
      setMacroThirdBtnState("");
    }
    //Endomorph body type
    if (bodyType && bodyType === "endomorph") {
      setProteinRatio(35);
      setCarbRatio(25);
      setFatRatio(40);
      setMacroThirdBtnState("");
    }

    if (!bodyType) {
      setMacroThirdBtnState("button--macro-page-third-error");
    }
  };

  //FUNCTION TO SET PROTEIN, CARB AND FAT QUANTITIES
  const handleQuantities = function () {
    if (proteinRatio && carbRatio && fatRatio && tdee) {
      const proteinQuantity = Math.round((tdee * proteinRatio) / 100 / 4);
      const carbQuantity = Math.round((tdee * carbRatio) / 100 / 4);
      const fatQuantity = Math.round((tdee * fatRatio) / 100 / 9);
      setProtein(proteinQuantity);
      setCarb(carbQuantity);
      setFat(fatQuantity);
    }
    if (goal === "maintain") {
      setShowSaveMacro(true);
      setTargetedWeight(80);
    } else {
      setShowSaveMacro(false);
      setTargetedWeight("");
    }
  };
  //USE EFFECT TO RESET TDEE
  useEffect(() => {
    setTdee("");
  }, [activity]);

  //USE EFFECT TO RESET GOAL
  useEffect(() => {
    setNeededIntake("");
  }, [goal, activity]);

  //USE EFFECT TO RESET BODY TYPE
  useEffect(() => {
    setProteinRatio("");
    setCarbRatio("");
    setFatRatio("");
  }, [bodyType, goal, activity]);

  //USE EFFECT TO RESET QUANTITES
  useEffect(() => {
    setProtein("");
    setCarb("");
    setFat("");
  }, [proteinRatio, carbRatio, fatRatio, bodyType, goal, activity]);

  //USE EFFECT TO RESET LINE CHART DATA AND MACRO NAME
  useEffect(() => {
    setEstimatedWeekArr([]);
    setEstimatedWeightArr([]);
    setMacroFifthBtnState("");
    setMacroName("");
  }, [
    proteinRatio,
    carbRatio,
    fatRatio,
    bodyType,
    goal,
    activity,
    targetedWeight,
  ]);
  console.log(estimatedWeekArr);
  //USE EFFECT TO GET CURRENT WEIGHT
  useEffect(() => {
    setCurrentWeight(userProfile.weight);
  }, []);

  //FUNCTION TO HANDLE THE TARGETED WEIGHT STATE
  const handleTargetedWeight = function (event) {
    setTargetedWeight(Math.round(event.target.value));
  };

  //FUNCTION TO HADNLE THE MACRO NAME STATE
  const handleMacroName = function (event) {
    setMacroName(event.target.value);
  };

  //FUNCTION TO HANDLE THE BODY TYPE STATE
  const handleBodyType = function (event) {
    setBodyType(event.target.value);
  };

  //FUNCTION TO HANDLE THE STATE OF THE ACTIVITY INTENSE LEVEL
  const handleActivity = function (event) {
    setActivity(event.target.value);
  };

  ////FUNCTION TO HANDLE THE GOAL STATE
  const handleGoal = function (event) {
    setGoal(event.target.value);
  };

  //FUNCTION TO BUILD AN ARRAY OF ESTIMATED WEEK
  const countEstimatedWeekArr = function (weeks) {
    let weekArr = [];
    for (let i = 1; i <= weeks; i++) {
      weekArr.push("week" + " " + i);
    }
    return weekArr;
  };

  //FUNCTION TO VALIDATE THE TARGETED WEIGHT
  const isTargetedWeightValid = function () {
    if (
      (goal.includes("lose") && targetedWeight > currentWeight) ||
      (goal.includes("gain") && targetedWeight < currentWeight) ||
      targetedWeight === currentWeight
    ) {
      return false;
    } else {
      return true;
    }
  };

  //FUNCTION TO HANDLE ESTIMATED WEEK ARRAY STATE
  const handleEstimatedWeekArr = function () {
    if (isTargetedWeightValid()) {
      const weightDescrepancy = Math.abs(targetedWeight - currentWeight);
      if (goal === "slow-gain" || goal === "slow-lose") {
        const estimatedWeeks = Math.round((weightDescrepancy * 7000) / 300 / 7);
        const estimatedArr = countEstimatedWeekArr(estimatedWeeks);
        setMacroFifthBtnState("");
        setEstimatedWeekArr(estimatedArr);
        setShowSaveMacro(true);
      } else if (goal === "fast-gain" || goal === "fast-lose") {
        const estimatedWeeks = Math.round((weightDescrepancy * 7000) / 500 / 7);
        const estimatedArr = countEstimatedWeekArr(estimatedWeeks);
        setMacroFifthBtnState("");
        setEstimatedWeekArr(estimatedArr);
        setShowSaveMacro(true);
      }
    } else {
      setMacroFifthBtnState("button--macro-page-fifth-error");
      setShowSaveMacro(false);
    }
  };

  //USE EFFECT TO HANDLE THE ESTIMATED WEIGHT ARRAY STATE WHEN THE ESTIMATED WEEK ARRAY STATE IS UPDATED
  useEffect(() => {
    let weightArr = [currentWeight];
    let newWeight = currentWeight;
    const weekNumber = estimatedWeekArr.length;
    const weightDescrepancy = Math.abs(targetedWeight - currentWeight);
    const weightWeeklyChange = weightDescrepancy / weekNumber;
    if (currentWeight > targetedWeight) {
      for (let i = 1; i <= weekNumber; i++) {
        newWeight = newWeight - weightWeeklyChange;
        weightArr.push(newWeight);
      }
    }
    if (currentWeight < targetedWeight) {
      for (let i = 1; i <= weekNumber; i++) {
        newWeight = newWeight + weightWeeklyChange;
        weightArr.push(newWeight);
      }
    }
    setEstimatedWeightArr(weightArr);
  }, [estimatedWeekArr]);

  //FUNCTION TO CALCULATE TDEE (REQUIRED INPUT VALUES: GENDER, AGE, HEIGHT, WEIGHT, ACTIVITY)
  console.log(activity);
  const handleBalancedTdee = function () {
    if (activity) {
      const balancedTdee = Math.round(
        fitnessCalculatorFunctions.TDEE(
          userProfile.gender,
          userProfile.age,
          userProfile.height,
          currentWeight,
          activity
        )
      );
      setTdee(balancedTdee);
      setMacroFirstBtnState("");
    } else {
      setMacroFirstBtnState("button--macro-page-first-error");
    }
  };

  //FUNCTION TO CALCULATE NEEDED ENERGY INTAKE
  const handleNeededEnergy = function () {
    if (goal && goal === "slow-lose") {
      setNeededIntake(tdee - 300);
      setMacroSecondBtnState("");
    }
    if (goal && goal === "slow-gain") {
      setNeededIntake(tdee + 300);
      setMacroSecondBtnState("");
    }
    if (goal && goal === "fast-lose") {
      setNeededIntake(tdee - 500);
      setMacroSecondBtnState("");
    }
    if (goal && goal === "fast-gain") {
      setNeededIntake(tdee + 500);
      setMacroSecondBtnState("");
    }
    if (goal && goal === "maintain") {
      setNeededIntake(tdee);
      setMacroSecondBtnState("");
    }
    if (!goal) {
      setMacroSecondBtnState("button--macro-page-second-error");
    }
  };

  //FUNCTION TO POST A NEW MACRO
  const handlePostNewMacro = function () {
    if (
      userProfile.id &&
      macroName &&
      targetedWeight &&
      activity &&
      tdee &&
      neededIntake &&
      proteinRatio &&
      carbRatio &&
      fatRatio
    ) {
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
            protein_ratio: proteinRatio,
            carb_ratio: carbRatio,
            fat_ratio: fatRatio,
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        )
        .then((reponse) => {
          alert(
            "Congratulations! You have successfully created and saved a new macro"
          );
          navigate("/");
        });
    }
  };

  //DATA FOR THE LINE CHART
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = ["Start here", ...estimatedWeekArr];
  const lineData = {
    labels,
    datasets: [
      {
        label: "Your estimated weight",
        data: estimatedWeightArr,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  //DATA FOR THE PIE CHART THAT IS BUILT BASED ON THE TRAINING TYPE
  const data = {
    labels: ["Protein Ratio", "Carb Ratio", "Fat Ratio"],
    datasets: [
      {
        label: "Percent",
        data: [proteinRatio, carbRatio, fatRatio],
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
  // console.log(user_id, macroName, targeted_weight,
  //   activity,
  //   tdee,
  //   tdee_need);

  console.log(
    userProfile.id,
    macroName,
    targetedWeight,
    activity,
    tdee,
    neededIntake,
    proteinRatio,
    carbRatio,
    fatRatio
  );
  if (loginState) {
    return (
      <div className="macro-page">
        <div className="macro-page__container">
          <div className="macro-page__welcome">
            <h2>
              Hey {userProfile.username}! Follow these below steps to build your
              ideal macro ratios
            </h2>
            <p>
              Here are some data retrieved from your profile that are needed to
              calculate your TDEE. If this is not correct, please update your
              profile.
            </p>
            <ul className="macro-page_list">
              <li>Gender: {userProfile.gender}</li>
              <li>Age: {userProfile.age}</li>
              <li>Height: {userProfile.height} cm</li>
              <li>Weight: {currentWeight} kg</li>
            </ul>
          </div>
          {/* STEP 1 */}
          <div className="macro-page__steps">
            <img
              className="macro-page__image"
              src={workoutPic1}
              alt="workout-pic-1"
            />
            <div className="macro-page__big-wrapper">
              <h3>Step 1: Calculate your Balanced TDEE</h3>
              <p>
                Balanced TDEE: Total daily energy expenditure (TDEE) estimates
                how many calories your body burns daily. Based on this, you can
                know how much you need to eat everyday to make your weight
                remain unchanged.
              </p>
              {/* OPTION BOX */}
              <div>
                <label htmlFor="activity">
                  How intense do you do exercise in a week?
                </label>
                <select
                  className="maro-page__input"
                  value={activity}
                  onChange={handleActivity}
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
                <button
                  className={`button--macro-page ${macroFirstBtnState}`}
                  onClick={handleBalancedTdee}
                >
                  Calculate your TDEE now
                </button>
                {/* RESULT */}
                {activity && tdee && (
                  <p>Your Balanced TDEE is: {tdee} calories</p>
                )}
              </div>
            </div>
          </div>

          {/* STEP 2 */}
          {tdee && (
            <div className="macro-page__steps">
              <img
                className="macro-page__image"
                src={workoutPic2}
                alt="workout-pic-2"
              />

              <div className="macro-page__big-wrapper">
                <h3>
                  Step 2: Now we can calculate your needed daily energy intake
                  based on your Balanced TDEE
                </h3>
                {/* OPTION BOX */}
                <div>
                  <label htmlFor="goal">What is your general goal?</label>
                  <select
                    className="maro-page__input"
                    value={goal}
                    onChange={handleGoal}
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
                  <button
                    className={`button--macro-page ${macroSecondBtnState}`}
                    onClick={handleNeededEnergy}
                  >
                    Calculate your needed daily energy intake
                  </button>
                  {/* RESULT */}
                  {neededIntake && tdee && (
                    <p>
                      Your Needed Calories Intake is: {neededIntake} calories
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {tdee && neededIntake && (
            <div className="macro-page__steps">
              <img
                className="macro-page__image"
                src={workoutPic3}
                alt="workout-pic-3"
              />

              <div className="macro-page__big-wrapper">
                <h3>
                  Step 3: Now we need to know what is your body type to design
                  your macro ratios
                </h3>
                {/* OPTION BOX */}
                <div>
                  <label htmlFor="training">What is your body type?</label>
                  <select
                    className="maro-page__input"
                    value={bodyType}
                    onChange={handleBodyType}
                    name="training"
                    id="training"
                  >
                    <option value="">Choose here</option>
                    <option value="ectomorph">Ectomorph</option>
                    <option value="mesomorph">Mesomorph</option>
                    <option value="endomorph">Endomorph</option>
                  </select>
                  <button
                    className={`button--macro-page ${macroThirdBtnState}`}
                    onClick={handleRatios}
                  >
                    Show your macro ratios in a pie chart
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* RESULT */}
          {tdee && neededIntake && proteinRatio && carbRatio && fatRatio && (
            <div className="macro-page__chart">
              <img
                className="macro-page__image-chart "
                src={pieChartPic}
                alt="pie-chart-pic"
              />
              <div className="macro-page__wrapper-chart">
                <Pie data={data} />
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {tdee && neededIntake && proteinRatio && carbRatio && fatRatio && (
            <div className="macro-page__steps">
              <img
                className="macro-page__image"
                src={cookingPic}
                alt="cooking-pic"
              />
              <div className="macro-page__big-wrapper">
                <h3>
                  Step 4: Next but not last, we will continue to calculate how
                  much protein, carb and fat you should eat everyday to achieve
                  your goal
                </h3>
                <button
                  className="button--macro-page"
                  onClick={handleQuantities}
                >
                  Calculate nutritional quantities now
                </button>
                {protein && carb && fat && (
                  <p>Your daily needed protein quantity is {protein} gram</p>
                )}
                {protein && carb && fat && (
                  <p>Your daily needed carb quantity is {carb} gram</p>
                )}
                {protein && carb && fat && (
                  <p>Your daily needed fat quantity is {fat} gram</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 5 */}

          {goal !== "maintain" &&
            tdee &&
            neededIntake &&
            proteinRatio &&
            carbRatio &&
            fatRatio &&
            protein &&
            carb &&
            fat && (
              <div className="macro-page__steps">
                <img
                  className="macro-page__image"
                  src={barChartPic}
                  alt="bar-chart-pic"
                />
                <div className="macro-page__big-wrapper">
                  <h3>
                    In this step, we will see how much is the estimated time
                    amount that you need to achieve your goal based on your
                    targeted weight
                  </h3>

                  <label htmlFor="targeted-weight">
                    Type your targeted weight here
                  </label>
                  <div className="macro-page__wrapper">
                    <button
                      className={`button--macro-page ${macroFifthBtnState}`}
                      onClick={handleEstimatedWeekArr}
                    >
                      Show the line chart now
                    </button>
                    <input
                      className="maro-page__input-box"
                      type="number"
                      name="targeted-weight"
                      placeholder="Type weight in kg"
                      id="targeted-weight"
                      value={targetedWeight}
                      onChange={handleTargetedWeight}
                    />
                  </div>
                </div>
              </div>
            )}

          {goal !== "maintain" &&
            tdee &&
            neededIntake &&
            proteinRatio &&
            carbRatio &&
            fatRatio &&
            protein &&
            carb &&
            fat &&
            targetedWeight &&
            estimatedWeekArr.length > 0 &&
            estimatedWeightArr.length > 0 &&
            currentWeight !== targetedWeight && (
              <div className="macro-page__chart">
                <img
                  className="macro-page__image-chart macro-page__image-bar-chart "
                  src={lineChartPic}
                  alt="line-chart-pic"
                />
                <div className="macro-page__wrapper-line-chart">
                  <Line options={options} data={lineData} />
                </div>
              </div>
            )}

          {/* STEP 6 */}
          {showSaveMacro &&
            tdee &&
            neededIntake &&
            proteinRatio &&
            carbRatio &&
            fatRatio &&
            protein &&
            carb &&
            fat &&
            targetedWeight && (
              <div className="macro-page__steps">
                <img
                  className="macro-page__image"
                  src={meditationPic}
                  alt="meditation-pic"
                />
                <div className="macro-page__big-wrapper">
                  <h3>Let's name and save your macro to your macro list</h3>
                  <input
                    type="text"
                    name="macro-name"
                    placeholder="Name your macro here"
                    id="macro-name"
                    value={macroName}
                    onChange={handleMacroName}
                  />
                  {macroName && (
                    <div>
                      <p>
                        You have chosen the name <strong>{macroName}</strong>{" "}
                        for your new macro. Click the button below to save your
                        new macro to your macro list
                      </p>
                      <button
                        onClick={handlePostNewMacro}
                        className="button--macro-page"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
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
