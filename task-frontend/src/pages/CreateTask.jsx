import { useState } from "react";
import axiosInstance from "../services/axiosInstance";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("medium");

  const [dueDate, setDueDate] =
    useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res =
        await axiosInstance.post(
          "/tasks",
          {
            title,
            description,
            priority,
            dueDate,
          }
        );

      alert("Task Created");
      console.log(res.data);

      setTitle("");
      setDescription("");
      setPriority("medium");
      setDueDate("");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to create task"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Task</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <br /><br />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
      >
        <option value="low">
          Low
        </option>

        <option value="medium">
          Medium
        </option>

        <option value="high">
          High
        </option>
      </select>

      <br /><br />

      <input
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
      />

      <br /><br />

      <button type="submit">
        Add Task
      </button>
    </form>
  );
}