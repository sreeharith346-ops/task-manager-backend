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
    <div>
      <h1>Profile</h1>

      <p>
        Name: {user.name}
      </p>

      <p>
        Email: {user.email}
      </p>
    </div>
  );
}