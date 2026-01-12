import { useState } from "react";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");

  const addTask = async (e) => {
    e.preventDefault();
    if (!title) return;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please login first");
      return;
    }

    const taskData = {
      title,
      description,
      status,
      priority,
      due_date: dueDate || null,
    };

    try {
      const response = await fetch("http://localhost:5000/api/task/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to create task");
        return;
      }

      alert("Task created successfully");
      // Reset form
      setTitle("");
      setDescription("");
      setStatus("pending");
      setPriority("low");
      setDueDate("");
    } catch (error) {
      alert("Error creating task");
    }
  };

  return (
    <div className="p-4 bg-white max-w-md mx-auto mt-6">
      <form onSubmit={addTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder="Task Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder="Description"
          rows="3"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full mb-2"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 w-full mb-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button className="bg-blue-500 text-white w-full p-2 rounded">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
