import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import TaskCard from "../components/TaskCard";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    });
    setEditingTask(null);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const res = await axiosInstance.post("/tasks", form);
      setTasks([res.data, ...tasks]);
      resetForm();
      toast.success("Task added");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add task"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const startEdit = (task) => {
    setEditingTask(task);

    setForm({
      title: task.title,
      description: task.description || "",
      priority: task.priority || "medium",
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
    });
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const res = await axiosInstance.put(
        `/tasks/${editingTask._id}`,
        form
      );

      setTasks(
        tasks.map((task) =>
          task._id === editingTask._id ? res.data : task
        )
      );

      resetForm();
      toast.success("Task updated");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update task"
      );
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/tasks/${id}`);

      setTasks(tasks.filter((task) => task._id !== id));

      toast.success("Task deleted");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete task"
      );
    }
  };

  const handleMarkComplete = async (task) => {
    try {
      const updatedStatus =
        task.status === "completed" ? "pending" : "completed";

      const res = await axiosInstance.put(`/tasks/${task._id}`, {
        status: updatedStatus,
      });

      setTasks(
        tasks.map((item) =>
          item._id === task._id ? res.data : item
        )
      );

      toast.success(
        updatedStatus === "completed"
          ? "Task marked complete"
          : "Task marked pending"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update status"
      );
    }
  };

  if (loading) {
    return <Spinner />;
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    let matchesFilter = true;

    if (filter === "pending") {
      matchesFilter = task.status === "pending";
    }

    if (filter === "completed") {
      matchesFilter = task.status === "completed";
    }

    if (filter === "high") {
      matchesFilter = task.priority === "high";
    }

    return matchesSearch && matchesFilter;
  });

  const allCount = tasks.length;

  const pendingCount = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const completedCount = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const highPriorityCount = tasks.filter(
    (task) => task.priority === "high"
  ).length;

  const filters = [
    {
      label: "All",
      value: "all",
      count: allCount,
    },
    {
      label: "Pending",
      value: "pending",
      count: pendingCount,
    },
    {
      label: "Completed",
      value: "completed",
      count: completedCount,
    },
    {
      label: "High Priority",
      value: "high",
      count: highPriorityCount,
    },
  ];

  return (
    <div
      style={{
        padding: "25px",
        maxWidth: "950px",
        margin: "0 auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "25px",
          color: "#312e81",
        }}
      >
        Tasks
      </h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        {filters.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            style={{
              background:
                filter === item.value ? "#4f46e5" : "#e0e7ff",
              color:
                filter === item.value ? "white" : "#312e81",
            }}
          >
            {item.label} ({item.count})
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: "100%",
          marginBottom: "20px",
          boxSizing: "border-box",
        }}
      />

      <form
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
          marginBottom: "25px",
        }}
      >
        <h2
          style={{
            color: "#312e81",
            marginTop: 0,
          }}
        >
          {editingTask ? "Edit Task" : "Add Task"}
        </h2>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          style={{
            width: "100%",
            marginBottom: "12px",
            boxSizing: "border-box",
          }}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={{
            width: "100%",
            marginBottom: "12px",
            boxSizing: "border-box",
            minHeight: "80px",
          }}
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          style={{
            width: "100%",
            marginBottom: "12px",
            boxSizing: "border-box",
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
          style={{
            width: "100%",
            marginBottom: "15px",
            boxSizing: "border-box",
          }}
        />

        <button type="submit" disabled={submitLoading}>
          {submitLoading
            ? "Saving..."
            : editingTask
            ? "Save Changes"
            : "Add Task"}
        </button>

        {editingTask && (
          <button
            type="button"
            disabled={submitLoading}
            onClick={resetForm}
            style={{
              marginLeft: "10px",
              background: "#64748b",
            }}
          >
            Cancel
          </button>
        )}
      </form>

      {filteredTasks.length === 0 ? (
       <div
  style={{
    textAlign: "center",
    padding: "40px",
  }}
>
  <h1>📋</h1>
  <h2>No tasks found</h2>
  <p>Create your first task to get started.</p>
</div>
      ) : (
        filteredTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={startEdit}
            onDelete={handleDeleteTask}
            onMarkComplete={handleMarkComplete}
          />
        ))
      )}
    </div>
  );
}