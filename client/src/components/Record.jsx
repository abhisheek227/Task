import React, { useState } from "react";
import api from "../api/axios";
import ConfirmDelete from "./ConfirmDelete";
import CardSubTask from "./CardSubTask";

const Record = ({ data, onDelete }) => {
  const [editRowId, setEditRowId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    due_date: "",
  });

  let i = 1;

  const startEdit = (task) => {
    setEditRowId(task._id);
    setEditForm({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      due_date: task.due_date?.slice(0, 10),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (taskId) => {
    try {
      await api.put(`/api/task/${taskId}`, editForm);
      setEditRowId(null);
    } catch {
      alert("Failed to update task");
    }
  };

  const cancelEdit = () => {
    setEditRowId(null);
    setEditForm({
      title: "",
      description: "",
      status: "",
      priority: "",
      due_date: "",
    });
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-4 py-3">click</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3">Created By</th>
              <th className="px-4 py-3 text-center">Delete</th>
              <th className="px-4 py-3 text-center">Edit</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => {
              const isEditing = editRowId === item._id;

              return (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-4 py-3" onClick={() => setSelectedTask(item)}>{i++}</td>
                  <td className="px-4 py-3" onClick={() => setSelectedTask(item)}>
                    {isEditing ? (
                      <input
                        name="title"
                        value={editForm.title}
                        onChange={handleChange}
                        className="table-input"
                      />
                    ) : (
                      item.title
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        name="description"
                        value={editForm.description}
                        onChange={handleChange}
                        className="table-input"
                      />
                    ) : (
                      <span className="text-gray-600">{item.description}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <select
                        name="status"
                        value={editForm.status}
                        onChange={handleChange}
                        className="table-input"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    ) : (
                      <span className="status-badge">{item.status}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <select
                        name="priority"
                        value={editForm.priority}
                        onChange={handleChange}
                        className="table-input"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    ) : (
                      <span className="priority-badge">{item.priority}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        type="date"
                        name="due_date"
                        value={editForm.due_date}
                        onChange={handleChange}
                        className="table-input"
                      />
                    ) : (
                      new Date(item.due_date).toLocaleDateString()
                    )}
                  </td>
                  <td className="px-4 py-3">{item.user.name}</td>

                  <td className="px-4 py-3 text-center">
                    {!isEditing && (
                      <button
                        onClick={() => onDelete(item._id)}
                        className="text-red-500 hover:text-red-700 text-lg"
                      >
                        🗑️
                      </button>
                    )}
                  </td>

                  <td className="px-4 py-3 text-center space-x-2">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => saveEdit(item._id)}
                          className="text-green-600 hover:text-green-800 text-lg"
                        >
                          💾
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-gray-500 hover:text-black text-lg"
                        >
                          ❌
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => startEdit(item)}
                        className="text-blue-500 hover:text-blue-700 text-lg"
                      >
                        ✏️
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <ConfirmDelete
          onCancel={() => setDeleteId(null)}
          onConfirm={() => {
            onDelete(deleteId);
            setDeleteId(null);
          }}
        />
      )}

      {selectedTask && (
        <CardSubTask
          data={selectedTask.subtask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </>
  );
};

export default Record;
