import "./LoginPage.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({
  handleLogin,
  handleEmail,
  handlePassword,
  email,
  password,
  loginState,
}) {
  //DEFINE NAVIGATE
  const navigate = useNavigate();

  if (!loginState) {
    return (
      <div className="login-page">
        <form onSubmit={handleLogin} className="login-page_form">
          <h1 className="login-page_heading">Glad To See You Here</h1>
          <input
            id="email"
            className="login-page__input-box login-page__input-box-email"
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          />
          <input
            className="login-page__input-box login-page__input-box-password"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
          <button className="login-page__btn" type="submit">
            Login
          </button>
        </form>
      </div>
    );
  } else {
    navigate("/");
  }
}
