import React, { useState } from "react";
import api from "../api/axios";
import ConfirmDelete from "./ConfirmDelete";

const Record = ({ data, onDelete }) => {
  const [editRowId, setEditRowId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    due_date: "",
  });

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

  const cancelEdit = () => {
    setEditRowId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async (taskId) => {
    try {
      await api.put(`/api/task/${taskId}`, editForm);
      alert("Task updated successfully");
      setEditRowId(null);
    } catch {
      alert("Failed to update task");
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
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
                <tr key={item._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">
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

                  <td className="px-4 py-3">{item.description}</td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3">{item.priority}</td>
                  <td className="px-4 py-3">
                    {new Date(item.due_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{item.user.email}</td>

                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => setDeleteId(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </td>

                  <td className="px-4 py-3 text-center">
                    {isEditing ? (
                      <>
                        <button
                          onClick={() => saveEdit(item._id)}
                          className="text-green-600"
                        >
                          💾
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="text-gray-500 ml-2"
                        >
                          ❌
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => startEdit(item)}
                        className="text-blue-500"
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
    </>
  );
};

export default Record;
