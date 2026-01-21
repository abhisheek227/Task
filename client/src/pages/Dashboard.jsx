import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import { AuthContext } from "../context/context";
import useAuthCheck from "../hooks/useAuthCheck";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(0);
  const [todo, setTodo] = useState(false);

  return (
    <div className="bg-blue-900 min-h-screen relative">
      <Header />

      <div className="p-4">
        <button
          className="rounded bg-white px-6 py-3 font-semibold hover:bg-gray-200 transition"
          onClick={() => setTodo(true)}
        >
          Add Tasks
        </button>
      </div>

      <TaskItem
        refresh={refresh}
        onTaskDelted={() => setRefresh(r => r + 1)}
      />


      {todo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md"
          onClick={() => setTodo(false)}
        >
          <div
            className="relative bg-white rounded-xl shadow-2xl p-6 w-[90%] max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-black"
              onClick={() => setTodo(false)}
            >
              ×
            </button>

            <TaskForm
              onTaskAdded={() => {
                setRefresh(r => r + 1);
                setTodo(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
