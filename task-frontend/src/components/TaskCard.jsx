export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onMarkComplete,
}) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "15px",
        margin: "10px 0",
        width: "100%",
        boxSizing: "border-box",
        background: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>
        Status:
        <span
          style={{
            color:
              task.status === "completed"
                ? "green"
                : "orange",
            fontWeight: "bold",
          }}
        >
          {" "}
          {task.status}
        </span>
      </p>

      <p>
        Priority:{" "}
        <span
          style={{
            color: "white",
            backgroundColor:
              task.priority === "high"
                ? "red"
                : task.priority === "medium"
                ? "orange"
                : "green",
            padding: "4px 8px",
            borderRadius: "10px",
          }}
        >
          {task.priority}
        </span>
      </p>

      <p>
        Due Date:{" "}
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : "No Due Date"}
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "10px",
        }}
      >
        <button onClick={() => onMarkComplete(task)}>
          {task.status === "completed"
            ? "Mark Pending"
            : "Mark Complete"}
        </button>

        <button onClick={() => onEdit(task)}>
          Edit
        </button>

        <button onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}