import "./AddRecipePage.scss";
import InputBox from "../../components/InputBox/InputBox";
import { useState, useEffect } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import BackIconComponent from "../../components/BackIconComponent/BackIconComponent";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CLOUD_URL = process.env.REACT_APP_CLOUDNARY_URL;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDNARY_UPLOAD_PRESET;
const URL = process.env.REACT_APP_API_URL || "";

export default function AddRecipePage({ loginState, userProfile }) {
  //USE USENAVIGATE
  const navigate = useNavigate();
  //GET JWT TOKEN FROM LOCAL STRING
  const jwtToken = localStorage.getItem("jwt_token");
  //DECLARE A HEADERS
  const headers = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
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

  //STATE TO STORE THE INGREDIENT
  const [ingredient1, setIngredient1] = useState("");
  const [ingredient2, setIngredient2] = useState("");
  const [ingredient3, setIngredient3] = useState("");
  const [ingredient4, setIngredient4] = useState("");
  const [ingredient5, setIngredient5] = useState("");
  const [ingredient6, setIngredient6] = useState("");
  const [ingredient7, setIngredient7] = useState("");
  const [ingredient8, setIngredient8] = useState("");
  const [ingredient9, setIngredient9] = useState("");
  const [ingredient10, setIngredient10] = useState("");
  const [ingredient11, setIngredient11] = useState("");
  const [ingredient12, setIngredient12] = useState("");
  //STATE TO STORE THE INGREDIENT
  const [step1, setStep1] = useState("");
  const [step2, setStep2] = useState("");
  const [step3, setStep3] = useState("");
  const [step4, setStep4] = useState("");
  const [step5, setStep5] = useState("");
  const [step6, setStep6] = useState("");
  const [step7, setStep7] = useState("");
  const [step8, setStep8] = useState("");
  const [step9, setStep9] = useState("");
  const [step10, setStep10] = useState("");
  const [step11, setStep11] = useState("");
  const [step12, setStep12] = useState("");
  //FUNCTION TO SET THE FILE STATE
  const handleImage = function (event) {
    setUploadImage(event.target.files[0]);
    const newUrl = window.URL.createObjectURL(event.target.files[0]);
    setPreviewFile(newUrl);
  };

  //FUNCTION TO SET THE INGREDIENT STATES
  const handleIngredientStates = function (event) {
    if (event.target.classList.contains("add-recipe__input-1")) {
      setIngredient1(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-2")) {
      setIngredient2(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-3")) {
      setIngredient3(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-4")) {
      setIngredient4(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-5")) {
      setIngredient5(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-6")) {
      setIngredient6(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-7")) {
      setIngredient7(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-8")) {
      setIngredient8(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-9")) {
      setIngredient9(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-10")) {
      setIngredient10(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-11")) {
      setIngredient11(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-12")) {
      setIngredient12(event.target.value);
    }
  };

  //FUNCTION TO SET THE STEP STATES
  const handleStepStates = function (event) {
    if (event.target.classList.contains("add-recipe__input-1")) {
      setStep1(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-2")) {
      setStep2(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-3")) {
      setStep3(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-4")) {
      setStep4(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-5")) {
      setStep5(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-6")) {
      setStep6(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-7")) {
      setStep7(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-8")) {
      setStep8(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-9")) {
      setStep9(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-10")) {
      setStep10(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-11")) {
      setStep11(event.target.value);
    }
    if (event.target.classList.contains("add-recipe__input-12")) {
      setStep12(event.target.value);
    }
  };

  //FUNCTION TO SET THE STATES OF READY TIME, DESCRIPTION, LEVEL AND RECIPE NAME
  const handleReadyTime = function (event) {
    setReadyTime(Math.abs(event.target.value));
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
    if (ingredientBoxCount <= 12) {
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
    if (stepBoxCount <= 12) {
      setStepBoxCount(stepBoxCount + 1);
    }
  };
  const handleDecreaseStepBoxCount = function () {
    if (stepBoxCount > 1) {
      setStepBoxCount(stepBoxCount - 1);
    }
  };
  // FUNCTION TO CREATE THE INGREDIENT BOXES' KEY ARRAY
  const handleBoxKeyArr = function (value) {
    let arr = [];
    for (let i = 1; i <= value; i++) {
      arr.push(i);
    }
    return arr;
  };
  //FUNCTION TO VALIDATE THE INGREDIENT AND STEP
  const isIngreValid = function () {
    if (
      ingredient1 ||
      ingredient2 ||
      ingredient3 ||
      ingredient4 ||
      ingredient5 ||
      ingredient6 ||
      ingredient7 ||
      ingredient8 ||
      ingredient9 ||
      ingredient10 ||
      ingredient11 ||
      ingredient12
    ) {
      return true;
    }
    return false;
  };

  const isStepValid = function () {
    if (
      step1 ||
      step2 ||
      step3 ||
      step4 ||
      step5 ||
      step6 ||
      step7 ||
      step8 ||
      step9 ||
      step10 ||
      step11 ||
      step12
    ) {
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
  const handleOnSubmitImage = function (event) {
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
      const formData = new FormData();
      formData.append("file", uploadImage);
      formData.append("upload_preset", UPLOAD_PRESET);
      const ingredientArr = [
        ingredient1,
        ingredient2,
        ingredient3,
        ingredient4,
        ingredient5,
        ingredient6,
        ingredient7,
        ingredient8,
        ingredient9,
        ingredient10,
        ingredient11,
        ingredient12,
      ].filter((ingredient) => ingredient !== "");
      const stepArr = [
        step1,
        step2,
        step3,
        step4,
        step5,
        step6,
        step7,
        step8,
        step9,
        step10,
        step11,
        step12,
      ].filter((step) => step !== "");
      const ingredientString = handleReturnString(ingredientArr);
      const stepString = handleReturnString(stepArr);
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
        console.log(postedRecipe);
        axios
          .post(`${URL}/recipe-library`, postedRecipe, headers)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      });
    } else {
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
        setIngreError("input-box--add-recipe-error");
      }
      if (!isStepValid()) {
        setStepError("input-box--add-recipe-error");
      }
    }
  };

  //USE EFFECT TO CLEAR THE ERROR STATES
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

  console.log(ingredientBoxCount);

  if (loginState) {
    return (
      <form onSubmit={handleOnSubmitImage} className="add-recipe">
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
              alt="uploaded-image"
            />
          )}
          <input
            className="add-recipe__file-input"
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
                className={`edit-recipe__textarea add-recipe__descript-textarea ${descriptError}`}
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
              />
            </div>
            <ButtonComponent
              btnClassName="btn btn--add-recipe-submit btn--tablet"
              btnContent="Post to the recipe library"
              btnType="submit"
            />
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
            {handleBoxKeyArr(ingredientBoxCount).map((boxKey) => (
              <textarea
                className={`add-recipe__textarea add-recipe__ingre-textarea add-recipe__input-${boxKey} ${ingreError}`}
                onChange={handleIngredientStates}
                key={boxKey}
                placeholder={`Ingredient ${boxKey}`}
                id="ingre"
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
            {handleBoxKeyArr(stepBoxCount).map((boxKey) => (
              <textarea
                className={`add-recipe__textarea add-recipe__step-textarea add-recipe__input-${boxKey} ${stepError}`}
                onChange={handleStepStates}
                key={boxKey}
                placeholder={`Step ${boxKey}`}
                id="step"
                wrap="hard"
              ></textarea>
            ))}
          </div>
        </div>
        <ButtonComponent
          btnClassName="btn btn--add-recipe-submit btn--mobile"
          btnContent="Post to the recipe library"
          btnType="submit"
        />
      </form>
    );
  } else {
    return (
      <div>
        <h1>You have to login to use this function</h1>
      </div>
    );
  }
}
