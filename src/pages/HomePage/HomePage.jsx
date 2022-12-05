import { useNavigate } from "react-router-dom";

export default function HomePage({ userProfile, handleLogout, loginState }) {
  const navigate = useNavigate();
  const logoutAndComeBackLogin = function () {
    handleLogout();
    navigate("/login");
  };
  if (loginState) {
    return (
      <div>
        <div> Welcome back {userProfile.username}</div>
      </div>
    );
  }
}
