import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useEffect, useState } from "react";
import axios from "axios";
import HomePage from "./pages/HomePage/HomePage";
import HeaderComponent from "./components/HeaderPage/HeaderComponent";
import SideMenu from "./components/SideMenu/SideMenu";
import BuildMacroPage from "./pages/BuildMacroPage/BuildMacroPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import MacroListPage from "./pages/MacroListPage/MacroListPage";
import AddMacroPage from "./pages/AddMacroPage/AddMacroPage";
import EditMacroPage from "./pages/EditMacroPage/EditMacroPage";
import DetailedMacroPage from "./pages/DetailedMacroPage/DetailedMacroPage";
import RecipeLibraryPage from "./pages/RecipeLibraryPage/RecipeLibraryPage";
import DetailRecipePage from "./pages/DetailedRecipePage/DetailedRecipePage";
import AddRecipePage from "./pages/AddRecipePage/AddRecipePage";
import EditRecipePage from "./pages/EditRecipePage/EditRecipePage";
import FooterComponent from "./components/FooterComponent/FooterComponent";
import RecipeListPage from "./pages/RecipeListPage/RecipeListPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { sha256 } from "js-sha256";
const API_URL = process.env.REACT_APP_API_URL || "";

function App() {
  //STATE FOR THE SIDE MENU
  const [sideMenuState, setSideMenuState] = useState("side-menu--hidden");
  //STATE TO STORE USER PROFILE
  const [userProfile, setUserProfile] = useState(null);
  //STATE FOR LOGGING IN
  const [loginState, setLoginState] = useState(false);
  //STATE FOR THE ERROR LOGIN STATE
  const [loginErr, setLoginErr] = useState("");
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
  //FUNCTION TO VALIDATE EMAIL AND PASSWORD
  const isEmailValid = function () {
    if (email) {
      return true;
    }
    return false;
  };
  const isPasswordValid = function () {
    if (email) {
      return true;
    }
    return false;
  };

  //FUNCTION TO LOGIN
  const handleLogin = function (event) {
    event.preventDefault();
    if (isEmailValid() && isPasswordValid()) {
      axios
        .post(`${API_URL}/login`, {
          email: sha256(email),
          password: sha256(password),
        })
        .then((response) => {
          console.log(response);
          if (response.data) {
            localStorage.setItem("jwt_token", response.data);
            loadProfile(response.data);
            setEmail("");
            setPassword("");
            setLoginErr("");
          }
        })
        .catch((e) => {
          console.log(e);
          if (e.response.data === "Incorrect email and password") {
            alert("Incorrect email and password");
            setLoginErr("input-box--login-err");
          }
        });
    } else {
      setLoginErr("input-box--login-err");
    }
  };

  //FUNCTION TO LOGIN THE EXPERIENCE ACCOUNT
  const handleLoginExperienceAccount = function () {
    axios
      .post(`${API_URL}/login`, {
        email: sha256("simon@gmail.com"),
        password: sha256("123456Aa@"),
      })
      .then((response) => {
        if (response.data) {
          localStorage.setItem("jwt_token", response.data);
          loadProfile(response.data);
          setEmail("");
          setPassword("");
          setLoginErr("");
          alert("You are logged in with demo account");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //FUNCTION TO REFRESH EMAIL AND PASSWORD
  const handleRefreshEmailPassword = function () {
    setEmail("");
    setPassword("");
  };

  //USE EFFECT TO CLEAR THE ERROR LOGIN STATE
  useEffect(() => {
    setLoginErr("");
  }, [email, password]);

  //FUNCTION TO SET THE STATE FOR USER PROFILE
  const loadProfile = function (jwtToken) {
    axios
      .get(`${API_URL}/user-profile`, {
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

  return (
    <BrowserRouter>
      <div className="App">
        {/* HEADER COMPONENT */}
        <HeaderComponent
          loginState={loginState}
          handleLogout={handleLogout}
          popOutSideMenu={popOutSideMenu}
          handleLoginExperienceAccount={handleLoginExperienceAccount}
          closeMenu={closeMenu}
        />

        {/* SIDE MENU */}
        <SideMenu sideMenuState={sideMenuState} />
        <Routes>
          {/* HOMEPAGE ROUTE */}
          <Route
            path="/"
            element={<HomePage loginState={loginState} closeMenu={closeMenu} />}
          />

          {/* SIGN UP PAGE */}
          <Route
            path="/sign-up"
            element={
              <SignUpPage
                loginState={loginState}
                userProfile={userProfile}
                handleLoginExperienceAccount={handleLoginExperienceAccount}
              />
            }
          />

          {/* PROFILE ROUTE*/}
          <Route
            path="/profile"
            element={
              <ProfilePage
                loadProfile={loadProfile}
                userProfile={userProfile}
                loginState={loginState}
                closeMenu={closeMenu}
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
                loginErr={loginErr}
                handleRefreshEmailPassword={handleRefreshEmailPassword}
                handleLoginExperienceAccount={handleLoginExperienceAccount}
              />
            }
          />

          {/* BUILD MACRO PAGE ROUTE */}

          <Route
            path="/build-macro"
            element={
              <BuildMacroPage
                userProfile={userProfile}
                loginState={loginState}
                closeMenu={closeMenu}
              />
            }
          />

          {/* MACRO LIST ROUTE */}
          <Route
            path="/macro-list"
            element={
              <MacroListPage
                userProfile={userProfile}
                loginState={loginState}
                closeMenu={closeMenu}
              />
            }
          />

          {/* DETAILED MACRO PAGE */}
          <Route
            path="/macro-list/:macroId"
            element={
              <DetailedMacroPage
                userProfile={userProfile}
                loginState={loginState}
                closeMenu={closeMenu}
              />
            }
          />

          {/* ADD MACRO ROUTE */}
          <Route
            path="/add-macro"
            element={
              <AddMacroPage
                userProfile={userProfile}
                loginState={loginState}
                closeMenu={closeMenu}
              />
            }
          />

          {/* EDIT MACRO ROUTE */}
          <Route
            path="/edit-macro/:macroId"
            element={
              <EditMacroPage
                userProfile={userProfile}
                loginState={loginState}
                closeMenu={closeMenu}
              />
            }
          />

          {/* RECIPE LIBRARY ROUTE */}
          <Route
            path="/recipe-library"
            element={
              <RecipeLibraryPage
                userProfile={userProfile}
                loginState={loginState}
                closeMenu={closeMenu}
              />
            }
          />

          {/* DETAIL RECIPE ROUTE */}
          <Route
            path="/recipe-library/:detailRecipeId"
            element={
              <DetailRecipePage
                userProfile={userProfile}
                loginState={loginState}
                closeMenu={closeMenu}
              />
            }
          />

          {/* ADD RECIPE ROUTE */}
          <Route
            path="/add-recipe"
            element={
              <AddRecipePage
                userProfile={userProfile}
                loginState={loginState}
                closeMenu={closeMenu}
              />
            }
          />

          {/* EDIT RECIPE ROUTE */}
          <Route
            path="/edit-recipe/:recipeId"
            element={
              <EditRecipePage
                userProfile={userProfile}
                loginState={loginState}
                closeMenu={closeMenu}
              />
            }
          />

          {/* RECIPE LIST ROUTE */}
          <Route
            path="/recipe-list"
            element={
              <RecipeListPage
                userProfile={userProfile}
                loginState={loginState}
                closeMenu={closeMenu}
              />
            }
          />
        </Routes>
        <FooterComponent closeMenu={closeMenu} />
      </div>
    </BrowserRouter>
  );
}

export default App;
