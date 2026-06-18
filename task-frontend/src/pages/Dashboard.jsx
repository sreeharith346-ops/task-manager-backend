import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "completed"
  ).length;

 return (
  <div
    style={{
      padding: "20px",
    }}
  >
    <h1>Dashboard</h1>

    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          flex: "1",
          minWidth: "200px",
          padding: "20px",
          borderRadius: "12px",
          background: "#f5f5f5",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2>Total Tasks</h2>
        <h1>{totalTasks}</h1>
      </div>

      <div
        style={{
          flex: "1",
          minWidth: "200px",
          padding: "20px",
          borderRadius: "12px",
          background: "#e8f5e9",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2>Completed</h2>
        <h1>{completedTasks}</h1>
      </div>

      <div
        style={{
          flex: "1",
          minWidth: "200px",
          padding: "20px",
          borderRadius: "12px",
          background: "#fff3e0",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2>Pending</h2>
        <h1>{pendingTasks}</h1>
      </div>
    </div>
  </div>
);
}