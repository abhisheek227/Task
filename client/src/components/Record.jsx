import React from 'react'
import '../App.css'
const Record = ({ data, onDelete, onEdit }) => {

    const handleDelete = async (taskId) => {
        if (!confirm("Are you sure you want to delete this task?")) return;
        
        try {
            const token = localStorage.getItem("accessToken");

            const response = await fetch(`http://localhost:5000/api/task/${taskId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const responseData = await response.json();
                alert(responseData.message || "Failed to delete task");
                return;
            }
            if (onDelete) onDelete(taskId);
            alert("Task deleted successfully!");
        } catch (err) {
            alert(err.message);
        }
    };

    const handleEdit = (task) => {
        
        if (onEdit) onEdit(task);
    };

    return (
        <div>
            <table className="table border p-5 min-w-full" >
                <thead>
                    <tr>
                        <th scope='col' className='w-1/7 items-center text-center p-1 m-3'>Title</th>
                        <th scope='col' className='w-1/7 items-center text-center p-1 m-3'>Description</th>
                        <th scope='col' className='w-1/7 items-center text-center p-1 m-3'>Status</th>
                        <th scope='col' className='w-1/7 items-center text-center p-1 m-3'>Priority</th>
                        <th scope='col' className='w-1/7 items-center text-center p-1 m-3'>Date</th>
                        <th scope='col' className='w-1/7 items-center text-center p-1 m-3'>Delete</th>
                        <th scope='col' className='w-1/7 items-center text-center p-1 m-3'>Edit</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item._id}>
                            <td>{item.title} </td>
                            <td>{item.description} </td>
                            <td>{item.status} </td>
                            <td>{item.priority} </td>
                            <td>{new Date(item.due_date).toLocaleDateString()} </td>
                            <td onClick={()=>handleDelete(item._id)} style={{cursor: 'pointer'}}>❌</td>
                            <td onClick={()=>handleEdit(item)} style={{cursor: 'pointer'}}>✏️</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Record