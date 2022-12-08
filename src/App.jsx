import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useEffect, useState } from "react";
import axios from "axios";
import HomePage from "./pages/HomePage/HomePage";
import HeaderComponent from "./components/HeaderPage/HeaderComponent";
import SideMenu from "./components/SideMenu/SideMenu";
import BuildMacroPage from "./pages/BuildMacroPage/BuildMacroPage";
const URL = process.env.REACT_APP_API_URL || "";

function App() {
  //STATE TO STORE USER PROFILE
  const [userProfile, setUserProfile] = useState(null);
  //STATE FOR LOGGING IN
  const [loginState, setLoginState] = useState(false);
  //STATE FOR EMAIL AND PASSWORD
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //FUNCTION TO HANDLE EMAIL AND PASSWORD STATES
  const handleEmail = function (event) {
    setEmail(event.target.value);
  };
  const handlePassword = function (event) {
    setPassword(event.target.value);
  };
  //FUNCTION TO LOGIN
  const handleLogin = function (event) {
    event.preventDefault();
    axios
      .post(`${URL}/login`, {
        email,
        password,
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("jwt_token", response.data);
          loadProfile(response.data);
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => console.log(error));
  };
  //FUNCTION TO SET THE STATE FOR USER PROFILE
  const loadProfile = function (jwtToken) {
    axios
      .get(`${URL}/user-profile`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setLoginState(true);
        setUserProfile(response.data);
      });
  };
  //USER EFFECT TO GET JWT TOKEN FROM LOCAL STORAGE AND STORE IT IN THE STATE OF USER PROFILE
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt_token");
    if (jwtToken) {
      loadProfile(jwtToken);
    }
  }, []);

  //FUNCTION TO LOG OUT
  const handleLogout = function () {
    setLoginState(false);
    setUserProfile(null);
    localStorage.removeItem("jwt_token");
  };
  //STATE FOR THE SIDE MENU
  const [sideMenuState, setSideMenuState] = useState("side-menu--hidden");
  //FUNCTION TO POP OUT THE SIDE MENU
  const popOutSideMenu = function () {
    const newState =
      sideMenuState === "side-menu--hidden"
        ? "side-menu--appear"
        : "side-menu--hidden";
    setSideMenuState(newState);
  };
  return (
    <BrowserRouter>
      <HeaderComponent
        loginState={loginState}
        handleLogout={handleLogout}
        popOutSideMenu={popOutSideMenu}
      />
      <SideMenu sideMenuState={sideMenuState} popOutSideMenu={popOutSideMenu} />
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                userProfile={userProfile}
                handleLogout={handleLogout}
                loginState={loginState}
                sideMenuState={sideMenuState}
              />
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                handleLogin={handleLogin}
                handleEmail={handleEmail}
                handlePassword={handlePassword}
                email={email}
                password={password}
                loadProfile={loadProfile}
                loginState={loginState}
                userProfile={userProfile}
              />
            }
          />
          {loginState && (
            <Route
              path="/build-macro"
              element={
                <BuildMacroPage
                  userProfile={userProfile}
                  loginState={loginState}
                />
              }
            />
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
