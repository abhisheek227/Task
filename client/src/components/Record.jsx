import React, { useState } from "react";
import api from "../api/axios";
import "../App.css";

const Record = ({ data, onDelete }) => {
    const [editRowId, setEditRowId] = useState(null);
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
        setEditForm({
            title: "",
            description: "",
            status: "",
            priority: "",
            due_date: "",
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const saveEdit = async (taskId) => {
        try {
            const res = await api.put(`/api/task/${taskId}`, editForm);

            alert("Task updated successfully");

            setEditRowId(null);
            window.location.reload(); // simplest way (can optimize later)
        } catch (err) {
            alert("Failed to update task");
        }
    };

    return (
        <table className="table border min-w-full">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Date</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
            </thead>

            <tbody>
                {data.map((item) => {
                    const isEditing = editRowId === item._id;

                    return (
                        <tr key={item._id}>
                            {/* TITLE */}
                            <td>
                                {isEditing ? (
                                    <input
                                        name="title"
                                        value={editForm.title}
                                        onChange={handleChange}
                                        className="border px-2"
                                    />
                                ) : (
                                    item.title
                                )}
                            </td>

                            {/* DESCRIPTION */}
                            <td>
                                {isEditing ? (
                                    <input
                                        name="description"
                                        value={editForm.description}
                                        onChange={handleChange}
                                        className="border px-2"
                                    />
                                ) : (
                                    item.description
                                )}
                            </td>

                            {/* STATUS */}
                            <td>
                                {isEditing ? (
                                    <select
                                        name="status"
                                        value={editForm.status}
                                        onChange={handleChange}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                ) : (
                                    item.status
                                )}
                            </td>

                            {/* PRIORITY */}
                            <td>
                                {isEditing ? (
                                    <select
                                        name="priority"
                                        value={editForm.priority}
                                        onChange={handleChange}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                ) : (
                                    item.priority
                                )}
                            </td>

                            {/* DATE */}
                            <td>
                                {isEditing ? (
                                    <input
                                        type="date"
                                        name="due_date"
                                        value={editForm.due_date}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    new Date(item.due_date).toLocaleDateString()
                                )}
                            </td>

                            {/* DELETE */}
                            <td>
                                {!isEditing && (
                                    <button onClick={() => onDelete(item._id)}>❌</button>
                                )}
                            </td>

                            {/* EDIT / SAVE */}
                            <td>
                                {isEditing ? (
                                    <>
                                        <button onClick={() => saveEdit(item._id)}>💾</button>
                                        <button onClick={cancelEdit}>❌</button>
                                    </>
                                ) : (
                                    <button onClick={() => startEdit(item)}>✏️</button>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Record;
