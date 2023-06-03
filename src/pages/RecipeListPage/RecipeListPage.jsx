import { useState, useEffect } from "react";
import "./RecipeListPage.scss";
import InputBox from "../../components/InputBox/InputBox";
import ModalBox from "../../components/ModalBox/ModalBox";
import axios from "axios";
import { API_URL } from "../../Utils/utils";
import RecipeSavedItem from "../../components/RecipeSavedItem/RecipeSavedItem";
import NotificationComponent from "../../components/NotificationComponent/NotificationComponent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
export default function RecipeListPage({ loginState, userProfile, closeMenu }) {
  //GET JWT TOKEN FROM LOCAL STORAGE
  const jwtToken = localStorage.getItem("jwt_token");
  //DEFINE HEADERS
  const headers = {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  //STATE FOR RECIPE ARRAY
  const [recipeArr, setRecipeArr] = useState([]);
  //STATE FOR SEARCH DATA
  const [searchData, setSearchData] = useState("");
  //STATE FOR BOX APPEAR
  const [boxAppear, setBoxAppear] = useState(false);
  //STATE TO STORE THE DELETED RECIPE ID
  const [deletedRecipeId, setDeletedRecipeId] = useState("");
  //STATE TO MANIPULATE THE LOADING PAGE
  const [displayNoneClass, setDisplayNoneClass] = useState("");
  //FUNCTION TO SET THE STATE OF SEARCH DATA
  const handleSearchData = function (event) {
    setSearchData(event.target.value);
  };

  //FUNCTION TO GET RECIPE ARRAY
  const handleGetRecipeArr = function () {
    if (loginState) {
      axios
        .get(`${API_URL}/recipe-library/saved-recipes`, headers)
        .then((response) => {
          setRecipeArr(response.data);
          console.log(response.data);
        });
    }
  };

  //USE EFFECT TO GET RECIPE ARRAY
  useEffect(() => {
    handleGetRecipeArr();
    // eslint-disable-next-line
  }, [loginState]);

  //FUNCTION TO DELETE A RECIPE FROM THE SAVED LIST
  const handleDeleteRecipe = function (recipeId) {
    if (loginState && deletedRecipeId) {
      axios
        .delete(
          `${API_URL}/recipe-library/saved-recipes/${deletedRecipeId}`,
          headers
        )
        .then((response) => {
          console.log(response.data);
          setDeletedRecipeId("");
          setBoxAppear(false);
          handleGetRecipeArr();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //FUNCTION TO MAKE THE BOX DISAPPEAR
  const handleCloseBox = function () {
    setBoxAppear(false);
    setDeletedRecipeId("");
  };

  //FUNCTION TO MAKE THE BOX APPEAR
  const handleOpenBox = function (recipeId) {
    setBoxAppear(true);
    setDeletedRecipeId(recipeId);
  };

  //FUNCTION TO SHORT RECIPES
  const handleShortRecipeName = function () {
    const newArr = [...recipeArr].sort((a, b) =>
      a.recipe_name.toLowerCase().localeCompare(b.recipe_name.toLowerCase())
    );
    setRecipeArr(newArr);
  };

  const handleShortRecipeTime = function () {
    const newArr = [...recipeArr].sort((a, b) => a.ready_time - b.ready_time);
    setRecipeArr(newArr);
  };

  const handleShortRecipeLevel = function () {
    const newArr = [...recipeArr].sort((a, b) =>
      a.level.toLowerCase().localeCompare(b.level.toLowerCase())
    );
    setRecipeArr(newArr);
  };

  const handleShortRecipeCreate = function () {
    const newArr = [...recipeArr].sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
    setRecipeArr(newArr);
  };

  //USEEFFECT TO SET DISPLAYNONECLASS FOR THE LOADING PAGE
  useEffect(() => {
    if (loginState && recipeArr.length > 0) {
      setTimeout(() => {
        setDisplayNoneClass("loading-component__display-none");
      }, 1200);
    }
  }, [loginState, recipeArr.length]);

  if (loginState) {
    return (
      <div onMouseEnter={closeMenu} className="recipe-list">
        <LoadingComponent displayNoneClass={displayNoneClass} />
        <div className="recipe-list__container">
          <h1 className="recipe-list__heading">Recipe List</h1>
          {recipeArr.length > 0 && (
            <p className="recipe-list__main-text">{recipeArr.length} Recipes</p>
          )}
          <InputBox
            inputOnChange={handleSearchData}
            inputValue={searchData}
            inputType="text"
            inputPlaceholder="Search for recippe name, level and ready_time"
            inputClassName="input-box input-box--edit-list-search"
          />
          <div className="recipe-list__texts">
            <div className="recipe-list__text-wrapper">
              <p onClick={handleShortRecipeName} className="recipe-list__text">
                Recipe Name
              </p>
              <p
                onClick={handleShortRecipeTime}
                className="recipe-list__text  recipe-list__text--ready-time-hidden"
              >
                Ready Time
              </p>

              <p
                onClick={handleShortRecipeLevel}
                className="recipe-list__text recipe-list__text--hidden"
              >
                Level
              </p>

              <p
                onClick={handleShortRecipeCreate}
                className="recipe-list__text recipe-list__text--hidden"
              >
                Created Time
              </p>
            </div>
            <p className="recipe-list__text-action">Actions</p>
          </div>
          {recipeArr.length > 0 && userProfile && (
            <ul className="recipe-list__list">
              {recipeArr
                .filter((recipeItem) => {
                  return (
                    recipeItem.recipe_name
                      .toLowerCase()
                      .includes(searchData.toLowerCase()) ||
                    recipeItem.ready_time
                      .toString()
                      .includes(searchData.toLowerCase()) ||
                    recipeItem.level
                      .toLowerCase()
                      .includes(searchData.toLowerCase())
                  );
                })
                .map((recipeItem) => (
                  <RecipeSavedItem
                    key={recipeItem.id}
                    recipeId={recipeItem.id}
                    recipePosterId={recipeItem.poster_id}
                    readyTime={recipeItem.ready_time}
                    recipeName={recipeItem.recipe_name}
                    recipeLevel={recipeItem.level}
                    timeCreate={recipeItem.updated_at}
                    userProfile={userProfile}
                    handleOpenBox={handleOpenBox}
                  />
                ))}
            </ul>
          )}
        </div>
        {boxAppear && (
          <ModalBox
            modalOnClickHandler={handleDeleteRecipe}
            modalCloseOnClickHandler={handleCloseBox}
            modalBtnContent="Delete now"
            modalBoxContent="Do you want to delete this macro?"
          />
        )}
      </div>
    );
  } else {
    return <NotificationComponent />;
  }
}
