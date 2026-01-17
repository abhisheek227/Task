import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Record from "./Record";
import Pegination from "./Pegination";

const TaskItem = ({ refresh }) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0 });
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    fromdate: "",
    todate: "",
    search: "",
  });
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(filters.search), 400);
    return () => clearTimeout(timer);
  }, [filters.search]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const query = Object.fromEntries(
          Object.entries({ ...filters, search: debouncedSearch }).filter(
            ([, v]) => v
          )
        );

        const res = await api.get("/api/task", { params: query });
        setTasks(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };

    fetchTasks();
  }, [filters, debouncedSearch, refresh]);

  const endIndex = currentPage * recordsPerPage;
  const indexOfFirstRecord = endIndex - recordsPerPage;
  const currentRecords = tasks.slice(indexOfFirstRecord, endIndex);
  const nPages = Math.ceil(tasks.length / recordsPerPage)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/task/stats");
        setStats(res.data.stats);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    };

    fetchStats();
  }, [refresh]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
  };

  const handleEdit = (task) => {
    // Scroll to TaskForm or open edit modal
    // This can be expanded based on your needs
    console.log("Editing task:", task);
  };

  return (
    <div className="p-6 bg-gray-100">

 
      <div className="flex justify-center gap-6 mb-6">
        <Stat label="Total" value={stats.total} />
        <Stat label="Active" value={stats.active} color="text-blue-600" />
        <Stat label="Completed" value={stats.completed} color="text-green-600" />
      </div>

      <div className="bg-white p-4 rounded shadow space-y-4 mb-6">
        <input
          name="search"
          value={filters.search}
          placeholder="Search by title"
          className="w-full border px-3 py-2"
          onChange={handleChange}
        />

        <div className="flex gap-4">
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            className="border px-3 py-2 flex-1"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select
            name="priority"
            value={filters.priority}
            onChange={handleChange}
            className="border px-3 py-2 flex-1"
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>


      <div className="space-y-3">
        {tasks.length === 0 && (
          <p className="text-center text-gray-500">No tasks found</p>
        )}

        <Record data={currentRecords} onDelete={handleDelete} onEdit={handleEdit} />
        <Pegination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

const Stat = ({ label, value, color = "" }) => (
  <div className="bg-white px-4 py-2 rounded shadow">
    <span className="text-gray-600">{label}: </span>
    <span className={color}>{value}</span>
  </div>
);

export default TaskItem;
