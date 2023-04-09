import "./AddRecipePage.scss";
import InputBox from "../../components/InputBox/InputBox";
import { useState, useEffect } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import BackIconComponent from "../../components/BackIconComponent/BackIconComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleFilterMinusOperator } from "../../Utils/utils";
import { CircularProgress } from "@mui/material";
import NotificationComponent from "../../components/NotificationComponent/NotificationComponent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
const CLOUD_URL = process.env.REACT_APP_CLOUDNARY_URL;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDNARY_UPLOAD_PRESET;
const API_URL = process.env.REACT_APP_API_URL || "";

export default function AddRecipePage({ loginState, userProfile, closeMenu }) {
  //GET JWT TOKEN FROM LOCAL STORAGE
  const jwtToken = localStorage.getItem("jwt_token");
  //DEFINE HEADERS
  const headers = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  //USE USENAVIGATE
  const navigate = useNavigate();
  //STATE TO CONTROL THE LOADING PAGE
  const [displayNoneClass, setDisplayNoneClass] = useState("");
  //STATE TO STORE THE FILE
  const [uploadImage, setUploadImage] = useState(null);
  //SET STATE TO SHOW PREVIEWED IMAGE AFTER CHOOSING AN UPLOADED FILE
  const [previewFile, setPreviewFile] = useState(null);
  //STATE TO STORE THE INGREDIENT BOX
  const [ingredientBoxCount, setIngredientBoxCount] = useState(1);
  //STATE TO STORE THE INGREDIENT BOX
  const [stepBoxCount, setStepBoxCount] = useState(1);
  //STATES FOR RECIPE NAME, LEVEL, READY TIME AND DESCRIPTION
  const [recipeName, setRecipeName] = useState("");
  const [level, setLevel] = useState("");
  const [readyTime, setReadyTime] = useState("");
  const [description, setDescription] = useState("");
  //ERROR STATES
  const [nameError, setNameError] = useState("");
  const [descriptError, setDiscriptError] = useState("");
  const [imageError, setImageError] = useState("");
  const [levelError, setLevelError] = useState("");
  const [readyTimeError, setReadyTimeError] = useState("");
  const [ingreError, setIngreError] = useState("");
  const [stepError, setStepError] = useState("");
  const [progress, setProgress] = useState(false);

  // FUNCTION TO CREATE THE INGREDIENT BOXES' KEY ARRAY
  const handleBoxKeyArr = function (value) {
    let arr = [];
    for (let i = 1; i <= value; i++) {
      arr.push(i);
    }
    return arr;
  };

  //STATE TO STORE THE INGREDIENT
  const [ingredientArr, setIngredientArr] = useState([]);

  //STATE TO STORE THE STEPS
  const [stepArr, setStepArr] = useState([]);

  //FUNCTION TO SET THE FILE STATE
  const handleImage = function (event) {
    setUploadImage(event.target.files[0]);
    const newUrl = window.URL.createObjectURL(event.target.files[0]);
    setPreviewFile(newUrl);
  };

  //FUNCTION AND USE EFFECT TO SET THE INGREDIENT STATES
  const handleIngredientStateArr = function (event) {
    const indexValue = event.target.id;
    const newArr = [...ingredientArr];
    newArr.splice(indexValue, 1, event.target.value);
    setIngredientArr(newArr);
  };

  useEffect(() => {
    if (ingredientArr.length > ingredientBoxCount) {
      const newArr = ingredientArr.filter(
        (ele) => ingredientArr.indexOf(ele) <= ingredientBoxCount - 1
      );
      setIngredientArr(newArr);
    }
    // eslint-disable-next-line
  }, [ingredientBoxCount]);

  //FUNCTION AND USE EFFECT TO SET THE STEP STATES
  const handleStepStateArr = function (event) {
    const indexValue = event.target.id;
    const newArr = [...stepArr];
    newArr.splice(indexValue, 1, event.target.value);
    setStepArr(newArr);
  };

  useEffect(() => {
    if (stepArr.length > stepBoxCount) {
      const newArr = stepArr.filter(
        (ele) => stepArr.indexOf(ele) <= stepBoxCount - 1
      );
      setStepArr(newArr);
    }
    // eslint-disable-next-line
  }, [stepBoxCount]);

  //FUNCTION TO SET THE STATES OF READY TIME, DESCRIPTION, LEVEL AND RECIPE NAME
  const handleReadyTime = function (event) {
    setReadyTime(Number(handleFilterMinusOperator(event.target.value)));
  };

  const handleDescription = function (event) {
    setDescription(event.target.value);
  };

  const handleLevel = function (event) {
    setLevel(event.target.value);
  };

  const handleRecipeName = function (event) {
    setRecipeName(event.target.value);
  };
  //FUNCTION TO UPDATE THE INGREDIENT BOX COUNT
  const handleIncreaseIngreBoxCount = function () {
    if (ingredientArr[ingredientBoxCount - 1]) {
      setIngredientBoxCount(ingredientBoxCount + 1);
    }
  };
  const handleDecreaseIngreBoxCount = function () {
    if (ingredientBoxCount > 1) {
      setIngredientBoxCount(ingredientBoxCount - 1);
    }
  };
  //FUNCTION TO UPDATE THE STEP BOX COUNT
  const handleIncreaseStepBoxCount = function () {
    if (stepArr[stepBoxCount - 1]) {
      setStepBoxCount(stepBoxCount + 1);
    }
  };
  const handleDecreaseStepBoxCount = function () {
    if (stepBoxCount > 1) {
      setStepBoxCount(stepBoxCount - 1);
    }
  };

  //FUNCTION TO VALIDATE THE INGREDIENT AND STEP ARRS
  const isIngreValid = function () {
    let atLeastOneValidValue = false;
    ingredientArr.forEach((ingre) => {
      if (ingre !== "" && ingre !== undefined) {
        atLeastOneValidValue = true;
      }
    });
    if (ingredientArr.length > 0 && atLeastOneValidValue) {
      return true;
    }
    return false;
  };

  const isStepValid = function () {
    let atLeastOneValidValue = false;
    [...stepArr].forEach((step) => {
      if (step !== "" && step !== undefined) {
        atLeastOneValidValue = true;
      }
    });
    if (stepArr.length > 0 && atLeastOneValidValue) {
      return true;
    }
    return false;
  };

  //FUNCTIONS TO RETURN THE EXISTING INGREDIENTS AND STEPS IN STRING
  const handleReturnString = function (array) {
    let arr = [];
    for (let i = 0; i < array.length; i++) {
      arr.push(`${array[i]};`);
    }
    const newArr = arr.map((ele) => {
      if (ele === arr[arr.length - 1]) {
        ele = ele.replace(";", "");
      }
      return ele;
    });
    const newStr = newArr.join("");
    return newStr;
  };
  //FUNCTION TO SUBMIT AN IMAGE TO CLOUDNARY
  const handleOnSubmitRecipe = function (event) {
    event.preventDefault();
    if (
      userProfile &&
      userProfile.id &&
      uploadImage &&
      recipeName &&
      level &&
      readyTime &&
      description &&
      isIngreValid() &&
      isStepValid()
    ) {
      setProgress(true);
      const formData = new FormData();
      formData.append("file", uploadImage);
      formData.append("upload_preset", UPLOAD_PRESET);

      const ingredientString = handleReturnString(
        ingredientArr.filter((ingredient) => ingredient !== "")
      );
      const stepString = handleReturnString(
        stepArr.filter((step) => step !== "")
      );

      axios.post(CLOUD_URL, formData).then((response) => {
        const imageURL = response.data.secure_url;
        const postedRecipe = {
          poster_id: userProfile.id,
          recipe_name: recipeName,
          image: imageURL,
          level: level,
          ready_time: readyTime,
          description: description,
          ingredients: ingredientString,
          directions: stepString,
        };

        axios
          .post(`${API_URL}/recipe-library`, postedRecipe, headers)
          .then((response) => {
            console.log(response.data);
            alert("Thank you for posting a new recipe");
            navigate("/recipe-library");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } else {
      setProgress(false);
      alert("You need to fulfill the correct values for all fields");
      if (!recipeName) {
        setNameError("input-box--add-recipe-error");
      }
      if (!description) {
        setDiscriptError("input-box--add-recipe-error");
      }
      if (!uploadImage) {
        setImageError("input-box--add-recipe-error");
      }
      if (!level) {
        setLevelError("input-box--add-recipe-error");
      }
      if (!readyTime) {
        setReadyTimeError("input-box--add-recipe-error");
      }
      if (!isIngreValid()) {
        setIngreError("add-recipe__textarea--error");
      }
      if (!isStepValid()) {
        setStepError("add-recipe__textarea--error");
      }
    }
  };

  // USE EFFECT TO CLEAR THE ERROR STATES
  useEffect(() => {
    if (recipeName) {
      setNameError("");
    }
    if (description) {
      setDiscriptError("");
    }
    if (uploadImage) {
      setImageError("");
    }
    if (level) {
      setLevelError("");
    }
    if (readyTime) {
      setReadyTimeError("");
    }
    if (isIngreValid()) {
      setIngreError("");
    }
    if (isStepValid()) {
      setStepError("");
    }
  }, [
    recipeName,
    description,
    uploadImage,
    level,
    readyTime,
    isStepValid,
    isIngreValid,
  ]);

  //SET THE DISPLAYNONECLASS STATE FOR THE LOADING PAGE
  setTimeout(() => {
    setDisplayNoneClass("loading-component__display-none");
  }, 1200);

  if (loginState) {
    return (
      <form
        onMouseEnter={closeMenu}
        onSubmit={handleOnSubmitRecipe}
        className="add-recipe"
      >
        <LoadingComponent displayNoneClass={displayNoneClass} />
        <div className="add-recipe__container">
          <div className="add-recipe__heading-wrapper">
            <BackIconComponent
              onClickHandler={() => {
                navigate("/recipe-library");
              }}
              backClassName="back-icon"
            />
            <h1>Add New Recipe</h1>
          </div>
          {/* RECIPE IMAGE */}
          <div className="add-recipe__wrapper">
            <label className="add-recipe__label" htmlFor="uploaded-image">
              Upload new recipe image
            </label>

            {uploadImage && previewFile && (
              <img
                className="add-recipe__previewed-image"
                src={previewFile}
                alt="uploaded-pic"
              />
            )}
            <input
              className={`add-recipe__file-input ${imageError}`}
              onChange={handleImage}
              id="uploaded-image"
              name="uploaded-image"
              type="file"
            />
          </div>

          {/* FLEX CONTAINER */}
          <div className="add-recipe__flex-container">
            {/* FLEX ITEM */}
            <div className="add-recipe__flex-item">
              {/* RECIPE NAME */}
              <div className="add-recipe__field">
                <label className="add-recipe__label" htmlFor="name">
                  Recipe name
                </label>
                <InputBox
                  inputValue={recipeName}
                  inputOnChange={handleRecipeName}
                  inputClassName={`input-box ${nameError}`}
                  inputName="name"
                  inputPlaceholder="Name of new recipe"
                  inputType="text"
                />
              </div>
              {/* DESCRIPTION */}
              <div className="add-recipe__field">
                <label className="add-recipe__label" htmlFor="descrittion">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={handleDescription}
                  className={`add-recipe__textarea add-recipe__descript-textarea ${descriptError}`}
                  placeholder="Type description here"
                  name="description"
                  id="description"
                  wrap="hard"
                ></textarea>
              </div>
              {/* DIFFICULTY LEVEL */}
              <div className="add-recipe__field">
                <label className="add-recipe__label" htmlFor="level">
                  Difficulty level
                </label>
                <select
                  value={level}
                  onChange={handleLevel}
                  className={`add-recipe__select ${levelError}`}
                  name="level"
                  id="level"
                >
                  <option value="">Choose here</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              {/* READY TIME */}
              <div className="add-recipe__field">
                <label className="add-recipe__label" htmlFor="time">
                  Ready time
                </label>
                <InputBox
                  inputValue={readyTime}
                  inputOnChange={handleReadyTime}
                  inputClassName={`input-box ${readyTimeError}`}
                  inputName="time"
                  inputPlaceholder="Ready time in minute"
                  inputType="number"
                  inputOnWheel={(e) => {
                    e.target.blur();
                  }}
                />
              </div>
              <div className="add-recipe__btn-wrapper">
                <ButtonComponent
                  btnClassName="btn btn--add-recipe-submit btn--tablet"
                  btnContent="Post to the recipe library"
                  btnType="submit"
                />
                {progress && (
                  <div className="add-recipe__progress add-recipe__progress--tablet">
                    <CircularProgress />
                  </div>
                )}
              </div>
            </div>

            {/* FLEX ITEM */}
            <div className="add-recipe__flex-item">
              {/* INGREDIENTS */}
              <div className="add-recipe__change-num-wrapper">
                <label className="add-recipe__label-ingre" htmlFor="ingre">
                  Ingredients
                </label>
                <p
                  className="add-recipe__change-num"
                  onClick={handleIncreaseIngreBoxCount}
                >
                  +
                </p>
                <p
                  className="add-recipe__change-num"
                  onClick={handleDecreaseIngreBoxCount}
                >
                  -
                </p>
              </div>
              {handleBoxKeyArr(ingredientBoxCount).map((boxKey, index) => (
                <textarea
                  className={`add-recipe__textarea add-recipe__ingre-textarea add-recipe__input-${boxKey} ${ingreError}`}
                  onChange={handleIngredientStateArr}
                  key={boxKey}
                  placeholder={`Ingredient ${boxKey}`}
                  id={index}
                  wrap="hard"
                ></textarea>
              ))}
              {/* STEPS */}
              <div className="add-recipe__change-num-wrapper add-recipe__change-num-step-wrapper">
                <label className="add-recipe__label-step" htmlFor="step">
                  Steps
                </label>
                <p
                  className="add-recipe__change-num"
                  onClick={handleIncreaseStepBoxCount}
                >
                  +
                </p>
                <p
                  className="add-recipe__change-num"
                  onClick={handleDecreaseStepBoxCount}
                >
                  -
                </p>
              </div>
              {handleBoxKeyArr(stepBoxCount).map((boxKey, index) => (
                <textarea
                  className={`add-recipe__textarea add-recipe__step-textarea add-recipe__input-${boxKey} ${stepError}`}
                  onChange={handleStepStateArr}
                  key={boxKey}
                  placeholder={`Step ${boxKey}`}
                  id={index}
                  wrap="hard"
                ></textarea>
              ))}
            </div>
          </div>
          <div className="add-recipe__btn-wrapper">
            <ButtonComponent
              btnClassName="btn btn--add-recipe-submit btn--mobile"
              btnContent="Post to the recipe library"
              btnType="submit"
            />
            {progress && (
              <div className="add-recipe__progress add-recipe__progress--mobile">
                <CircularProgress />
              </div>
            )}
          </div>
        </div>
      </form>
    );
  } else {
    return <NotificationComponent />;
  }
}
