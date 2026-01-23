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
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "due_date") {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        alert("Due date cannot be in the past.");
        return;
      }
    }

    if (name === "attachment") {
      setForm((prev) => ({
        ...prev,
        attachment: files[0],
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
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
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("status", form.status);
      formData.append("priority", form.priority);
      formData.append("due_date", form.due_date || Date.now());

      formData.append("subtask", JSON.stringify(form.subtask));

      if (form.attachment) {
        formData.append("attachment", form.attachment);
      }

      await api.post("/api/task", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setForm({
        title: "",
        description: "",
        status: "pending",
        priority: "low",
        due_date: "",
        subtask: [],
        attachment: null,
      });

      setSubtaskInput("");
      onTaskCreated?.();
    } catch (error) {
      console.error(error);
      alert("Failed to create task");
    }
  };

  return (
    <div className={`p-4 bg-white max-w-md mx-auto mt-6 rounded shadow ${css}`}>
      <form
        onSubmit={addTask}
        className="space-y-3"
        encType="multipart/form-data"
      >
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
            className="bg-green-500 text-white px-4 rounded"
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
                  className="text-red-500"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        <input
          type="file"
          name="attachment"
          onChange={handleChange}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
