import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputBox from "../../components/InputBox/InputBox";

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
  //USE EFFECT TO NAVIGATE TO HOMEPAGE WHEN USERS SUCCESSFULLY LOG IN
  useEffect(() => {
    if (loginState) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [loginState]);

  if (!loginState) {
    return (
      <div className="login-page">
        <div className="login-page__wrapper">
          <p
            onClick={() => {
              navigate("/sign-up");
            }}
            className="login-page__text"
          >
            Signup
          </p>
          <p
            onClick={() => {
              navigate("/");
            }}
            className="login-page__text"
          >
            Home Page
          </p>
        </div>
        <form onSubmit={handleLogin} className="login-page__form">
          <h1 className="login-page__heading">Login</h1>

          <InputBox
            inputId="email"
            inputClassName="input-box input-box--login input-box--login-email"
            inputType="text"
            inputName="email"
            inputPlaceholder="Email"
            inputValue={email}
            inputOnChange={handleEmail}
          />

          <InputBox
            inputClassName="input-box input-box--login input-box--login-password"
            inputType="password"
            inputName="password"
            inputId="password"
            inputPlaceholder="Password"
            inputValue={password}
            inputOnChange={handlePassword}
          />

          <ButtonComponent
            btnClassName="btn btn--login"
            btnType="submit"
            btnContent="Login"
          />
        </form>
      </div>
    );
  }
}
