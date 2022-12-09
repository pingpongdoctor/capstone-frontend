import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useEffect, useState } from "react";
import axios from "axios";
import HomePage from "./pages/HomePage/HomePage";
import HeaderComponent from "./components/HeaderPage/HeaderComponent";
import SideMenu from "./components/SideMenu/SideMenu";
import BuildMacroPage from "./pages/BuildMacroPage/BuildMacroPage";
import ProFilePage from "./pages/ProFilePage/ProfilePage";
const URL = process.env.REACT_APP_API_URL || "";

function App() {
  //STATE FOR APP
  const [appPageState, setAppPageState] = useState("");
  //STATE FOR THE SIDE MENU
  const [sideMenuState, setSideMenuState] = useState("side-menu--hidden");
  //USE EFFECT TO SET THE STATE FOR THE APP CLASS NAME
  useEffect(() => {
    if (sideMenuState === "side-menu--appear") {
      setAppPageState("app--blur");
    } else {
      setAppPageState("");
    }
  }, [sideMenuState]);
  //STATE TO STORE USER PROFILE
  const [userProfile, setUserProfile] = useState(null);
  //STATE FOR LOGGING IN
  const [loginState, setLoginState] = useState(false);
  //STATE FOR EMAIL AND PASSWORD
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //STATE FOR THE CURRENT PATH
  const [currentPath, setCurrentPath] = useState("");
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
  //FUNCTION TO POP OUT THE SIDE MENU
  const popOutSideMenu = function () {
    setSideMenuState("side-menu--appear");
  };
  //FUNCTION TO CLOSE THE SIDE MENU
  const closeMenu = function () {
    setSideMenuState("side-menu--hidden");
  };

  //FUNCTION TO SET CURRENT PATH
  const handleCurrentPath = function (path) {
    setCurrentPath(path);
  };

  return (
    <BrowserRouter>
      {/* HEADER COMPONENT */}
      {currentPath !== "/login" && (
        <HeaderComponent
          loginState={loginState}
          handleLogout={handleLogout}
          popOutSideMenu={popOutSideMenu}
          closeMenu={closeMenu}
          handleCurrentPath={handleCurrentPath}
        />
      )}
      {/* SIDE MENU */}
      <SideMenu sideMenuState={sideMenuState} />
      <div className="App">
        <div className={appPageState}>
          <Routes>
            {/* HOME PAGE ROUTE */}
            <Route
              path="/"
              element={
                <HomePage
                  userProfile={userProfile}
                  handleLogout={handleLogout}
                  loginState={loginState}
                  sideMenuState={sideMenuState}
                  handleCurrentPath={handleCurrentPath}
                />
              }
            />

            {/* PROFILE ROUTE*/}
            <Route
              path="/profile"
              element={
                <ProFilePage
                  loadProfile={loadProfile}
                  userProfile={userProfile}
                  loginState={loginState}
                />
              }
            />

            {/* LOGIN PAGE ROUTE */}
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

            {/* BUILD MACRO PAGE ROUTE */}
            {loginState && (
              <Route
                path="/build-macro"
                element={
                  <BuildMacroPage
                    handleCurrentPath={handleCurrentPath}
                    sideMenuState={sideMenuState}
                    userProfile={userProfile}
                    loginState={loginState}
                  />
                }
              />
            )}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
