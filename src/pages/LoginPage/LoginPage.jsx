import "./LoginPage.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const URL = process.env.REACT_APP_API_URL || "";

export default function LoginPage({
  handleLogin,
  handleEmail,
  handlePassword,
  email,
  password,
  loginState,
}) {
  //FUNCTION TO COME BACK HOMEPAGE
  const navigate = useNavigate();
  const backToHome = function () {
    navigate("/");
  };
  //STATES FOR INPUT BOXES
  const [passwordConfirm, setPasswordConfirm] = useState("");
  //FUNCTIONS TO UPDATES INPUT DATA IN BOXES TO INPUT STATES
  const handlePasswordConfirm = function (event) {
    setPasswordConfirm(event.target.value);
  };
  //VALIDATION FUNCTIONS
  //FUNCTION TO CHECK THE PASSWORD STRENGTH
  //USEEFFECTS TO CHECK THE PASSWORD STRENGTH AND TO HELP REACT OBSERVE INPUT BOXES
  //FUNCTION TO SUBMIT
  if (!loginState) {
    return (
      <div className="login-page">
        <form onSubmit={handleLogin} className="login-page_form">
          {/* EMAIL BOX */}
          <label htmlFor="email">Email</label>
          <input
            id="email"
            className="login-page__input-box"
            type="text"
            name="email"
            value={email}
            onChange={handleEmail}
          />
          {/* PASSWORD BOX */}
          <label htmlFor="password">Password</label>
          <input
            className="login-page__input-box"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePassword}
          />
          {/* CHECK PASSWORD BOX */}
          <label htmlFor="password-confirm">Confirm Password</label>
          <input
            className="login-page__input-box"
            type="password"
            name="password-confirm"
            id="password-confirm"
            value={passwordConfirm}
            onChange={handlePasswordConfirm}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  } else {
    backToHome();
  }
}
