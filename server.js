const cors = require("cors");
const connectDB = require("./db");
require("dotenv").config();

const express = require("express");
const taskRoutes = require("./routes/taskRoutes"); // adjust path if needed
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = process.env.PORT || 3000;

// Connect Database
connectDB();

// Middleware to read JSON
app.use(cors());
app.use(express.json());

// Health Check Endpoint
app.get("/api/health", (req, res) => {
res.json({
status: "OK",
message: "Server is running"
});
});

// Task CRUD Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
// Root Route
app.get("/", (req, res) => {
res.send("Task API Server Running");
});

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
