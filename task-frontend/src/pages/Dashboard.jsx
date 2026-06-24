import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);


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

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "high"
  ).length;
const recentTasks = tasks.slice(0, 3);
  const completionPercentage =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );
const chartData = {
  labels: ["Completed", "Pending"],
  datasets: [
    {
      data: [completedTasks, pendingTasks],
      backgroundColor: ["#22c55e", "#ef4444"],
      borderWidth: 1,
    },
  ],
};
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ padding: "25px" }}
    >
      <h1>Dashboard</h1>
<p
  style={{
    color: "#64748b",
    fontSize: "18px",
  }}
>
  Welcome back! Here's your task overview.
</p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "#3b82f6",
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            minWidth: "200px",
            flex: "1",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.2)",
          }}
        >
          <h2>Total Tasks</h2>
          <h1>{totalTasks}</h1>
        </div>

        <div
          style={{
            background: "#22c55e",
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            minWidth: "200px",
            flex: "1",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.2)",
          }}
        >
          <h2>Completed</h2>
          <h1>{completedTasks}</h1>
        </div>

        <div
          style={{
            background: "#ef4444",
            color: "white",
            padding: "25px",
            borderRadius: "15px",
            minWidth: "200px",
            flex: "1",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.2)",
          }}
        >
          <h2>Pending</h2>
          <h1>{pendingTasks}</h1>
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow:
            "0 5px 15px rgba(0,0,0,0.15)",
        }}
      >
        <h2>Task Completion</h2>

        <h1>{completionPercentage}%</h1>

        <div
          style={{
            width: "100%",
            height: "20px",
            background: "#e5e7eb",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${completionPercentage}%`,
              height: "100%",
              background:
                "linear-gradient(90deg,#22c55e,#16a34a)",
            }}
          ></div>
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: "1",
            minWidth: "200px",
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.15)",
          }}
        >
          <h3>🔥 High Priority Tasks</h3>
          <h1>{highPriorityTasks}</h1>
        </div>

        <div
          style={{
            flex: "1",
            minWidth: "200px",
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            boxShadow:
              "0 5px 15px rgba(0,0,0,0.15)",
          }}
        >
          <h3>📋 Pending Tasks</h3>
          <h1>{pendingTasks}</h1>
        </div>
      </div>
      <div
  style={{
    marginTop: "20px",
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
  }}
>
  <h2>Recent Tasks</h2>

  {recentTasks.length === 0 ? (
    <p>No recent tasks</p>
  ) : (
    recentTasks.map((task) => (
      <div
        key={task._id}
        style={{
          padding: "10px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <strong>{task.title}</strong>

  <span
    style={{
      background:
        task.status === "completed"
          ? "#22c55e"
          : "#f59e0b",
      color: "white",
      padding: "4px 10px",
      borderRadius: "10px",
      fontSize: "12px",
    }}
  >
    {task.status}
  </span>
</div>
      </div>
    ))
  )}
</div>
<div
  style={{
    flex: "1",
    minWidth: "200px",
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow:
      "0 5px 15px rgba(0,0,0,0.15)",
  }}
>
  <h3>📊 Completion Rate</h3>
  <h1>{completionPercentage}%</h1>
</div>
<div
  style={{
    marginTop: "20px",
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
    maxWidth: "400px",
  }}
>
  <h2>Task Status Chart</h2>

  <Pie data={chartData} />
</div>
    </motion.div>
  );
}