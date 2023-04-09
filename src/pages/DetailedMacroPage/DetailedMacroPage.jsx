import "./DetailedMacroPage.scss";
import axios from "axios";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import BackIconComponent from "../../components/BackIconComponent/BackIconComponent";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { handleCapitalize } from "../../Utils/utils";
import { Pie, Line } from "react-chartjs-2";
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
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
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
const API_URL = process.env.REACT_APP_API_URL || "";

export default function DetailedMacroPage({
  loginState,
  userProfile,
  closeMenu,
}) {
  //GET JWT TOKEN FROM LOCAL STORAGE
  const jwtToken = localStorage.getItem("jwt_token");
  //DEFINE HEADERS
  const headers = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  //GET MACRO ID
  const { macroId } = useParams();
  //USE USENAVIGATE
  const navigate = useNavigate();
  //STATES FOR THE ARRAY OF ESTIMATED WEEKS TO ACHIEVE THE CORRESPONDING PREDICTED WEIGHTS
  const [estimatedWeekArr, setEstimatedWeekArr] = useState([]);
  const [estimatedWeightArr, setEstimatedWeightArr] = useState([]);
  //STATES FOR PROTEIN, CARB AND FAT QUANTITIES
  const [protein, setProtein] = useState("");
  const [carb, setCarb] = useState("");
  const [fat, setFat] = useState("");
  //STATES FOR PROTEIN, CARB AND FAT RARIOS
  const [proteinRatio, setProteinRatio] = useState("");
  const [carbRatio, setCarbRatio] = useState("");
  const [fatRatio, setFatRatio] = useState("");
  //STATES FOR BODY TYPE EXPLAINATION
  const [typeExplain, setTypeExplain] = useState("");
  //STATE FOR THE GOAL TEXT
  const [goalText, setGoalText] = useState("");
  //STATE FOR THE ACTIVITY TEXT
  const [activityText, setActivityText] = useState("");
  //STATE FOR THE MACRO OBJECT
  const [macroObj, setMacroObj] = useState(null);
  //STATES FOR ACTIVATING BOXES
  const [activateFirstBox, setActivateFirstBox] = useState("");
  const [activateSecondBox, setActivateSecondBox] = useState("");
  const [activateThirdBox, setActivateThirdBox] = useState("");
  const [activateLastBox, setActivateLastBox] = useState("");

  //GET DATA OF A DETAILED MACRO
  useEffect(() => {
    if (loginState) {
      axios
        .get(`${API_URL}/macros-list/${macroId}`, headers)
        .then((response) => {
          setMacroObj(response.data);
        });
    }
    // eslint-disable-next-line
  }, [loginState, jwtToken]);

  //FUNCTION TO SET THE STATES FOR ACTIVATING BOXES
  const handleOnclickActivateFirstBox = function () {
    setActivateFirstBox(
      activateFirstBox === "" ? "detail-page__box--activate" : ""
    );
    setActivateLastBox("");
    setActivateSecondBox("");
    setActivateThirdBox("");
  };

  const handleOnclickActivateSecondBox = function () {
    setActivateSecondBox(
      activateSecondBox === "" ? "detail-page__box--activate" : ""
    );
    setActivateLastBox("");
    setActivateFirstBox("");
    setActivateThirdBox("");
  };

  const handleOnclickActivateThirdBox = function () {
    setActivateThirdBox(
      activateThirdBox === "" ? "detail-page__box--activate" : ""
    );
    setActivateLastBox("");
    setActivateSecondBox("");
    setActivateFirstBox("");
  };

  const handleOnclickActivateLastBox = function () {
    setActivateLastBox(
      activateLastBox === "" ? "detail-page__box--activate" : ""
    );
    setActivateFirstBox("");
    setActivateSecondBox("");
    setActivateThirdBox("");
  };

  //USE EFFECT TO SET THE GOAL TEXT
  useEffect(() => {
    if (loginState && macroObj) {
      if (macroObj.goal === "fast-lose") {
        setGoalText("Fast Lose Weight");
      }
      if (macroObj.goal === "slow-lose") {
        setGoalText("Slowly Lose Weight");
      }
      if (macroObj.goal === "fast-gain") {
        setGoalText("Fast Gain Weight");
      }
      if (macroObj.goal === "slow-gain") {
        setGoalText("Slowly Gain Weight");
      }
      if (macroObj.goal === "maintain") {
        setGoalText("Maintain Weight");
      }
    }
    // eslint-disable-next-line
  }, [macroObj]);

  //USE EFFECT TO HANDLE THE ACTIVITY TEXT
  useEffect(() => {
    if (loginState && macroObj) {
      if (macroObj.activity === "sedentary") {
        setActivityText(" Sedentary - about 2 days doing exercise a week");
      }
      if (macroObj.activity === "light") {
        setActivityText("Light - about 3 days doing exercise a week");
      }
      if (macroObj.activity === "moderate") {
        setActivityText("Moderate - about 4 days doing exercise a week");
      }
      if (macroObj.activity === "active") {
        setActivityText("Active - about 5 days doing exercise a week");
      }
      if (macroObj.activity === "extreme") {
        setActivityText("Extreme - about 6 days doing exercise a week");
      }
    }
  }, [macroObj, loginState]);

  //USE EFFECT TO SET PROTEIN, CARB AND FAT RATIOS
  useEffect(() => {
    if (loginState && macroObj) {
      //Ectomorph body type
      if (macroObj.body_type === "ectomorph") {
        setProteinRatio(25);
        setCarbRatio(55);
        setFatRatio(20);
      }
      //Mesomorph body type
      if (macroObj.body_type === "mesomorph") {
        setProteinRatio(30);
        setCarbRatio(40);
        setFatRatio(30);
      }
      //Endomorph body type
      if (macroObj.body_type === "endomorph") {
        setProteinRatio(35);
        setCarbRatio(25);
        setFatRatio(40);
      }
    }
  }, [macroObj, loginState]);

  //USE EFFECT TO SET PROTEIN, CARB AND FAT QUANTITIES
  useEffect(() => {
    if (loginState && macroObj) {
      const proteinQuantity = Math.round(
        (macroObj.tdee * proteinRatio) / 100 / 4
      );
      const carbQuantity = Math.round((macroObj.tdee * carbRatio) / 100 / 4);
      const fatQuantity = Math.round((macroObj.tdee * fatRatio) / 100 / 9);
      setProtein(proteinQuantity);
      setCarb(carbQuantity);
      setFat(fatQuantity);
    }
  }, [macroObj, loginState, proteinRatio, carbRatio, fatRatio]);

  //USE EFFECT TO SET BODY TYPE EXPLATINATION STATE
  useEffect(() => {
    if (loginState && macroObj) {
      if (macroObj.body_type === "ectomorph") {
        setTypeExplain(
          " An ectomorph is characterized by a small frame size and little body fat. People who have this body type may be long and lean with little muscle mass. They may have difficulty gaining weight and muscle no matter what they eat or do in the gym."
        );
      }
      if (macroObj.body_type === "mesomorph") {
        setTypeExplain(
          "People with a mesomorph body type tend to have a medium frame. They may develop muscles easily and have more muscle than fat on their bodies. Mesomorphs are typically strong and solid, not overweight or underweight. Their bodies may be described as rectangular in shape with an upright posture."
        );
      }
      if (macroObj.body_type === "endomorph") {
        setTypeExplain(
          "Characterized by higher body fat and less muscle, endomorphs may appear round and soft. They may also put on pounds more easily. This does not necessarily mean that individuals with this body type are overweight. Rather, they’re more likely to gain weight than those who have other body types."
        );
      }
    }
  }, [macroObj, loginState]);

  //FUNCTION TO BUILD AN ARRAY OF ESTIMATED WEEK
  const countEstimatedWeekArr = function (weeks) {
    let weekArr = [];
    for (let i = 1; i <= weeks; i++) {
      weekArr.push(`week ${i}`);
    }
    return weekArr;
  };

  //USE EFFECT TO SET ESTIMATED WEEK ARRAY STATE
  useEffect(() => {
    if (loginState && macroObj && userProfile) {
      const weightDescrepancy = Math.abs(
        macroObj.targeted_weight - macroObj.weight
      );
      if (macroObj.goal === "slow-gain" || macroObj.goal === "slow-lose") {
        const estimatedWeeks = Math.round((weightDescrepancy * 7000) / 300 / 7);
        const estimatedArr = countEstimatedWeekArr(estimatedWeeks);
        setEstimatedWeekArr(estimatedArr);
      } else if (
        macroObj.goal === "fast-gain" ||
        macroObj.goal === "fast-lose"
      ) {
        const estimatedWeeks = Math.round((weightDescrepancy * 7000) / 500 / 7);
        const estimatedArr = countEstimatedWeekArr(estimatedWeeks);
        setEstimatedWeekArr(estimatedArr);
      }
    }
  }, [loginState, macroObj, userProfile]);

  //USE EFFECT TO SET THE PREDICTED WEIGHTS ARRAY
  useEffect(() => {
    if (loginState && userProfile && macroObj && estimatedWeekArr) {
      let weightArr = [macroObj.weight];
      let newWeight = macroObj.weight;
      const weekNumber = estimatedWeekArr.length;
      const weightDescrepancy = Math.abs(
        macroObj.targeted_weight - macroObj.weight
      );
      const weightWeeklyChange = weightDescrepancy / weekNumber;
      if (macroObj.weight > macroObj.targeted_weight) {
        for (let i = 1; i <= weekNumber; i++) {
          newWeight = newWeight - weightWeeklyChange;
          weightArr.push(newWeight);
        }
      }
      if (macroObj.weight < macroObj.targeted_weight) {
        for (let i = 1; i <= weekNumber; i++) {
          newWeight = newWeight + weightWeeklyChange;
          weightArr.push(newWeight);
        }
      }
      setEstimatedWeightArr(weightArr);
    }
    // eslint-disable-next-line
  }, [estimatedWeekArr]);

  //DATA FOR THE PIE CHART
  const data = {
    labels: ["Protein Ratio", "Carb Ratio", "Fat Ratio"],
    datasets: [
      {
        label: "Percent",
        data: [proteinRatio, carbRatio, fatRatio],
        backgroundColor: [
          "rgba(255, 99, 132, 0.4)",
          "rgba(255, 69, 0, 0.4)",
          "rgba(75, 192, 192, 0.4)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 69, 0, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
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
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  if (loginState) {
    return (
      <div onMouseEnter={closeMenu} className="detail-page">
        <div className="detail-page__huge-container">
          <div className="detail-page__heading-wrap">
            <div className="detail-page__back-icon-wrapper">
              <BackIconComponent
                onClickHandler={() => {
                  navigate("/macro-list");
                }}
                backClassName="back-icon"
              />
              <h1 className="detail-page__main-heading">Macro Details</h1>
            </div>

            {macroObj && (
              <ButtonComponent
                onClickHandler={() => {
                  navigate(`/edit-macro/${macroObj.id}`);
                }}
                btnContent="Edit"
                btnClassName="btn btn--detail-macro btn--tablet"
              />
            )}
          </div>

          {macroObj && (
            <h3 className="detail-page__heading">
              Macro Name: {handleCapitalize(macroObj.macro_name)}
            </h3>
          )}

          {macroObj && (
            <ButtonComponent
              onClickHandler={() => {
                navigate(`/edit-macro/${macroObj.id}`);
              }}
              btnContent="Edit"
              btnClassName="btn btn--detail-macro btn--mobile"
            />
          )}

          <div className="detail-page__container">
            {/* FIRST BOX */}
            <div
              onClick={handleOnclickActivateFirstBox}
              className={`detail-page__box detail-page__first-box ${activateFirstBox}`}
            >
              {macroObj && (
                <div className="detail-page__value">
                  <p className="detail-page__field">Current Weight: </p>
                  <p>{macroObj.weight} kg</p>
                </div>
              )}

              {macroObj && (
                <div className="detail-page__value">
                  <p className="detail-page__field">Targeted Weight: </p>
                  <p>{macroObj.targeted_weight} kg</p>
                </div>
              )}

              <div className="detail-page__value">
                <p className="detail-page__field">Goal: </p>
                <p>{goalText}</p>
              </div>

              <div className="detail-page__value">
                <p className="detail-page__field">Activity: </p>
                <p>{activityText}</p>
              </div>

              {macroObj && (
                <div className="detail-page__value">
                  <p className="detail-page__field">TDEE: </p>
                  <p>{macroObj.tdee} calories</p>
                </div>
              )}

              {macroObj && (
                <div className="detail-page__value">
                  <p className="detail-page__field">Daily Energy Intake: </p>
                  <p>{macroObj.tdee_need} calories</p>
                </div>
              )}
            </div>

            {/* SECOND BOX */}
            <div
              onClick={handleOnclickActivateSecondBox}
              className={`detail-page__wrapper-line-chart ${activateSecondBox}`}
            >
              <Line options={options} data={lineData} />
            </div>

            {/* THIRD BOX */}
            <div
              onClick={handleOnclickActivateThirdBox}
              className={`detail-page__box detail-page__third-box ${activateThirdBox}`}
            >
              {macroObj && (
                <div className="detail-page__value">
                  <p className="detail-page__field">Body Type: </p>
                  <p>{handleCapitalize(macroObj.body_type)}</p>
                </div>
              )}

              {macroObj && typeExplain && (
                <div className="detail-page__explain">
                  <p>{typeExplain}</p>
                </div>
              )}

              {macroObj && (
                <div className="detail-page__value">
                  <p className="detail-page__field">Protein: </p>
                  <p>{protein} gram</p>
                </div>
              )}

              {macroObj && (
                <div className="detail-page__value">
                  <p className="detail-page__field">Carb: </p>
                  <p>{carb} gram</p>
                </div>
              )}

              {macroObj && (
                <div className="detail-page__value">
                  <p className="detail-page__field">Fat: </p>
                  <p>{fat} gram</p>
                </div>
              )}
            </div>

            {/* LAST BOX */}
            <div
              onClick={handleOnclickActivateLastBox}
              className={`detail-page__wrapper-chart ${activateLastBox}`}
            >
              <Pie data={data} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
