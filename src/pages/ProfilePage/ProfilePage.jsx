import "./ProfilePage.scss";
import Avatar from "../../components/Avatar/Avatar";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import closePic from "../../assets/icons/close.png";
import { handleCapitalize } from "../../Utils/utils";
import InputBox from "../../components/InputBox/InputBox";
import BackIconComponent from "../../components/BackIconComponent/BackIconComponent";
import NotificationComponent from "../../components/NotificationComponent/NotificationComponent";
const API_URL = process.env.REACT_APP_API_URL || "";

export default function ProfilePage({
  loginState,
  userProfile,
  loadProfile,
  closeMenu,
}) {
  console.log(userProfile);
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
  //STATES FOR INPUT BOXES
  const [newUserName, setNewUserName] = useState("");
  const [newHeight, setNewHeight] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newGender, setNewGender] = useState("");
  const [profileInputError, setProfileInputError] = useState("");
  const [profileTextareaError, setProfileTextareaError] = useState("");
  //STATE FOR MODAL BOX APPEARANCE
  const [modalBoxAppear, setModalBoxAppear] = useState(false);
  //STATE FOR THE INPUT BOX APPEARANCE (name, weight, height, age)
  const [inputType, setInputType] = useState("");
  //FUNCTIONS HANDLE STATES OF INPUT BOXES
  const handleNewUserName = function (event) {
    setNewUserName(event.target.value);
  };

  const handleNewHeight = function (event) {
    setNewHeight(event.target.value);
  };

  const handleNewWeight = function (event) {
    setNewWeight(event.target.value);
  };

  const handleNewAge = function (event) {
    setNewAge(event.target.value);
  };

  const handleNewGender = function (event) {
    setNewGender(event.target.value);
  };

  //FUNCTION TO POP OUT THE MODAL BOX
  const handleModalBoxAppear = function (event) {
    setModalBoxAppear(true);
    if (event.target.name === "username") {
      setInputType("username");
    }
    if (event.target.name === "weight") {
      setInputType("weight");
    }
    if (event.target.name === "height") {
      setInputType("height");
    }
    if (event.target.name === "age") {
      setInputType("age");
    }
    if (event.target.name === "gender") {
      setInputType("gender");
    }
  };

  //FUNCTION TO UPDATE USER PROFILE
  const handleUpdateProfile = function (event) {
    event.preventDefault();
    let body;
    if (inputType === "username") {
      body = { username: newUserName };
    }
    if (inputType === "weight") {
      body = { weight: newWeight };
    }
    if (inputType === "height") {
      body = { height: newHeight };
    }
    if (inputType === "age") {
      body = { age: newAge };
    }
    if (inputType === "gender") {
      body = { gender: newGender };
    }

    if (newUserName || newWeight || newHeight || newAge || newGender) {
      axios
        .put(`${API_URL}/user-profile`, body, headers)
        .then((response) => {
          alert(`Your ${inputType} has been updated`);
          setModalBoxAppear(false);
          setInputType("");
          //GET A NEW JWT TOKEN AND LOAD A NEW USER PROFILE
          localStorage.setItem("jwt_token", response.data);
          loadProfile(response.data);
          setProfileInputError("");
          setProfileTextareaError("");
          setNewUserName("");
          setNewHeight("");
          setNewWeight("");
          setNewAge("");
          setNewGender("");
        })
        .catch((error) => {
          setModalBoxAppear(false);
          setInputType("");
        });
    } else {
      setProfileInputError("input-box--profile-page-error");
      setProfileTextareaError("profile-page__textarea--error");
    }
  };
  //FUNCTION TO HANDLE THE CLOSE ICON
  const handleCloseIcon = function () {
    setModalBoxAppear(false);
    setInputType("");
    setNewUserName("");
    setNewHeight("");
    setNewWeight("");
    setNewAge("");
    setNewGender("");
  };
  //USE EFFECT TO CLEAR THE ERROR STATE
  useEffect(() => {
    if (newUserName || newWeight || newHeight || newAge || newGender) {
      setProfileInputError("");
      setProfileTextareaError("");
    }
  }, [newUserName, newAge, newHeight, newWeight, newGender]);

  useEffect(() => {
    setProfileInputError("");
    setProfileTextareaError("");
  }, [modalBoxAppear]);

  if (loginState) {
    return (
      <div onMouseEnter={closeMenu} className="profile-page">
        <div className="profile-page__container">
          <div className="profile-page__wrapper">
            <BackIconComponent
              onClickHandler={() => {
                navigate("/");
              }}
              backClassName="back-icon back-icon--profile-page"
            />
            <Avatar avatarClassName="avatar avatar--main" />
            <h3>Profile Details Of {userProfile.username}</h3>
          </div>
          <div className="profile-page__texts">
            <div className="profile-page__text">
              <p className="profile-page__field">User Name</p>
              <div className="profile-page__small-wrapper">
                <p className="profile-page__value"> {userProfile.username}</p>
                <ButtonComponent
                  onClickHandler={handleModalBoxAppear}
                  btnClassName="btn btn--profile"
                  btnContent="Update"
                  btnName="username"
                />
              </div>
            </div>
            <div className="profile-page__text">
              <p className="profile-page__field">Weight</p>
              <div className="profile-page__small-wrapper">
                <p className="profile-page__value">{userProfile.weight} kg</p>
                <ButtonComponent
                  onClickHandler={handleModalBoxAppear}
                  btnClassName="btn btn--profile"
                  btnContent="Update"
                  btnName="weight"
                />
              </div>
            </div>

            <div className="profile-page__text">
              <p className="profile-page__field">Height</p>
              <div className="profile-page__small-wrapper">
                <p className="profile-page__value">{userProfile.height} cm</p>
                <ButtonComponent
                  onClickHandler={handleModalBoxAppear}
                  btnClassName="btn btn--profile"
                  btnContent="Update"
                  btnName="height"
                />
              </div>
            </div>

            <div className="profile-page__text">
              <p className="profile-page__field">Age: </p>
              <div className="profile-page__small-wrapper">
                <p className="profile-page__value">{userProfile.age}</p>
                <ButtonComponent
                  onClickHandler={handleModalBoxAppear}
                  btnClassName="btn btn--profile"
                  btnContent="Update"
                  btnName="age"
                />
              </div>
            </div>

            <div className="profile-page__text">
              <p className="profile-page__field">Gender: </p>
              <div className="profile-page__small-wrapper">
                <p className="profile-page__value">
                  {/* {handleCapitalize(userProfile.gender)} */}
                  {userProfile.gender}
                </p>
                <ButtonComponent
                  onClickHandler={handleModalBoxAppear}
                  btnClassName="btn btn--profile"
                  btnContent="Update"
                  btnName="gender"
                />
              </div>
            </div>
          </div>
        </div>

        {/* MODAL BOX */}
        {modalBoxAppear && inputType && (
          <div className="profile-page__modal-box">
            <form
              onSubmit={handleUpdateProfile}
              className="profile-page__modal-box-form"
            >
              <img
                className="profile-page__close-pic"
                src={closePic}
                alt="close-icon"
                onClick={handleCloseIcon}
              />

              <h3>Update your {inputType} here</h3>

              {inputType === "username" && (
                <InputBox
                  inputValue={newUserName}
                  inputOnChange={handleNewUserName}
                  inputClassName={`input-box input-box--profile-page ${profileInputError}`}
                  inputType="text"
                  inputPlaceholder="New username"
                  inputName="usename"
                />
              )}
              {inputType === "height" && (
                <InputBox
                  inputValue={newHeight}
                  inputOnChange={handleNewHeight}
                  inputOnWheel={(e) => {
                    e.target.blur();
                  }}
                  inputClassName={`input-box input-box--profile-page ${profileInputError}`}
                  inputType="number"
                  inputPlaceholder="Type new height in cm"
                  inputName="height"
                />
              )}
              {inputType === "weight" && (
                <InputBox
                  inputValue={newWeight}
                  inputOnChange={handleNewWeight}
                  inputOnWheel={(e) => {
                    e.target.blur();
                  }}
                  inputClassName={`input-box input-box--profile-page ${profileInputError}`}
                  inputType="number"
                  inputPlaceholder="Type new weight in kg"
                  inputName="weight"
                />
              )}
              {inputType === "age" && (
                <InputBox
                  inputValue={newAge}
                  inputOnChange={handleNewAge}
                  inputOnWheel={(e) => {
                    e.target.blur();
                  }}
                  inputClassName={`input-box input-box--profile-page ${profileInputError}`}
                  inputType="number"
                  inputPlaceholder="New age"
                  inputName="age"
                />
              )}
              {inputType === "gender" && (
                <select
                  value={newGender}
                  onChange={handleNewGender}
                  name="gender"
                  className={`profile-page__textarea ${profileTextareaError}`}
                >
                  <option value="">Choose here</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              )}
              <ButtonComponent
                btnType="submit"
                btnContent="Save"
                btnClassName="btn btn--profile btn--profile-modal-box"
              />
            </form>
          </div>
        )}
      </div>
    );
  } else {
    return <NotificationComponent />;
  }
}
