import "./BuildMacroPage.scss";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Pie, Line } from "react-chartjs-2";
import workoutPic1 from "../../assets/images/workout-1.png";
import workoutPic2 from "../../assets/images/workout-2.png";
import workoutPic3 from "../../assets/images/workout-3.png";
import cookingPic from "../../assets/images/cooking.png";
import pieChartPic from "../../assets/images/pie-chart.png";
import barChartPic from "../../assets/images/bar-chart.png";
import lineChartPic from "../../assets/images/line-chart.png";
import meditationPic from "../../assets/images/meditation.png";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import NotificationComponent from "../../components/NotificationComponent/NotificationComponent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { API_URL } from "../../Utils/utils";
import { handleFilterMinusOperator, handleCapitalize } from "../../Utils/utils";
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
const fitnessCalculatorFunctions = require("fitness-calculator");

export default function BuildMacroPage({ userProfile, loginState, closeMenu }) {
  //GET JWT TOKEN FROM LOCAL STORAGE
  const jwtToken = localStorage.getItem("jwt_token");
  //DEFINE HEADERS
  const headers = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  //STATE TO CONTROL THE LOADING PAGE
  const [displayNoneClass, setDisplayNoneClass] = useState("");
  //THE STATES FOR WEIGHT, HEIGHT, AGE, GENDER
  const [currentWeight, setCurrentWeight] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  //STATES
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
  const [showSaveMacro, setShowSaveMacro] = useState(false);
  //STATES FOR BODY TYPE EXPLAINATION
  const [typeExplain, setTypeExplain] = useState("");
  //STATE TO SHOW THE "BUILD MACRO FOR SOMEONE ELSE"
  const [buildForFriend, setBuildForFriend] = useState(false);
  //STATE TO SET WHO YOU BUILD MACRO FOR
  const [buildFor, setBuildFor] = useState("user");
  //USE USENAVIGATE
  const navigate = useNavigate();
  //FUNCTION TO SET THE STATES FOR CURRENT WEIGHT, HEIGHT, AGE, GENDER
  const handleCurrentWeight = function (event) {
    setCurrentWeight(Number(handleFilterMinusOperator(event.target.value)));
  };
  const handleHeight = function (event) {
    setHeight(Number(handleFilterMinusOperator(event.target.value)));
  };
  const handleAge = function (event) {
    setAge(Number(handleFilterMinusOperator(event.target.value)));
  };
  const handleGender = function (event) {
    setGender(event.target.value);
  };
  //FUNCTION TO SET THE STATE FOR "WHO DO YOU BUILD MACRO FOR"
  const handleBuildFor = function (event) {
    setBuildFor(event.target.value);
  };
  //USE USEREF
  const neededTdeeRef = useRef();
  const bodyTypeRef = useRef();
  const macroRatioRef = useRef();
  const quatitiesRef = useRef();
  const lineRef = useRef();
  //SCROLLING FUNCTION
  const handleScroll = (value) => {
    value.current.scrollIntoView({ behavior: "smooth" });
  };
  //USE EFFECT TO SROLL TO ELEMENTS
  useEffect(
    () => {
      if (currentWeight && height && gender && age && tdee) {
        handleScroll(neededTdeeRef);
      }
      if (neededIntake) {
        handleScroll(bodyTypeRef);
      }
      if (proteinRatio && carbRatio && fatRatio) {
        handleScroll(macroRatioRef);
      }
      if (protein && carb && fat) {
        handleScroll(quatitiesRef);
      }
      if (
        targetedWeight &&
        currentWeight &&
        estimatedWeekArr.length > 0 &&
        estimatedWeightArr.length > 0 &&
        currentWeight !== targetedWeight &&
        showSaveMacro
      ) {
        handleScroll(lineRef);
      }
    },
    // eslint-disable-next-line
    [
      tdee,
      neededIntake,
      proteinRatio,
      carbRatio,
      fatRatio,
      goal,
      protein,
      carb,
      fat,
      showSaveMacro,
      targetedWeight,
      estimatedWeekArr,
      estimatedWeightArr,
      currentWeight,
    ]
  );
  //USE EFFECT TO HANDLE THE STATE "BUILD FOR FRIEND" BASED ON THE STATE "BUILD FOR"
  useEffect(() => {
    if (loginState) {
      if (buildFor === "user") {
        setBuildForFriend(false);
        setCurrentWeight(userProfile.weight);
        setHeight(userProfile.height);
        setAge(userProfile.age);
        setGender(userProfile.gender);
      } else if (buildFor === "friend") {
        setBuildForFriend(true);
        setCurrentWeight("");
        setHeight("");
        setAge("");
        setGender("");
        setActivity("");
        setTdee("");
      }
    }
    // eslint-disable-next-line
  }, [buildFor, loginState]);
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
      setMacroThirdBtnState("btn--macro-page--error");
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

      if (goal === "maintain") {
        setShowSaveMacro(true);
        setTargetedWeight(currentWeight);
      } else {
        setShowSaveMacro(false);
        setTargetedWeight("");
      }
    }
  };

  //USE EFFECT TO SET BODY TYPE EXPLATINATION STATE
  useEffect(() => {
    if (loginState && bodyType) {
      if (bodyType === "ectomorph") {
        setTypeExplain(
          " An ectomorph is characterized by a small frame size and little body fat. People who have this body type may be long and lean with little muscle mass. They may have difficulty gaining weight and muscle no matter what they eat or do in the gym."
        );
      }
      if (bodyType === "mesomorph") {
        setTypeExplain(
          "People with a mesomorph body type tend to have a medium frame. They may develop muscles easily and have more muscle than fat on their bodies. Mesomorphs are typically strong and solid, not overweight or underweight. Their bodies may be described as rectangular in shape with an upright posture."
        );
      }
      if (bodyType === "endomorph") {
        setTypeExplain(
          "Characterized by higher body fat and less muscle, endomorphs may appear round and soft. They may also put on pounds more easily. This does not necessarily mean that individuals with this body type are overweight. Rather, they’re more likely to gain weight than those who have other body types."
        );
      }
    }
  }, [bodyType, loginState]);

  //USE EFFECT TO RESET TDEE
  useEffect(() => {
    setTdee("");
  }, [activity, age, currentWeight, height, gender]);

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

  //USE EFFECT TO RESET LINE CHART DATA AND THE SHOWS STATE OF THE LAST STEP AND MACRO NAME
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

  useEffect(() => {
    setShowSaveMacro(false);
  }, [bodyType, goal, activity]);

  //USE EFFECT TO GET CURRENT WEIGHT,HEIGHT,AGE
  useEffect(() => {
    if (loginState) {
      setCurrentWeight(userProfile.weight);
      setAge(userProfile.age);
      setHeight(userProfile.height);
      setGender(userProfile.gender);
    }
    // eslint-disable-next-line
  }, [loginState]);

  //FUNCTION TO HANDLE THE TARGETED WEIGHT STATE
  const handleTargetedWeight = function (event) {
    setTargetedWeight(Number(handleFilterMinusOperator(event.target.value)));
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
      weekArr.push(`week ${i}`);
    }
    return weekArr;
  };

  //FUNCTION TO VALIDATE THE TARGETED WEIGHT
  const isTargetedWeightValid = function () {
    if (
      !targetedWeight ||
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
      setMacroFifthBtnState("btn--macro-page--error");
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
    // eslint-disable-next-line
  }, [estimatedWeekArr]);

  //FUNCTION TO CALCULATE TDEE (REQUIRED INPUT VALUES: GENDER, AGE, HEIGHT, WEIGHT, ACTIVITY)
  const handleBalancedTdee = function () {
    if (activity && age && currentWeight && height && gender) {
      const balancedTdee = Math.round(
        fitnessCalculatorFunctions.TDEE(
          gender === "others" ? "male" : gender,
          age,
          height,
          currentWeight,
          activity
        )
      );
      setTdee(balancedTdee);
      setMacroFirstBtnState("");
    } else {
      setMacroFirstBtnState("btn--macro-page--error");
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
      setMacroSecondBtnState("btn--macro-page--error");
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
      goal &&
      bodyType &&
      gender &&
      height &&
      currentWeight &&
      height
    ) {
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
            gender,
            height,
            weight: currentWeight,
            age,
          },
          headers
        )
        .then((reponse) => {
          alert(
            "Congratulations! You have successfully created and saved a new macro"
          );
          navigate("/macro-list");
          window.scrollTo(0, 0);
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
        text: "Line Chart",
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

  //DATA FOR THE PIE CHART
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

  //USEEFFECT TO SET THE DISPLAYNONECLASS STATE FOR THE LOADING PAGE
  useEffect(() => {
    if (loginState && userProfile) {
      setTimeout(() => {
        setDisplayNoneClass("loading-component__display-none");
      }, 1200);
    }
  }, [loginState, userProfile]);

  if (loginState) {
    return (
      <div onMouseEnter={closeMenu} className="macro-page">
        <LoadingComponent displayNoneClass={displayNoneClass} />
        <div className="macro-page__container">
          <div className="macro-page__welcome">
            <h2>
              Hey {userProfile.username}! Follow these below steps to build your
              ideal macro ratios
            </h2>

            <div>
              <label htmlFor="build-for">Who do you build for?</label>
              <select
                onChange={handleBuildFor}
                className="macro-page__input"
                name="build-for"
                id="build-for"
              >
                <option value="user">User</option>
                <option value="friend">Your Friends</option>
              </select>
            </div>

            {!buildForFriend && (
              <p>
                Here are some data retrieved from your profile that are needed
                to calculate your TDEE. If this is not correct, please update
                your profile.
              </p>
            )}

            {!buildForFriend && gender && (
              <ul className="macro-page__list">
                <li>Gender: {handleCapitalize(gender)}</li>
                <li>Age: {age}</li>
                <li>Height: {height} cm</li>
                <li>Weight: {currentWeight} kg</li>
              </ul>
            )}

            {buildForFriend && (
              <div className="macro-page__flex-container">
                {/* WEIGHT */}
                <div className="macro-page__flex-item">
                  <label className="macro-page__label" htmlFor="current-weight">
                    Type Weight (kg)
                  </label>
                  <input
                    value={currentWeight}
                    onChange={handleCurrentWeight}
                    onWheel={(e) => {
                      e.target.blur();
                    }}
                    className="macro-page__input-box"
                    id="current-weight"
                    name="weight"
                    type="number"
                  />
                </div>
                {/* HEIGHT */}
                <div className="macro-page__flex-item">
                  <label
                    className="macro-page__label"
                    id="height"
                    htmlFor="height"
                  >
                    Type Height (cm)
                  </label>
                  <input
                    value={height}
                    onChange={handleHeight}
                    onWheel={(e) => {
                      e.target.blur();
                    }}
                    className="macro-page__input-box"
                    name="height"
                    type="number"
                  />
                </div>
                {/* AGE */}
                <div className="macro-page__flex-item">
                  <label className="macro-page__label" htmlFor="age">
                    Type Age
                  </label>
                  <input
                    value={age}
                    onChange={handleAge}
                    onWheel={(e) => {
                      e.target.blur();
                    }}
                    className="macro-page__input-box"
                    id="age"
                    name="age"
                    type="number"
                  />
                </div>
                {/* GENDER */}
                <div className="macro-page__flex-item">
                  <label className="macro-page__label" htmlFor="gender">
                    Gender
                  </label>
                  <select
                    onChange={handleGender}
                    className="macro-page__input macro-page__gender-input"
                    name="gender"
                    id="gender"
                  >
                    <option value="">Choose here</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>
            )}
          </div>
          {/* STEP 1 */}
          {currentWeight && height && gender && age && (
            <div className="macro-page__steps">
              <img
                className="macro-page__image"
                src={workoutPic1}
                alt="workout-pic-1"
              />

              <div className="macro-page__big-wrapper">
                <h3>Step 1: Calculate your TDEE</h3>
                <p>
                  TDEE: Total daily energy expenditure (TDEE) estimates how many
                  calories your body burns daily. Based on this, you can know
                  how much you need to eat everyday to make your weight remain
                  unchanged.
                </p>
                {/* OPTION BOX */}
                <div>
                  <label className="macro-page__step-label" htmlFor="activity">
                    How intense do you do exercise in a week?
                  </label>
                  <select
                    className="macro-page__input"
                    value={activity}
                    onChange={handleActivity}
                    name="activity"
                    id="activity"
                  >
                    <option value="">Choose here</option>
                    <option value="sedentary">
                      Sedentary - about 2 days a week
                    </option>
                    <option value="light">Light - about 3 days a week</option>
                    <option value="moderate">
                      Moderate - about 4 days a week
                    </option>
                    <option value="active">Active - about 5 days a week</option>
                    <option value="extreme">
                      Extreme - about 6 days a week
                    </option>
                  </select>
                  <ButtonComponent
                    btnClassName={`btn ${macroFirstBtnState}`}
                    onClickHandler={handleBalancedTdee}
                    btnContent="Calculate your TDEE now"
                  />
                  {/* RESULT */}
                  {tdee && <p>Your TDEE is: {tdee} calories</p>}
                </div>
              </div>
            </div>
          )}
          {/* STEP 2 */}
          {activity && tdee && (
            <div className="macro-page__steps">
              <img
                ref={neededTdeeRef}
                className="macro-page__image"
                src={workoutPic2}
                alt="workout-pic-2"
              />

              <div className="macro-page__big-wrapper">
                <h3>
                  Step 2: Now we can calculate your ideal daily intake of
                  calories.
                </h3>
                <p>
                  Ideal daily intake of calories is the energy you should
                  consume everyday to achieve your targeted weight based on your
                  goal.
                </p>
                {/* OPTION BOX */}
                <div>
                  <label className="macro-page__step-label" htmlFor="goal">
                    What is your general goal?
                  </label>
                  <select
                    className="macro-page__input"
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
                  <ButtonComponent
                    btnClassName={`btn ${macroSecondBtnState}`}
                    onClickHandler={handleNeededEnergy}
                    btnContent="Calculate your ideal daily energy intake"
                  />
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
                ref={bodyTypeRef}
                className="macro-page__image"
                src={workoutPic3}
                alt="workout-pic-3"
              />

              <div className="macro-page__big-wrapper">
                <h3>Step 3: Calculate your macro ratios.</h3>
                <p>
                  Choose your body type to measure your nutritional macro ratio.
                </p>
                {/* OPTION BOX */}
                <div>
                  <label className="macro-page__step-label" htmlFor="body-type">
                    What is your body type?
                  </label>
                  <select
                    className="macro-page__input"
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
                  {bodyType && typeExplain && <p>{typeExplain}</p>}
                  <ButtonComponent
                    btnClassName={`btn ${macroThirdBtnState}`}
                    onClickHandler={handleRatios}
                    btnContent="Show your macro ratios in a pie chart"
                  />
                </div>
              </div>
            </div>
          )}
          {/* RESULT */}
          {tdee && neededIntake && proteinRatio && carbRatio && fatRatio && (
            <div className="macro-page__chart">
              <img
                ref={macroRatioRef}
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
                ref={quatitiesRef}
                className="macro-page__image"
                src={cookingPic}
                alt="cooking-pic"
              />
              <div className="macro-page__big-wrapper">
                <h3>
                  Step 4: We then continue to calculate how much protein, carb
                  and fat in quantity you should eat everyday to achieve your
                  goal
                </h3>
                <ButtonComponent
                  btnClassName="btn"
                  onClickHandler={handleQuantities}
                  btnContent="Calculate nutritional quantities now"
                />
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
          {goal !== "maintain" && protein && carb && fat && (
            <div className="macro-page__steps">
              <img
                className="macro-page__image"
                src={barChartPic}
                alt="bar-chart-pic"
              />
              <div className="macro-page__big-wrapper">
                <h3>
                  Step 5: Show the time amount that you need to spent to achieve
                  your goal based on your targeted weight
                </h3>

                <label
                  className="macro-page__step-label"
                  htmlFor="targeted-weight"
                >
                  Type your targeted weight here
                </label>
                <div className="macro-page__wrapper">
                  <input
                    className="macro-page__input-box"
                    type="number"
                    name="targeted-weight"
                    placeholder="Type weight in kg"
                    id="targeted-weight"
                    value={targetedWeight}
                    onChange={handleTargetedWeight}
                    onWheel={(e) => {
                      e.target.blur();
                    }}
                  />
                  <ButtonComponent
                    btnClassName={`btn btn--macro-page ${macroFifthBtnState}`}
                    onClickHandler={handleEstimatedWeekArr}
                    btnContent="Show the time on a line chart"
                  />
                </div>
              </div>
            </div>
          )}
          {targetedWeight &&
            estimatedWeekArr.length > 0 &&
            estimatedWeightArr.length > 0 &&
            currentWeight !== targetedWeight && (
              <div ref={lineRef} className="macro-page__chart">
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
          {showSaveMacro && (
            <div className="macro-page__steps">
              <img
                className="macro-page__image"
                src={meditationPic}
                alt="meditation-pic"
              />
              <div className="macro-page__big-wrapper">
                <h3>
                  Last step: Let's name and save your macro to your macro list
                </h3>
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
                      You have chosen the name <strong>{macroName}</strong> for
                      your new macro. Click the button below to save your new
                      macro to your macro list
                    </p>
                    <ButtonComponent
                      btnClassName="btn"
                      onClickHandler={handlePostNewMacro}
                      btnContent="Save your macro"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <NotificationComponent />;
  }
}
