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
      console.log(error);
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

  return (
    <div>
      <h1>Tasks</h1>

      <div>
        <button onClick={() => setFilter("all")}>
          All ({allCount})
        </button>

        <button onClick={() => setFilter("pending")}>
          Pending ({pendingCount})
        </button>

        <button onClick={() => setFilter("completed")}>
          Completed ({completedCount})
        </button>

        <button onClick={() => setFilter("high")}>
          High Priority ({highPriorityCount})
        </button>
      </div>

      <br />

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <form onSubmit={editingTask ? handleUpdateTask : handleAddTask}>
        <h2>{editingTask ? "Edit Task" : "Add Task"}</h2>

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <br />
        <br />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <br />
        <br />

        <input
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
        />

        <br />
        <br />

        <button
          type="submit"
          disabled={submitLoading}
        >
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
          >
            Cancel
          </button>
        )}
      </form>

      <hr />

      {filteredTasks.length === 0 ? (
        <h2>No tasks found</h2>
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