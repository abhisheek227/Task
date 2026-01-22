import { useState } from "react";
import api from "../api/axios";

const TaskForm = ({ onTaskCreated, css }) => {
  const [subtaskInput, setSubtaskInput] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "low",
    due_date: "",
    subtask: [],
  });
  const handleChange = (e) => {
    if (e.target.name === "due_date") {
      const selectedDate = new Date(e.target.value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        alert("Due date cannot be in the past.");
        return;
      }
    }

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const addSubtask = () => {
    if (!subtaskInput.trim()) return;

    setForm((prev) => ({
      ...prev,
      subtask: [
        ...prev.subtask,
        { data: subtaskInput.trim(), isCompleted: false },
      ],
    }));

    setSubtaskInput("");
  };


  const removeSubtask = (index) => {
    setForm((prev) => ({
      ...prev,
      subtask: prev.subtask.filter((_, i) => i !== index),
    }));
  };


  const addTask = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) return;

    try {
      await api.post("/api/task", {
        ...form,
        due_date: form.due_date || Date.now(),
      });

      setForm({
        title: "",
        description: "",
        status: "pending",
        priority: "low",
        due_date: "",
        subtask: [],
      });

      onTaskCreated?.();
    } catch {
      alert("Failed to create task");
    }
  };

  return (
    <div className={`p-4 bg-white max-w-md mx-auto mt-6 rounded shadow ${css}`}>
      <form onSubmit={addTask} className="space-y-3">
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

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="border p-2 w-full"
        >
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
          min={new Date().toISOString().split("T")[0]}
          required
        />

        <div className="flex gap-2">
          <input
            type="text"
            value={subtaskInput}
            onChange={(e) => setSubtaskInput(e.target.value)}
            placeholder="Add subtask"
            className="border p-2 flex-1"
          />
          <button
            type="button"
            onClick={addSubtask}
            className="bg-green-500 text-white px-4 rounded hover:bg-green-600"
          >
            +
          </button>
        </div>

        {form.subtask.length > 0 && (
          <ul className="space-y-1">
            {form.subtask.map((st, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 p-2 rounded"
              >
                <span className="text-sm">{st.data}</span>
                <button
                  type="button"
                  onClick={() => removeSubtask(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
