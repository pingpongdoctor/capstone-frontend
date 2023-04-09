import "./SignUpPage.scss";
import InputBox from "../../components/InputBox/InputBox";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import questionIcon from "../../assets/icons/question.png";
import axios from "axios";
import { useEffect, useState } from "react";
import { sha256 } from "js-sha256";
import { API_URL } from "../../Utils/utils";
import { handleFilterMinusOperator } from "../../Utils/utils";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

export default function SignUpPage({
  loginState,
  handleLoginExperienceAccount,
}) {
  //USE USENAVIGATE
  const navigate = useNavigate();
  //STATE TO CONTROL THE LOADING PAGE
  const [displayNoneClass, setDisplayNoneClass] = useState("");
  //STATES FOR ALL INPUT BOXES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  //STATES FOR THE ERROR STATES
  const [emailEr, setEmailEr] = useState("");
  const [passwordEr, setPasswordEr] = useState("");
  const [passwordConfirmEr, setPasswordConfirmEr] = useState("");
  const [usernameEr, setUsernameEr] = useState("");
  const [genderEr, setGenderEr] = useState("");
  const [ageEr, setAgeEr] = useState("");
  const [weightEr, setWeightEr] = useState("");
  const [heightEr, setHeightEr] = useState("");
  //STATES FOR THE APPEARANCE OF THE EXPLAINATION TEXTS
  const [passwordTextAppear, setPasswordTexAppear] = useState(false);
  const [usernameTextAppear, setUsernameTexAppear] = useState(false);
  //FUNCTION TO HANDLE THE EXPLAINATION TEXTS
  const handleMouseEnterPasswordText = function () {
    setPasswordTexAppear(true);
  };
  const handleMouseLeavePasswordText = function () {
    setPasswordTexAppear(false);
  };
  const handleMouseEnterUsernameText = function () {
    setUsernameTexAppear(true);
  };
  const handleMouseLeaveUsernameText = function () {
    setUsernameTexAppear(false);
  };

  //FUNCTIONS TO HANDLE ALL INPUT STATES
  const handleEmail = function (event) {
    setEmail(event.target.value);
  };
  const handlePassword = function (event) {
    setPassword(event.target.value);
  };
  const handlePasswordConfirm = function (event) {
    setPasswordConfirm(event.target.value);
  };
  const handleUsername = function (event) {
    setUsername(event.target.value);
  };
  const handleGender = function (event) {
    setGender(event.target.value);
  };
  const handleAge = function (event) {
    setAge(Number(handleFilterMinusOperator(event.target.value)));
  };
  const handleWeight = function (event) {
    setWeight(Number(handleFilterMinusOperator(event.target.value)));
  };
  const handleHeight = function (event) {
    setHeight(Number(handleFilterMinusOperator(event.target.value)));
  };
  //FUNCTION TO VALIDATE THE STATES
  const isEmailValid = function () {
    if (email && /\S+@\S+\.\S+/.test(email)) {
      return true;
    }
    return false;
  };

  const isPasswordValid = function () {
    const regularExpression =
      /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,50})/;
    if (
      password &&
      password.split("").length <= 15 &&
      regularExpression.test(password)
    ) {
      return true;
    }
    return false;
  };

  const isPasswordConfirmValid = function () {
    if (isPasswordValid() && password === passwordConfirm) {
      return true;
    }
    return false;
  };

  const isUsernameValid = function () {
    if (username && username.length >= 6) {
      return true;
    }
    return false;
  };

  const isGenderValid = function () {
    if (gender) {
      return true;
    }
    return false;
  };

  const isAgeValid = function () {
    if (age) {
      return true;
    }
    return false;
  };

  const isWeightValid = function () {
    if (weight) {
      return true;
    }
    return false;
  };

  const isHeightValid = function () {
    if (height) {
      return true;
    }
    return false;
  };

  const isFormValid = function () {
    if (
      isEmailValid() &&
      isPasswordValid() &&
      isPasswordConfirmValid() &&
      isUsernameValid() &&
      isGenderValid() &&
      isAgeValid() &&
      isWeightValid() &&
      isHeightValid()
    ) {
      return true;
    }
    return false;
  };
  //FUNCTION TO SUBMIT
  const handleSubmit = function (event) {
    event.preventDefault();
    if (isFormValid()) {
      const postedObj = {
        username,
        email: sha256(email),
        password: sha256(password),
        gender,
        age,
        weight,
        height,
      };
      axios
        .post(`${API_URL}/signup`, postedObj)
        .then((response) => {
          console.log(response.data);
          alert("Your account has been created. Let's log in and enjoy");
          navigate("/login");
        })
        .catch((error) => {
          if (error.response.data === "This email already exists") {
            alert("This email already exists");
            console.log(error);
          }
        });
    } else {
      if (!isEmailValid()) {
        setEmailEr("signup-page__error");
      }
      if (!isPasswordValid()) {
        setPasswordEr("signup-page__error");
      }
      if (!isPasswordConfirmValid()) {
        setPasswordConfirmEr("signup-page__error");
      }
      if (!isUsernameValid()) {
        setUsernameEr("signup-page__error");
      }
      if (!isGenderValid()) {
        setGenderEr("signup-page__error");
      }
      if (!isAgeValid()) {
        setAgeEr("signup-page__error");
      }
      if (!isWeightValid()) {
        setWeightEr("signup-page__error");
      }
      if (!isHeightValid()) {
        setHeightEr("signup-page__error");
      }
    }
  };
  //USE EFFECT TO ERADICATE THE ERROR STATES
  useEffect(() => {
    if (isEmailValid()) {
      setEmailEr("");
    }
    if (isPasswordValid()) {
      setPasswordEr("");
    }
    if (isPasswordConfirmValid()) {
      setPasswordConfirmEr("");
    }
    if (isUsernameValid()) {
      setUsernameEr("");
    }
    if (isGenderValid()) {
      setGenderEr("");
    }
    if (isAgeValid()) {
      setAgeEr("");
    }
    if (isWeightValid()) {
      setWeightEr("");
    }
    if (isHeightValid()) {
      setHeightEr("");
    }
    // eslint-disable-next-line
  }, [email, password, passwordConfirm, username, gender, age, weight, height]);

  //CHECK IF THE BACKGROUND IMAGE IS LOADED
  const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(false);
  useEffect(() => {
    if (!loginState) {
      const getPage = document.querySelector(".signup-page");
      if (getPage) {
        setBackgroundImageLoaded(true);
      }
    }
  }, [loginState]);

  //USEEFFECT TO SET THE DISPLAYNONECLASS STATE FOR THE LOADING PAGE
  useEffect(() => {
    if (!loginState && backgroundImageLoaded) {
      setTimeout(() => {
        setDisplayNoneClass("loading-component__display-none");
      }, 1200);
    }
  }, [loginState, backgroundImageLoaded]);

  if (!loginState) {
    return (
      <div>
        <LoadingComponent displayNoneClass={displayNoneClass} />
        <div className="signup-page">
          <div className="signup-page__container">
            <div className="signup-page__links">
              <p
                onClick={handleLoginExperienceAccount}
                className="signup-page__demo-text"
              >
                Demo Account
              </p>
              <p
                onClick={() => {
                  navigate("/login");
                }}
                className="signup-page__link"
              >
                Login
              </p>
              <p
                onClick={() => {
                  navigate("/");
                }}
                className="signup-page__link"
              >
                Homepage
              </p>
            </div>
            <h1 className="signup-page__heading signup-page__heading--tablet">
              Sign Up
            </h1>
            <form onSubmit={handleSubmit} className="signup-page__form">
              <div className="signup-page__flex-container">
                <h1 className="signup-page__heading signup-page__heading--mobile">
                  Sign Up
                </h1>
                {/* EMAIL */}
                <InputBox
                  inputName="email"
                  inputType="text"
                  inputClassName={`input-box input-box--signup input-box--signup-email ${emailEr}`}
                  inputPlaceholder="Email"
                  inputValue={email}
                  inputOnChange={handleEmail}
                />
                <div className="signup-page__wrapper">
                  <div className="signup-page__small-wrapper">
                    {/* PASSWORD */}
                    <InputBox
                      inputPlaceholder="Password"
                      inputName="password"
                      inputType="password"
                      inputClassName={`input-box input-box--signup input-box--signup-password ${passwordEr}`}
                      inputValue={password}
                      inputOnChange={handlePassword}
                    />
                    <img
                      onMouseEnter={handleMouseEnterPasswordText}
                      className="signup-page__ques-img"
                      src={questionIcon}
                      alt="question-icon"
                    />
                  </div>
                  {passwordTextAppear && (
                    <p
                      onMouseLeave={handleMouseLeavePasswordText}
                      className="signup-page__text"
                    >
                      At least 1 lower-case letter, 1 upper-case letter, 1
                      number, 1 special syntax. 6 to 15 letters.
                    </p>
                  )}
                </div>
                {/* CONFIRM PASSWORD */}
                <InputBox
                  inputPlaceholder="Confirm Password"
                  inputName="confirm-password"
                  inputType="password"
                  inputClassName={`input-box input-box--signup input-box--signup-password-confirm ${passwordConfirmEr}`}
                  inputValue={passwordConfirm}
                  inputOnChange={handlePasswordConfirm}
                />
                <div className="signup-page__wrapper">
                  <div className="signup-page__small-wrapper">
                    {/* USER NAME */}
                    <InputBox
                      inputPlaceholder="Username"
                      inputName="username"
                      inputType="text"
                      inputClassName={`input-box input-box--signup input-box--signup-username ${usernameEr}`}
                      inputValue={username}
                      inputOnChange={handleUsername}
                    />
                    <img
                      onMouseEnter={handleMouseEnterUsernameText}
                      className="signup-page__ques-img"
                      src={questionIcon}
                      alt="question-icon"
                    />
                  </div>
                  {usernameTextAppear && (
                    <p
                      onMouseLeave={handleMouseLeaveUsernameText}
                      className="signup-page__text"
                    >
                      Username requires at least 6 characters.
                    </p>
                  )}
                </div>
              </div>

              <div className="signup-page__flex-container">
                {/* GENDER */}
                <select
                  onChange={handleGender}
                  value={gender}
                  className={`signup-page__select ${genderEr}`}
                >
                  <option value="">
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Choose
                    your gender here
                  </option>
                  <option value="male">
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Male
                  </option>
                  <option value="female">
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Female
                  </option>
                  <option value="others">
                    {" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Others
                  </option>
                </select>

                {/* AGE  */}
                <InputBox
                  inputPlaceholder="Age"
                  inputName="age"
                  inputType="number"
                  inputOnWheel={(e) => {
                    e.target.blur();
                  }}
                  inputClassName={`input-box input-box--signup input-box--signup-age ${ageEr}`}
                  inputValue={age}
                  inputOnChange={handleAge}
                />

                {/* WEIGHT  */}
                <InputBox
                  inputPlaceholder="Weight in kg"
                  inputName="weight"
                  inputType="number"
                  inputOnWheel={(e) => {
                    e.target.blur();
                  }}
                  inputClassName={`input-box input-box--signup input-box--signup-weight ${weightEr}`}
                  inputValue={weight}
                  inputOnChange={handleWeight}
                />

                {/* HEIGHT  */}
                <InputBox
                  inputPlaceholder="Height in cm"
                  inputName="height"
                  inputType="number"
                  inputOnWheel={(e) => {
                    e.target.blur();
                  }}
                  inputClassName={`input-box input-box--signup input-box--signup-height ${heightEr}`}
                  inputValue={height}
                  inputOnChange={handleHeight}
                />

                <ButtonComponent
                  btnClassName="btn btn--signup"
                  btnType="submit"
                  btnContent="Sign-up"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    navigate("/");
  }
}
