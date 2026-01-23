import { useState } from "react";
import api from "../api/axios";

const CardSubTask = ({ data = [], onClose, fileRedirect }) => {
    const [editRowId, setEditRowId] = useState(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const [fileRoute] = useState(fileRedirect);

    console.log(fileRoute);


    const completedCount = data.filter(
        (subtask) => subtask.isCompleted
    ).length;

    const totalTask = data.length;

    const percentage =
        totalTask > 0 ? (completedCount / totalTask) * 100 : 0;

    const startEdit = (subtask) => {
        setEditRowId(subtask._id);
        setIsCompleted(subtask.isCompleted);
    };

    const saveEdit = async (subtaskId) => {
        try {
            await api.put(`/api/subtask/${subtaskId}`, {
                isCompleted,
            });
            setEditRowId(null);
        } catch {
            alert("Failed to update subtask");
        }
    };

    const cancelEdit = () => {
        setEditRowId(null);
        setIsCompleted(false);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-sm"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Sub Tasks
                </h3>

                <button
                    className="absolute top-3 right-3 text-xl"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="space-y-2">
                    {data.length === 0 ? (
                        <p className="text-sm text-gray-600">
                            No subtasks available.
                        </p>
                    ) : (
                        data.map((subtask) => {
                            const isEditing = editRowId === subtask._id;

                            return (
                                <div
                                    key={subtask._id}
                                    className="flex items-center justify-between p-2 bg-gray-100 rounded"
                                >
                                    <span className="text-sm">{subtask.data}</span>

                                    {isEditing ? (
                                        <select
                                            value={isCompleted ? "true" : "false"}
                                            onChange={(e) =>
                                                setIsCompleted(e.target.value === "true")
                                            }
                                            className="text-xs border rounded px-1"
                                        >
                                            <option value="false">Pending</option>
                                            <option value="true">Completed</option>
                                        </select>
                                    ) : (
                                        <span className="text-xs text-gray-500">
                                            {subtask.isCompleted ? "Completed" : "Pending"}
                                        </span>
                                    )}

                                    {isEditing ? (
                                        <>
                                            <button
                                                onClick={() => saveEdit(subtask._id)}
                                                className="text-green-600 text-lg"
                                            >
                                                💾
                                            </button>
                                            <button
                                                onClick={cancelEdit}
                                                className="text-gray-500 text-lg"
                                            >
                                                ❌
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => startEdit(subtask)}
                                            className="text-blue-500 text-lg"
                                        >
                                            ✏️
                                        </button>
                                    )}
                                </div>
                            );
                        })
                    )}

                    {/* Progress Bar */}
                    {totalTask > 0 ?
                        <div className="mt-4">
                            <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
                                <div
                                    className="h-full bg-green-500 transition-all duration-300"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                                {completedCount} / {totalTask} completed
                            </p>
                        </div> : ""}

                    {fileRoute && (
                        <a
                            href={`http://localhost:5000/${fileRoute}`}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-green-500 flex items-center justify-center rounded-3xl py-2 mt-3"
                        >
                            <span className="font-sans text-white font-semibold">
                                View Attachment
                            </span>
                        </a>
                    )}

                </div>
            </div>
        </div>
    );
};

export default CardSubTask;
