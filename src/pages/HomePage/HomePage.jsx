import { useNavigate } from "react-router-dom";
export default function HomePage({ userProfile, handleLogout }) {
  const navigate = useNavigate();
  const logoutAndComeBackLogin = function () {
    handleLogout();
    navigate("/login");
  };
  return (
    <div>
      <div> Welcome back {userProfile.username}</div>
      <button onClick={logoutAndComeBackLogin}>Log out</button>
    </div>
  );
}
