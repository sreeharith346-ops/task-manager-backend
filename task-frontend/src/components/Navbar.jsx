import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
 const {
  logout,
  isAuthenticated,
  user,
} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        gap: "15px",
      }}
    >
      <Link to="/">Login</Link>

      <Link to="/register">Register</Link>

      <Link to="/dashboard">Dashboard</Link>

      <Link to="/tasks">Tasks</Link>

      <Link to="/profile">Profile</Link>

     {isAuthenticated && (
  <>
    <div
      style={{
        width: "35px",
        height: "35px",
        borderRadius: "50%",
        background: "#007bff",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
      }}
    >
      {user?.name?.charAt(0).toUpperCase()}
    </div>

    <button onClick={handleLogout}>
      Logout
    </button>
  </>
)}
    </div>
  );
}