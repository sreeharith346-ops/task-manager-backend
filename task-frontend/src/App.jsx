import CreateTask from "./pages/CreateTask";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import { Routes, Route } from "react-router-dom";
import './App.css'

function App() {
  

  return (
    <>
      <Navbar />
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
  <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
  <Route path="/create-task" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
</Routes>
    </>
  );
}

export default App
