import "./DetailedRecipePage.scss";
import Avatar from "../../components/Avatar/Avatar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import likeIcon from "../../assets/icons/like.png";
import ingredientPic from "../../assets/images/ingredients.png";
import stepPic from "../../assets/images/steps.png";
import RecipeCommentItem from "../../components/RecipeCommentItem/RecipeCommentItem";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { handleCapitalize } from "../../Utils/utils";
import BackIconComponent from "../../components/BackIconComponent/BackIconComponent";
import EditIconComponent from "../../components/EditIconComponent/EditIconComponent";
import DeleteIconComponent from "../../components/DeleteIconComponent/DeleteIconComponent";
import ModalBox from "../../components/ModalBox/ModalBox";
import savedIcon from "../../assets/icons/save.png";
import unSavedIcon from "../../assets/icons/unsave.png";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
const API_URL = process.env.REACT_APP_API_URL || "";

export default function DetailedRecipePage({
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
  //USE NAVIGATE
  const navigate = useNavigate();
  //STATE TO CONTROL THE LOADING PAGE
  const [displayNoneClass, setDisplayNoneClass] = useState("");
  //STATE TO STORE THE SINGLE RECIPE DATA
  const [recipeData, setRecipeData] = useState(null);
  //STATE TO STORE RECIPE-USER DATA
  const [recipeUserData, setRecipeUserData] = useState([]);
  //STATE TO STORE THE NAME OF THE POSTER
  const [recipePosterName, setRecipePosterName] = useState("");
  //STATE TO STORE NEW CUSTOMIZED INGREDIENTS ARRAY
  const [ingredientArr, setIngredientArr] = useState([]);
  //STATE TO STORE NEW CUSTOMIZED STEP ARRAY
  const [directionsArr, setDirectionsArr] = useState([]);
  //STATE TO STORE THE COMMENTS DATA
  const [commentData, setCommentData] = useState([]);
  //STATES TO STORE THE COMMENT INPUT
  const [commentInput, setCommentInput] = useState("");
  //STATE TO STORE THE BOX APPEARANCE STATE
  const [boxAppear, setBoxAppear] = useState(false);
  //STATE FOR THE SAVED RECIPE
  const [savedRecipe, setSavedRecipe] = useState(null);
  //USE USEPARAMS TO GET THE RECIPE ID
  const { detailRecipeId } = useParams();
  //USE EFFECT TO CUSTOMIZE THE INGREDIENTS ARRAY
  useEffect(() => {
    if (recipeData) {
      setIngredientArr(recipeData.ingredients.split(";"));
    }
  }, [recipeData]);

  //USE EFFECT TO CUSTOMIZE THE DIRECTIONS ARRAY
  useEffect(() => {
    if (recipeData && recipeData.directions) {
      const arr = recipeData.directions.split(";");
      let newArr = [];
      for (let i = 1; i <= arr.length; i++) {
        newArr.push(`Step ${i}: ${arr[i - 1]}`);
      }
      setDirectionsArr(newArr);
    }
  }, [recipeData]);

  //FUNCTION TO GET A SINGLE RECIPE DATA
  const handleGetSingleRecipe = function () {
    axios
      .get(`${API_URL}/recipe-library/${detailRecipeId}`)
      .then((response) => {
        setRecipeData(response.data);
      })
      .catch((error) => console.log(error));
  };

  //USE EFFECT TO GET A SINGLE RECIPE DATA
  useEffect(() => {
    handleGetSingleRecipe();
    // eslint-disable-next-line
  }, [detailRecipeId]);

  //USE EFFECT TO GET THE RECIPE-USER DATA
  useEffect(() => {
    axios.get(`${API_URL}/recipe-library/recipes-users`).then((response) => {
      console.log(response.data);
      setRecipeUserData(response.data);
    });
  }, []);

  //USE EFFECT TO SET THE SAVED RECIPE STATE
  useEffect(() => {
    if (recipeData && userProfile && recipeUserData) {
      const foundObj = recipeUserData.find(
        (obj) =>
          obj.user_id === userProfile.id && obj.recipe_id === recipeData.id
      );
      if (foundObj) {
        setSavedRecipe(true);
      } else {
        setSavedRecipe(false);
      }
    }
    // eslint-disable-next-line
  }, [recipeUserData]);

  //USE EFFECT TO GET THE NAME OF THE RECIPE POSTER
  useEffect(() => {
    if (recipeData && recipeData.poster_id) {
      axios
        .get(`${API_URL}/user-profile/${recipeData.poster_id}`)
        .then((response) => {
          setRecipePosterName(response.data.username);
        });
    }
  }, [recipeData]);

  //FUNCTION TO GET THE COMMENTS DATA
  const getCommentData = function () {
    axios
      .get(`${API_URL}/recipe-library/${detailRecipeId}/comments`)
      .then((response) => {
        setCommentData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //USE EFFECT TO GET THE COMMENTS DATA
  useEffect(() => {
    getCommentData();
    // eslint-disable-next-line
  }, []);

  //FUNCTION TO SET THE COMMENT INPUT
  const handleCommentInput = function (event) {
    setCommentInput(event.target.value);
  };

  //FUNCTION TO LIKE A REIPE
  const handleOnclickLikeRecipe = function () {
    axios
      .put(`${API_URL}/recipe-library/${recipeData.id}`)
      .then((response) => {
        handleGetSingleRecipe();
      })
      .catch((error) => console.log(error));
  };

  //FUNCTION TO POST A RECIPE COMMENT
  const handleOnSubmitComment = function (event) {
    event.preventDefault();
    if (loginState && userProfile && recipeData && commentInput) {
      const newComment = {
        comment: commentInput,
        user_id: userProfile.id,
        recipe_id: recipeData.id,
      };
      axios
        .post(
          `${API_URL}/recipe-library/${recipeData.id}/comments`,
          newComment,
          headers
        )
        .then((response) => {
          getCommentData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //FUNCTION TO DELETE A RECIPE
  const handleDeleteRecipe = function () {
    if (
      loginState &&
      userProfile &&
      recipeData &&
      userProfile.id === recipeData.poster_id
    ) {
      axios
        .delete(`${API_URL}/recipe-library/${recipeData.id}`, headers)
        .then((response) => {
          console.log(response.data);
          navigate("/recipe-library");
          setBoxAppear(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //FUNCTION TO MAKE THE BOX APPEAR
  const handleAppearBox = function () {
    setBoxAppear(true);
  };

  //FUNCTION TO CLOSE THE BOX
  const handleCloseBox = function () {
    setBoxAppear(false);
  };

  //FUNCTION TO SAVE THE RECIPE TO THE RECIPE LIST
  const handleOnClickSaveRecipe = function () {
    if (loginState && recipeData && savedRecipe === false) {
      const postedObj = {
        recipe_id: recipeData.id,
      };
      axios
        .post(`${API_URL}/recipe-library/saved-recipes`, postedObj, headers)
        .then((response) => {
          console.log(response.data);
          setSavedRecipe(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //FUNCTION TO SAVE THE RECIPE TO THE RECIPE LIST
  const handleOnClickUnSaveRecipe = function () {
    if (loginState && recipeData && savedRecipe === true) {
      axios
        .delete(
          `${API_URL}/recipe-library/saved-recipes/${recipeData.id}`,
          headers
        )
        .then((response) => {
          console.log(response.data);
          setSavedRecipe(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //USEEFFECT TO SET THE LOADING PAGE
  useEffect(() => {
    if (recipeData) {
      setTimeout(() => {
        setDisplayNoneClass("loading-component__display-none");
      }, 1200);
    }
  }, [recipeData]);

  return (
    <div>
      <LoadingComponent displayNoneClass={displayNoneClass} />
      {recipeData && (
        <div onMouseEnter={closeMenu} className="detail-recipe">
          {/* FIRST BIG WRAP */}
          <div className="detail-recipe__first-wrapper">
            <img
              className="detail-recipe__img"
              src={recipeData.image}
              alt="recipe-img"
            />
            {recipePosterName && (
              <div className="detail-recipe__avatar-wrapper">
                <Avatar avatarClassName="avatar" />
                <p>Recipe by {handleCapitalize(recipePosterName)}</p>
              </div>
            )}
          </div>

          {/* SECOND BIG WRAP */}
          <div className="detail-recipe__second-wrapper">
            <div className="detail-recipe__second-wrapper-container">
              {/* RECIPE NAME */}
              <div className="detail-recipe__heading-wrapper">
                <div className="detail-recipe__back-icon-wrapper">
                  <BackIconComponent
                    onClickHandler={() => {
                      navigate("/recipe-library");
                    }}
                    backClassName="back-icon back-icon--detail-recipe"
                  />
                  <h2 className="detail-recipe__heading">
                    {handleCapitalize(recipeData.recipe_name)}
                  </h2>
                </div>
                <div className="detail-recipe__edit-icon-wrapper">
                  {loginState && !savedRecipe && (
                    <img
                      onClick={handleOnClickSaveRecipe}
                      className="detail-recipe__save"
                      src={unSavedIcon}
                      alt="unsave-icon"
                    />
                  )}
                  {loginState && savedRecipe && (
                    <img
                      onClick={handleOnClickUnSaveRecipe}
                      className="detail-recipe__save"
                      src={savedIcon}
                      alt="save-icon"
                    />
                  )}
                  {loginState &&
                    userProfile &&
                    recipeData &&
                    userProfile.id === recipeData.poster_id && (
                      <EditIconComponent
                        onClickHandler={() => {
                          navigate(`/edit-recipe/${recipeData.id}`);
                        }}
                        editClassName="edit-icon"
                      />
                    )}
                  {loginState &&
                    userProfile &&
                    recipeData &&
                    userProfile.id === recipeData.poster_id && (
                      <DeleteIconComponent
                        onClickHandler={handleAppearBox}
                        delClassName="del-icon"
                      />
                    )}
                </div>
              </div>
              {/* DESCRIPTION */}
              <p className="detail-recipe__text">
                <span className="detail-recipe__small-text">
                  Recipe Description:
                </span>{" "}
                {recipeData.description}
              </p>

              <div className="detail-recipe__recipe-infor">
                {/* READY TIME INFOR */}
                <p className="detail-recipe__ready-time">
                  <span className="detail-recipe__small-text">Ready time:</span>{" "}
                  {recipeData.ready_time} minutes
                </p>
                {/* LIKES INFOR */}
                <div className="detail-recipe__like-infor">
                  <p>
                    <span className="detail-recipe__small-text">Likes:</span>{" "}
                    {recipeData.likes}
                  </p>
                  <img
                    onClick={handleOnclickLikeRecipe}
                    className="detail-recipe__like-icon"
                    src={likeIcon}
                    alt="like-icon"
                  />
                </div>
              </div>

              <div className="detail-recipe__ingre-step-boxes">
                <div className="detail-recipe__ingre-step-box">
                  <img
                    className="detail-recipe__ingredient-pic"
                    src={ingredientPic}
                    alt="ingredient-pic"
                  />
                  {/* INGREDIENT NUMBER */}
                  <div className="detail-recipe__ingredients-infor-wrapper">
                    <h3>Ingredients:</h3>
                    {ingredientArr.length > 0 && (
                      <p className="detail-recipe__num">
                        {ingredientArr.length} ingredients
                      </p>
                    )}
                  </div>
                  {/* INGREDIENTS */}
                  <ul className="detail-recipe__ingredients">
                    {ingredientArr.length > 0 &&
                      ingredientArr.map((ingredient) => (
                        <li
                          key={ingredient}
                          className="detail-recipe__ingredient"
                        >
                          {ingredient}
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="detail-recipe__ingre-step-box">
                  <img
                    className="detail-recipe__step-pic"
                    src={stepPic}
                    alt="steps-pic"
                  />
                  {/* DIRECTION NUMBER */}
                  <div className="detail-recipe__directions-infor-wrapper">
                    <h3>Steps to do:</h3>
                    {directionsArr.length > 0 && (
                      <p className="detail-recipe__num">
                        {directionsArr.length} steps
                      </p>
                    )}
                  </div>
                  {/* DIRECTIONS */}
                  <ul className="detail-recipe__steps">
                    {directionsArr.length > 0 &&
                      directionsArr.map((step) => (
                        <li key={step} className="detail-recipe__step">
                          {step}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* COMMENT SECTION */}
          <form
            onSubmit={handleOnSubmitComment}
            className="detail-recipe__comment-form"
          >
            <div className="detail-recipe__comment-form-container">
              <h3>Comments</h3>
              <div className="detail-recipe__comment-flex-container">
                {loginState && userProfile && (
                  <div className="detail-recipe__comment-wrapper">
                    <Avatar avatarClassName="avatar" />

                    <p className="detail-recipe__comment-poster">
                      {handleCapitalize(userProfile.username)}
                    </p>
                  </div>
                )}
                <div className="detail-recipe__comment-flex-item">
                  {loginState && (
                    <textarea
                      name="comment-box"
                      className="detail-recipe__comment-textarea"
                      wrap="hard"
                      onChange={handleCommentInput}
                      value={commentInput}
                      placeholder="Comment here..."
                    ></textarea>
                  )}
                  {loginState && (
                    <ButtonComponent
                      btnClassName="btn btn--recipe-comment"
                      btnContent="Comment"
                      btnType="submit"
                    />
                  )}
                </div>
              </div>

              <ul className="detail-recipe__comment-list">
                {commentData.length > 0 &&
                  commentData
                    .sort(
                      (a, b) =>
                        new Date(b.updated_at).getTime() -
                        new Date(a.updated_at).getTime()
                    )
                    .map((comment) => (
                      <RecipeCommentItem
                        key={comment.id}
                        commentId={comment.id}
                        commentText={comment.comment}
                        commentLike={comment.likes}
                        userId={comment.user_id}
                        headers={headers}
                        recipeId={recipeData.id}
                        getCommentData={getCommentData}
                        userProfile={userProfile}
                        loginState={loginState}
                      />
                    ))}
              </ul>
            </div>
          </form>

          {boxAppear && (
            <ModalBox
              modalBoxContent="Delete this recipe?"
              modalBtnContent="Delete"
              modalOnClickHandler={handleDeleteRecipe}
              modalCloseOnClickHandler={handleCloseBox}
            />
          )}
        </div>
      )}
    </div>
  );
}
