import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <TaskItem />
      <TaskForm />
    </div>
  );
};

export default Dashboard;
