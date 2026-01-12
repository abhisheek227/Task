import React from 'react'

const TaskItem = () => {
    let stats = {
        total:47,
        active:20,
        completed:27
    }
    return (
        <div className="p-6 bg-gray-100 min-w-screen">
            <div className="flex justify-center gap-6 mt-4">
                <div className="bg-white px-4 py-2 rounded-lg shadow">
                    <span className="text-gray-600">Total: </span>
                    <span>{stats.total}</span>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow">
                    <span className="text-gray-600">Active: </span>
                    <span className="text-blue-600">{stats.active}</span>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow">
                    <span className="text-gray-600">Completed: </span>
                    <span className="text-green-600">{stats.completed}</span>
                </div>
            </div>
        </div>
    )
}

export default TaskItem