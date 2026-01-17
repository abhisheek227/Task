import { useState } from "react";
import api from "../api/axios";

const TaskForm = ({ onTaskCreated }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "low",
    due_date: "",
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!form.title) return;

    try {
      await api.post("/api/task/", {
        ...form,
        due_date: form.due_date || null,
      });

      setForm({
        title: "",
        description: "",
        status: "pending",
        priority: "low",
        due_date: "",
      });

      onTaskCreated?.();
    } catch {
      alert("Failed to create task");
    }
  };

  return (
    <div className="p-4 bg-white max-w-md mx-auto mt-6 rounded shadow">
      <form onSubmit={addTask} className="space-y-2">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Task Title"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full"
          placeholder="Description"
          rows="3"
        />

        <select name="status" value={form.status} onChange={handleChange} className="border p-2 w-full">
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select name="priority" value={form.priority} onChange={handleChange} className="border p-2 w-full">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="date"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button className="bg-blue-500 text-white w-full p-2 rounded">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
