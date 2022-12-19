import "./EditRecipePage.scss";
import InputBox from "../../components/InputBox/InputBox";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import axios from "axios";
import { handleCapitalizeAWord } from "../../Utils/utils";
const URL = process.env.REACT_APP_API_URL || "";
const CLOUD_URL = process.env.REACT_APP_CLOUDNARY_URL;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDNARY_UPLOAD_PRESET;

export default function EditRecipePage({ loginState, userProfile }) {
  //USE USENAVIGATE
  const navigate = useNavigate();
  //GET RECIPE ID FROM THE USE PARAMS
  const { recipeId } = useParams();
  //GET JWT TOKEN FROM LOCAL STRING
  const jwtToken = localStorage.getItem("jwt_token");
  //DECLARE A HEADERS
  const headers = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  //STATE TO STORE THE POSTER NAME
  const [posterName, setPosterName] = useState("");
  //STATE TO STORE THE RECIPE DATA
  const [recipeData, setRecipeData] = useState(null);
  //STATE TO STORE THE FILE
  const [uploadImage, setUploadImage] = useState(null);
  //SET STATE TO SHOW PREVIEWED IMAGE AFTER CHOOSING AN UPLOADED FILE
  const [previewFile, setPreviewFile] = useState(null);
  //STATES FOR RECIPE NAME, LEVEL, READY TIME AND DESCRIPTION
  const [recipeName, setRecipeName] = useState("");
  const [level, setLevel] = useState("");
  const [readyTime, setReadyTime] = useState("");
  const [description, setDescription] = useState("");
  //STATE TO STORE THE INGREDIENT AND STEP ARR
  const [ingreArr, setIngreArr] = useState("");
  const [stepArr, setStepArr] = useState("");
  //ERROR STATES
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState("");
  //STATE FOR THE NUMBER OF INGREDIENT BOXES
  const [ingreBoxNum, setIngreBoxNum] = useState("");
  //STATE FOR THE NUMBER OF STEP BOXES
  const [stepBoxNum, setStepBoxNum] = useState("");
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

  //FUNCTION TO UPDATE IGREDIENT AND STEP BOX NUMBER
  const handleIncreaseIngreBoxCount = function () {
    if (ingreBoxNum <= 12) {
      setIngreBoxNum(ingreBoxNum + 1);
    }
  };

  const handleDecreaseIngreBoxCount = function () {
    if (ingreBoxNum >= ingreArr.length + 1) {
      setIngreBoxNum(ingreBoxNum - 1);
    }
  };

  const handleDecreaseStepBoxCount = function () {
    if (stepBoxNum >= stepArr.length + 1) {
      setStepBoxNum(stepBoxNum - 1);
    }
  };

  const handleIncreaseStepBoxCount = function () {
    if (stepBoxNum <= 12) {
      setStepBoxNum(stepBoxNum + 1);
    }
  };

  //USE EFFECT TO SET THE INGRE BOX NUMBER STATE
  useEffect(() => {
    if (loginState && ingreArr) {
      setIngreBoxNum(ingreArr.length);
    }
  }, [loginState, ingreArr]);

  //USE EFFECT TO SET THE STEP BOX NUMBER STATE
  useEffect(() => {
    if (loginState && stepArr) {
      setStepBoxNum(stepArr.length);
    }
  }, [loginState, stepArr]);

  //FUNCTION TO SET THE INGREDIENT STATES
  const handleIngredientStates = function (event) {
    if (event.target.classList.contains("edit-recipe__input-1")) {
      setIngredient1(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-2")) {
      setIngredient2(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-3")) {
      setIngredient3(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-4")) {
      setIngredient4(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-5")) {
      setIngredient5(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-6")) {
      setIngredient6(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-7")) {
      setIngredient7(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-8")) {
      setIngredient8(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-9")) {
      setIngredient9(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-10")) {
      setIngredient10(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-11")) {
      setIngredient11(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-12")) {
      setIngredient12(event.target.value);
    }
  };

  //FUNCTION TO SET THE STEP STATES
  const handleStepStates = function (event) {
    if (event.target.classList.contains("edit-recipe__input-1")) {
      setStep1(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-2")) {
      setStep2(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-3")) {
      setStep3(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-4")) {
      setStep4(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-5")) {
      setStep5(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-6")) {
      setStep6(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-7")) {
      setStep7(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-8")) {
      setStep8(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-9")) {
      setStep9(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-10")) {
      setStep10(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-11")) {
      setStep11(event.target.value);
    }
    if (event.target.classList.contains("edit-recipe__input-12")) {
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
  //FUNCTION TO GET A SINGLE RECIPE DATA
  const handleGetSingleRecipe = function () {
    axios
      .get(`${URL}/recipe-library/${recipeId}`)
      .then((response) => {
        setRecipeData(response.data);
      })
      .catch((error) => console.log(error));
  };
  //FUNCTION TO CLEAR THE VALUE STATES
  const handleClearStates = function () {
    setRecipeName("");
    setDescription("");
    setLevel("");
    setReadyTime("");
    setStep1("");
    setStep2("");
    setStep3("");
    setStep4("");
    setStep5("");
    setStep6("");
    setStep7("");
    setStep8("");
    setStep9("");
    setStep10("");
    setStep11("");
    setStep12("");
    setIngredient1("");
    setIngredient2("");
    setIngredient3("");
    setIngredient4("");
    setIngredient5("");
    setIngredient6("");
    setIngredient7("");
    setIngredient8("");
    setIngredient9("");
    setIngredient10("");
    setIngredient11("");
    setIngredient12("");
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
  // FUNCTION TO CONVERT A NUMBER TO AN ARRAY OF ASCENDING NUMBER ARRAY
  const handleCreateNumArr = function (value) {
    let arr = [];
    for (let i = 1; i <= value; i++) {
      arr.push(i);
    }
    return arr;
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
  //FUNCTION TO IMPLEMENT A PUT REQUEST
  const handlePutData = function (obj) {
    if (recipeData) {
      axios
        .put(`${URL}/recipe-library/${recipeData.id}/update`, obj, headers)
        .then((response) => {
          console.log(response.data);
          handleGetSingleRecipe();
        })
        .catch((error) => console.log(error));
    }
  };

  //USE EFFECT TO CLEAR THE ERROR STATE
  useEffect(() => {
    if (
      uploadImage ||
      recipeName ||
      level ||
      readyTime ||
      description ||
      isIngreValid() ||
      isStepValid()
    ) {
      setError("");
      setInputError("");
    }
  }, [
    uploadImage,
    recipeName,
    level,
    readyTime,
    description,
    isIngreValid,
    isStepValid,
  ]);

  //FUNCTION TO UPDATE THE RECIPE
  const handleOnSubmitUpdateRecipe = function (event) {
    event.preventDefault();
    if (
      userProfile &&
      userProfile.id &&
      recipeData &&
      userProfile.id === recipeData.poster_id &&
      (uploadImage ||
        recipeName ||
        level ||
        readyTime ||
        description ||
        isIngreValid() ||
        isStepValid())
    ) {
      const inputIngredientArr = [
        ingredient1 || ingreArr[0],
        ingredient2 || ingreArr[1],
        ingredient3 || ingreArr[2],
        ingredient4 || ingreArr[3],
        ingredient5 || ingreArr[4],
        ingredient6 || ingreArr[5],
        ingredient7 || ingreArr[6],
        ingredient8 || ingreArr[7],
        ingredient9 || ingreArr[8],
        ingredient10 || ingreArr[9],
        ingredient11 || ingreArr[10],
        ingredient12 || ingreArr[11],
      ].filter((ingredient) => ingredient !== "" && ingredient !== undefined);
      const inputStepArr = [
        step1 || stepArr[0],
        step2 || stepArr[1],
        step3 || stepArr[2],
        step4 || stepArr[3],
        step5 || stepArr[4],
        step6 || stepArr[5],
        step7 || stepArr[6],
        step8 || stepArr[7],
        step9 || stepArr[8],
        step10 || stepArr[9],
        step11 || stepArr[10],
        step12 || stepArr[11],
      ].filter((step) => step !== "" && step !== undefined);
      const uploadObj = {
        recipe_name: recipeName || recipeData.name,
        level: level || recipeData.level,
        ready_time: readyTime || recipeData.ready_time,
        description: description || recipeData.description,
        ingredients:
          handleReturnString(inputIngredientArr) || recipeData.ingredients,
        directions: handleReturnString(inputStepArr) || recipeData.directions,
      };
      //IF IMAGE IS EDITED
      if (uploadImage !== null) {
        const formData = new FormData();
        formData.append("file", uploadImage);
        formData.append("upload_preset", UPLOAD_PRESET);
        axios.post(CLOUD_URL, formData).then((response) => {
          const imageURL = response.data.secure_url;
          const newUploadObj = { ...uploadObj, image: imageURL };
          handlePutData(newUploadObj);
          alert("The recipe is updated");
          navigate("/recipe-library");
        });
      }
      //IF IMAGE IS NOT EDITED
      if (uploadImage === null) {
        handlePutData(uploadObj);
        alert("The recipe is updated");
        navigate("/recipe-library");
      }

      setError("");
      setInputError("");
    } else {
      alert("Please edit at least 1 field");
      setError("input-box--edit-recipe-error");
      setInputError("edit-recipe__input-error");
    }
  };

  //USE EFFECT TO GET THE DATA OF A SINGLE RECIPE
  useEffect(() => {
    if (loginState) {
      handleGetSingleRecipe();
    }
  }, [loginState]);

  //USE EFFECT TO SET TO SET STATES FOR INGREDIENT BOXES AND INGREDIENTS, FOR STEP BOXES AND STEPS
  useEffect(() => {
    if (loginState && recipeData) {
      setStepArr(recipeData.directions.split(";"));
      setIngreArr(recipeData.ingredients.split(";"));
    }
  }, [loginState, recipeData]);

  //USE EFFECT TO GET POSTER NAME
  useEffect(() => {
    if (recipeData) {
      axios
        .get(`${URL}/user-profile/${recipeData.poster_id}`)
        .then((response) => {
          setPosterName(response.data.username);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [recipeData]);

  if (
    loginState &&
    userProfile &&
    recipeData &&
    userProfile.id === recipeData.poster_id
  ) {
    return (
      <form onSubmit={handleOnSubmitUpdateRecipe} className="edit-recipe">
        <div className="edit-recipe__container">
          <h1>Edit Recipe {handleCapitalizeAWord(recipeData.recipe_name)}</h1>
          <h3>Author: {posterName}</h3>
          <div className="edit-recipe__big-container">
            {/* RECIPE IMAGE */}
            <div className="edit-recipe__wrapper">
              <label className="edit-recipe__label" htmlFor="uploaded-image">
                Edit recipe image
              </label>

              <img
                className="edit-recipe__previewed-image"
                src={previewFile || recipeData.image}
                alt="uploaded-image"
              />
              <input
                className={`edit-recipe__file-input ${inputError}`}
                onChange={handleImage}
                id="uploaded-image"
                name="uploaded-image"
                type="file"
              />
            </div>

            <div className="edit-recipe__fields-wrapper">
              {/* RECIPE NAME */}
              <div className="edit-recipe__field">
                <label className="edit-recipe__label" htmlFor="name">
                  Recipe name
                </label>
                <InputBox
                  inputValue={recipeName}
                  inputOnChange={handleRecipeName}
                  inputClassName={`input-box ${error}`}
                  inputName="name"
                  inputPlaceholder={recipeData.recipe_name}
                  inputType="text"
                />
              </div>
              {/* DESCRIPTION */}
              <div className="edit-recipe__field">
                <label className="edit-recipe__label" htmlFor="descrittion">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={handleDescription}
                  className={`edit-recipe__descript-textarea edit-recipe__textarea ${inputError}`}
                  placeholder={recipeData.description}
                  name="description"
                  id="description"
                  wrap="hard"
                ></textarea>
              </div>
              {/* DIFFICULTY LEVEL */}
              <div className="edit-recipe__field">
                <label className="edit-recipe__label" htmlFor="level">
                  Difficulty level
                </label>
                <select
                  value={level || recipeData.level}
                  onChange={handleLevel}
                  className={`edit-recipe__select ${inputError}`}
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
              <div className="edit-recipe__field">
                <label className="edit-recipe__label" htmlFor="time">
                  Ready time
                </label>
                <InputBox
                  inputValue={readyTime}
                  inputOnChange={handleReadyTime}
                  inputClassName={`input-box ${error}`}
                  inputName="time"
                  inputPlaceholder={`${recipeData.ready_time} minutes`}
                  inputType="number"
                />
              </div>
            </div>
          </div>

          {/* FLEX CONTAINER */}
          <div className="edit-recipe__flex-container">
            {/* FLEX ITEM */}
            <div className="edit-recipe__flex-item">
              {/* STEPS */}
              <div>
                <div className="edit-recipe__change-num-wrapper">
                  <label className="edit-recipe__label" htmlFor="step">
                    Steps
                  </label>
                  <p
                    className="edit-recipe__change-num"
                    onClick={handleIncreaseStepBoxCount}
                  >
                    +
                  </p>
                  <p
                    className="edit-recipe__change-num"
                    onClick={handleDecreaseStepBoxCount}
                  >
                    -
                  </p>
                </div>
                {stepArr &&
                  stepBoxNum &&
                  handleCreateNumArr(stepBoxNum).map((step, index) => (
                    <textarea
                      className={`edit-recipe__textarea edit-recipe__step-textarea edit-recipe__input-${
                        index + 1
                      } ${inputError}`}
                      onChange={handleStepStates}
                      key={step}
                      placeholder={stepArr[index] || `Step ${index + 1}`}
                    ></textarea>
                  ))}
                <ButtonComponent
                  btnClassName="btn btn--edit-recipe-submit btn--tablet"
                  btnContent="Post to the recipe library"
                  btnType="submit"
                />
              </div>
            </div>

            {/* FLEX ITEM */}
            <div className="edit-recipe__flex-item">
              {/* INGREDIENTS */}
              <div className="edit-recipe__change-num-wrapper">
                <label className="edit-recipe__label" htmlFor="step">
                  Ingredients
                </label>
                <p
                  className="edit-recipe__change-num"
                  onClick={handleIncreaseIngreBoxCount}
                >
                  +
                </p>
                <p
                  className="edit-recipe__change-num"
                  onClick={handleDecreaseIngreBoxCount}
                >
                  -
                </p>
              </div>
              {ingreArr &&
                ingreBoxNum &&
                handleCreateNumArr(ingreBoxNum).map((ingre, index) => (
                  <textarea
                    className={`edit-recipe__textarea edit-recipe__ingre-textarea edit-recipe__input-${
                      index + 1
                    } ${inputError}`}
                    onChange={handleIngredientStates}
                    key={ingre}
                    placeholder={ingreArr[index] || `Ingredient ${index + 1}`}
                  ></textarea>
                ))}
            </div>
          </div>
          <ButtonComponent
            btnClassName="btn btn--edit-recipe-submit btn--mobile"
            btnContent="Post to the recipe library"
            btnType="submit"
          />
        </div>
      </form>
    );
  }
}
