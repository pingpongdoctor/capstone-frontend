import "./App.scss";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useEffect, useState } from "react";
import axios from "axios";
import HomePage from "./pages/HomePage/HomePage";
const URL = process.env.REACT_APP_API_URL || "";

function App() {
  //STATE TO STORE JWT TOKEN
  const [token, setToken] = useState("");
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
          setToken(response.data);
          loadProfile(response.data);
        }
      })
      .catch((error) => console.log(error));
  };
  //FUNCTION TO SET THE STATE FOR USER PROFILE
  const loadProfile = function () {
    axios
      .get(`${URL}/user-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.data) {
          setLoginState(true);
          setUserProfile(response.data);
        }
      });
  };
  //USER EFFECT TO GET JWT TOKEN FROM LOCAL STORAGE AND STORE IT IN THE STATE OF USER PROFILE
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt_token");
    if (jwtToken) {
      setToken(jwtToken);
      loadProfile(jwtToken);
    }
  }, []);
  //FUNCTION TO LOG OUT
  const handleLogout = function () {
    setLoginState(false);
    setUserProfile(null);
    localStorage.removeItem("jwt_token");
  };
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage userProfile={userProfile} handleLogout={handleLogout} />
            }
          />
          <Route
            path="/Login"
            element={
              <LoginPage
                handleLogin={handleLogin}
                handleEmail={handleEmail}
                handlePassword={handlePassword}
                email={email}
                password={password}
                loadProfile={loadProfile}
                handleLogout={handleLogout}
                loginState={loginState}
                userProfile={userProfile}
              />
            }
          />

          <Route />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
