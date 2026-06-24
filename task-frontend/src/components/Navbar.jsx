import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const {
    user,
    logout,
    isAuthenticated,
  } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkStyle = (path) => ({
    color: "white",
    textDecoration: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    background:
      location.pathname === path
        ? "rgba(255,255,255,0.25)"
        : "transparent",
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 25px",
        background:
          "linear-gradient(90deg,#4f46e5,#7c3aed)",
        color: "white",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        flexWrap: "wrap",
        gap: "10px",
      }}
    >
      <h2 style={{ margin: 0 }}>
        Task Manager
      </h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {!isAuthenticated && (
          <>
            <Link to="/" style={linkStyle("/")}>
              Login
            </Link>

            <Link
              to="/register"
              style={linkStyle("/register")}
            >
              Register
            </Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <Link
              to="/dashboard"
              style={linkStyle("/dashboard")}
            >
              Dashboard
            </Link>

            <Link
              to="/tasks"
              style={linkStyle("/tasks")}
            >
              Tasks
            </Link>

            <Link
              to="/profile"
              style={linkStyle("/profile")}
            >
              Profile
            </Link>

            <div
              style={{
                width: "35px",
                height: "35px",
                borderRadius: "50%",
                background: "white",
                color: "#4f46e5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>

            <span>{user?.name}</span>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}