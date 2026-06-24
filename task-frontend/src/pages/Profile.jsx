import {
  useEffect,
  useState,
  useContext,
} from "react";

import axiosInstance from "../services/axiosInstance";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const [user, setLocalUser] = useState(null);

  const { setUser } =
    useContext(AuthContext);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res =
        await axiosInstance.get(
          "/auth/me"
        );

      setLocalUser(res.data);

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow:
            "0 5px 15px rgba(0,0,0,0.2)",
          width: "350px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background:
              "linear-gradient(135deg,#4f46e5,#7c3aed)",
            color: "white",
            fontSize: "32px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 20px",
          }}
        >
          {user.name
            ?.charAt(0)
            .toUpperCase()}
        </div>

        <h1
          style={{
            color: "#312e81",
          }}
        >
          Profile
        </h1>

        <p>
          <strong>Name:</strong>{" "}
          {user.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user.email}
        </p>
      </div>
    </div>
  );
}