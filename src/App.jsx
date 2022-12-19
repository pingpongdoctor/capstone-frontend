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
const URL = process.env.REACT_APP_API_URL || "";

function App() {
  //STATE FOR THE SIDE MENU
  const [sideMenuState, setSideMenuState] = useState("side-menu--hidden");
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
      {/* HEADER COMPONENT */}
      <HeaderComponent
        loginState={loginState}
        handleLogout={handleLogout}
        popOutSideMenu={popOutSideMenu}
      />

      {/* SIDE MENU */}
      <SideMenu sideMenuState={sideMenuState} />
      <div onMouseEnter={closeMenu} className="App">
        <Routes>
          {/* HOME PAGE ROUTE */}
          <Route
            path="/"
            element={
              <HomePage
                userProfile={userProfile}
                handleLogout={handleLogout}
                loginState={loginState}
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

          <Route
            path="/build-macro"
            element={
              <BuildMacroPage
                userProfile={userProfile}
                loginState={loginState}
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
              />
            }
          />

          {/* ADD MACRO ROUTE */}
          <Route
            path="/add-macro"
            element={
              <AddMacroPage userProfile={userProfile} loginState={loginState} />
            }
          />

          {/* EDIT MACRO ROUTE */}
          <Route
            path="/edit-macro/:macroId"
            element={
              <EditMacroPage
                userProfile={userProfile}
                loginState={loginState}
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
              />
            }
          />
        </Routes>
      </div>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
