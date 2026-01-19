import { useState } from "react";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

const Dashboard = () => {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <TaskItem refresh={refresh} onTaskDelted={() => setRefresh(r => r + 1)} />
      <TaskForm onTaskCreated={() => setRefresh(r => r + 1)} />
    </div>
  );
};

export default Dashboard;
