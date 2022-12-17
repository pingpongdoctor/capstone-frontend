import "./ProfilePage.scss";
import Avatar from "../../components/Avatar/Avatar";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useState, useEffect } from "react";
import axios from "axios";
import closePic from "../../assets/icons/close.png";
const URL = process.env.REACT_APP_API_URL || "";

export default function ProfilePage({ loginState, userProfile, loadProfile }) {
  //GET JWT TOKEN FROM LOCAL STORAGE
  const jwtToken = localStorage.getItem("jwt_token");
  //STATES FOR INPUT BOXES
  const [newUserName, setNewUserName] = useState("");
  const [newHeight, setNewHeight] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newAge, setNewAge] = useState("");
  const [profileInputError, setProfileInputError] = useState("");
  //STATE FOR THE UPDATED FIELD
  // const [updateField, setUpdateField] = useState("");
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

    if (newUserName || newWeight || newWeight || newAge) {
      axios
        .put(`${URL}/user-profile`, body, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((response) => {
          alert(`Your ${inputType} has been updated`);
          setModalBoxAppear(false);
          setInputType("");
          //GET A NEW JWT TOKEN AND LOAD A NEW USER PROFILE
          localStorage.setItem("jwt_token", response.data);
          loadProfile(response.data);
          setProfileInputError("");
        })
        .catch((error) => {
          setModalBoxAppear(false);
          setInputType("");
        });
    } else {
      setProfileInputError("profile-page__input--error");
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
  };
  //USE EFFECT TO CLEAR THE ERROR STATE
  useEffect(() => {
    if (newUserName || newWeight || newWeight || newAge) {
      setProfileInputError("");
    }
  }, [newUserName, newAge, newHeight, newWeight]);

  useEffect(() => {
    setProfileInputError("");
  }, [modalBoxAppear]);

  if (loginState) {
    return (
      <div className="profile-page">
        <div className="profile-page__container">
          <div className="profile-page__wrapper">
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
              <p className="profile-page__field">Your Photo</p>
              <div className="profile-page__small-wrapper">
                <Avatar avatarClassName="avatar avatar--profile-value" />
                <ButtonComponent
                  btnClassName="btn btn--profile"
                  btnContent="Update"
                  btnName="photo"
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
                <input
                  value={newUserName}
                  onChange={handleNewUserName}
                  className={`profile-page__input ${profileInputError}`}
                  type="text"
                  name="username"
                  placeholder="New username"
                />
              )}
              {inputType === "height" && (
                <input
                  value={newHeight}
                  onChange={handleNewHeight}
                  className={`profile-page__input ${profileInputError}`}
                  type="number"
                  name="height"
                  placeholder="Type new height in cm"
                />
              )}
              {inputType === "weight" && (
                <input
                  value={newWeight}
                  onChange={handleNewWeight}
                  className={`profile-page__input ${profileInputError}`}
                  type="number"
                  name="weight"
                  placeholder="Type new weight in kg"
                />
              )}
              {inputType === "age" && (
                <input
                  value={newAge}
                  onChange={handleNewAge}
                  className={`profile-page__input ${profileInputError}`}
                  type="number"
                  name="age"
                  placeholder="New age"
                />
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
  }
}
