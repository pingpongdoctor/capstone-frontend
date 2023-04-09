import "./EditRecipePage.scss";
import InputBox from "../../components/InputBox/InputBox";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import axios from "axios";
import BackIconComponent from "../../components/BackIconComponent/BackIconComponent";
import { handleFilterMinusOperator } from "../../Utils/utils";
import { CircularProgress } from "@mui/material";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const API_URL = process.env.REACT_APP_API_URL || "";
const CLOUD_URL = process.env.REACT_APP_CLOUDNARY_URL;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDNARY_UPLOAD_PRESET;

export default function EditRecipePage({ loginState, userProfile, closeMenu }) {
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
  //GET RECIPE ID FROM THE USE PARAMS
  const { recipeId } = useParams();
  //STATE TO CONTROL THE LOADING PAGE
  const [displayNoneClass, setDisplayNoneClass] = useState("");
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
  const [ingredientStateArr, setIngredientStateArr] = useState([]);
  //STATE TO STORE THE STEP
  const [stepStateArr, setStepStateArr] = useState([]);
  //STATE FOR THE PROGRESSING ICON
  const [progress, setProgress] = useState(false);
  //FUNCTION TO SET THE INGREDIENT STATE ARR
  const handleIngredientStateArr = function (event) {
    const indexValue = event.target.id;
    const newArr = [...ingredientStateArr];
    newArr.splice(indexValue, 1, event.target.value);
    const newArr2 = newArr.map((ele) => {
      if (newArr.indexOf(ele) < ingreArr.length && !ele) {
        ele = ingreArr[newArr.indexOf(ele)];
      }
      return ele;
    });
    setIngredientStateArr(newArr2);
  };

  useEffect(() => {
    if (ingredientStateArr.length > ingreBoxNum) {
      const newArr = ingredientStateArr.filter(
        (ele) => ingredientStateArr.indexOf(ele) <= ingreBoxNum - 1
      );
      setIngredientStateArr(newArr);
    }
    if (
      ingredientStateArr.length < ingreBoxNum &&
      ingreBoxNum <= ingreArr.length
    ) {
      const newArr = [...ingredientStateArr];
      newArr.push(ingreArr[ingredientStateArr.length]);
      setIngredientStateArr(newArr);
    }
    // eslint-disable-next-line
  }, [ingreBoxNum]);

  //FUNCTION AND USE EFFECT TO SET THE STEP STATE ARR
  const handleStepStateArr = function (event) {
    const indexValue = event.target.id;
    const newArr = [...stepStateArr];
    newArr.splice(indexValue, 1, event.target.value);
    const newArr2 = newArr.map((ele) => {
      if (newArr.indexOf(ele) < stepArr.length && !ele) {
        ele = stepArr[newArr.indexOf(ele)];
      }
      return ele;
    });
    setStepStateArr(newArr2);
  };

  useEffect(() => {
    if (stepStateArr.length > stepBoxNum) {
      const newArr = stepStateArr.filter(
        (ele) => stepStateArr.indexOf(ele) <= stepBoxNum - 1
      );
      setStepStateArr(newArr);
    }
    if (stepStateArr.length < stepBoxNum && stepBoxNum <= stepArr.length) {
      const newArr = [...stepStateArr];
      newArr.push(stepArr[stepStateArr.length]);
      setStepStateArr(newArr);
    }
    // eslint-disable-next-line
  }, [stepBoxNum]);

  //FUNCTION AND USE EFFECT TO SET THE FILE STATE
  const handleImage = function (event) {
    setUploadImage(event.target.files[0]);
    const newUrl = window.URL.createObjectURL(event.target.files[0]);
    setPreviewFile(newUrl);
  };

  //FUNCTION TO UPDATE IGREDIENT AND STEP BOX NUMBER
  const handleIncreaseIngreBoxCount = function () {
    if (ingreBoxNum < ingreArr.length) {
      setIngreBoxNum(ingreBoxNum + 1);
    }
    if (ingreBoxNum >= ingreArr.length && ingredientStateArr[ingreBoxNum - 1]) {
      setIngreBoxNum(ingreBoxNum + 1);
    }
  };

  const handleIncreaseStepBoxCount = function () {
    if (stepBoxNum < stepArr.length) {
      setStepBoxNum(stepBoxNum + 1);
    }
    if (stepBoxNum >= stepArr.length && stepStateArr[stepBoxNum - 1]) {
      setStepBoxNum(stepBoxNum + 1);
    }
  };

  const handleDecreaseIngreBoxCount = function () {
    if (ingreBoxNum > 1) {
      setIngreBoxNum(ingreBoxNum - 1);
    }
  };

  const handleDecreaseStepBoxCount = function () {
    if (stepBoxNum > 1) {
      setStepBoxNum(stepBoxNum - 1);
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
  //FUNCTION TO GET A SINGLE RECIPE DATA
  const handleGetSingleRecipe = function () {
    axios
      .get(`${API_URL}/recipe-library/${recipeId}`)
      .then((response) => {
        setRecipeData(response.data);
      })
      .catch((error) => console.log(error));
  };
  //FUNCTION TO VALIDATE THE INGREDIENT AND STEP
  const isIngreValid = function () {
    if (ingredientStateArr.toString() !== ingreArr.toString()) {
      return true;
    }
    return false;
  };

  const isStepValid = function () {
    if (stepStateArr.toString() !== stepArr.toString()) {
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
        .put(`${API_URL}/recipe-library/${recipeData.id}/update`, obj, headers)
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

  // FUNCTION TO UPDATE THE RECIPE
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
      setProgress(true);
      const inputIngredientStr = handleReturnString(
        ingredientStateArr.filter(
          (ingredient) => ingredient !== "" && ingredient !== undefined
        )
      );
      const inputStepStr = handleReturnString(
        stepStateArr.filter((step) => step !== "" && step !== undefined)
      );
      const uploadObj = {
        recipe_name: recipeName || recipeData.name,
        level: level || recipeData.level,
        ready_time: readyTime || recipeData.ready_time,
        description: description || recipeData.description,
        ingredients: inputIngredientStr,
        directions: inputStepStr,
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
          // alert("The recipe is updated");
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
      setProgress(false);
      setError("input-box--edit-recipe-error");
      setInputError("edit-recipe__input-error");
    }
  };

  //USE EFFECT TO GET THE DATA OF A SINGLE RECIPE
  useEffect(() => {
    if (loginState) {
      handleGetSingleRecipe();
    }
    // eslint-disable-next-line
  }, [loginState]);

  //USE EFFECT TO SET TO SET STATES FOR INGREDIENT BOXES AND INGREDIENTS, FOR STEP BOXES AND STEPS
  useEffect(() => {
    if (loginState && recipeData) {
      setStepArr(recipeData.directions.split(";"));
      setIngreArr(recipeData.ingredients.split(";"));
      setStepStateArr(recipeData.directions.split(";"));
      setIngredientStateArr(recipeData.ingredients.split(";"));
    }
  }, [loginState, recipeData]);

  //USE EFFECT TO GET POSTER NAME
  useEffect(() => {
    if (recipeData) {
      axios
        .get(`${API_URL}/user-profile/${recipeData.poster_id}`)
        .then((response) => {
          setPosterName(response.data.username);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [recipeData]);

  //USEEFFECT TO SET THE DISPLAYNONE STATE OF THE LOADING PAGE
  useEffect(() => {
    if (
      loginState &&
      userProfile &&
      recipeData &&
      userProfile.id === recipeData.poster_id
    ) {
      setTimeout(() => {
        setDisplayNoneClass("loading-component__display-none");
      }, 1200);
    }
  }, [loginState, userProfile, recipeData]);

  if (loginState) {
    return (
      <div>
        <LoadingComponent displayNoneClass={displayNoneClass} />
        {userProfile &&
          recipeData &&
          userProfile.id === recipeData.poster_id && (
            <form
              onMouseEnter={closeMenu}
              onSubmit={handleOnSubmitUpdateRecipe}
              className="edit-recipe"
            >
              <div className="edit-recipe__container">
                <div className="edit-recipe__back-icon-wrapper">
                  <BackIconComponent
                    onClickHandler={() => {
                      navigate(`/recipe-library/${recipeId}`);
                    }}
                    backClassName="back-icon"
                  />
                  <h1>Edit Recipe</h1>
                </div>
                <h3 className="edit-recipe__sub-heading">
                  Author: {posterName}
                </h3>
                <div className="edit-recipe__big-container">
                  {/* RECIPE IMAGE */}
                  <div className="edit-recipe__wrapper">
                    <label
                      className="edit-recipe__label"
                      htmlFor="uploaded-image"
                    >
                      Edit recipe image
                    </label>

                    <img
                      className="edit-recipe__previewed-image"
                      src={previewFile || recipeData.image}
                      alt="uploaded-pic"
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
                      <label
                        className="edit-recipe__label"
                        htmlFor="descrittion"
                      >
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
                          onChange={handleIngredientStateArr}
                          key={ingre}
                          placeholder={
                            ingreArr[index] || `Ingredient ${index + 1}`
                          }
                          id={index}
                        ></textarea>
                      ))}
                    <div className="edit-recipe__btn-wrapper">
                      <ButtonComponent
                        btnClassName="btn btn--edit-recipe-submit btn--tablet"
                        btnContent="Post to the recipe library"
                        btnType="submit"
                      />

                      {progress && (
                        <div className="edit-recipe__progress edit-recipe__progress--tablet">
                          <CircularProgress />
                        </div>
                      )}
                    </div>
                  </div>

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
                            onChange={handleStepStateArr}
                            key={step}
                            placeholder={stepArr[index] || `Step ${index + 1}`}
                            id={index}
                          ></textarea>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="edit-recipe__btn-wrapper">
                  <ButtonComponent
                    btnClassName="btn btn--edit-recipe-submit btn--mobile"
                    btnContent="Post to the recipe library"
                    btnType="submit"
                  />

                  {progress && (
                    <div className="edit-recipe__progress edit-recipe__progress--mobile">
                      <CircularProgress />
                    </div>
                  )}
                </div>
              </div>
            </form>
          )}
      </div>
    );
  }
}
