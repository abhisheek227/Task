import React, { useEffect, useState } from "react";
import api from "../api/axios";
import Record from "./Record";
import Pegination from "./Pegination";

const TaskItem = ({ refresh, onTaskDelted }) => {
  const [tasks, setTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState(0);

  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0 });

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    fromdate: "",
    todate: "",
    search: "",
  });

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search);
      setCurrentPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [filters.search]);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const query = Object.fromEntries(
          Object.entries({
            ...filters,
            search: debouncedSearch,
            page: currentPage,
            limit: recordsPerPage,
          }).filter(([, v]) => v)
        );

        const res = await api.get("/api/task", { params: query });

        setTasks(res.data.data || []);
        setTotalTasks(res.data.total || 0);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };

    fetchTasks();
  }, [filters, debouncedSearch, refresh, currentPage]);

  
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


  const handleDelete = async (taskId) => {
    await api.delete(`/api/task/${taskId}`);

    if (tasks.length === 1 && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else {
      onTaskDelted?.();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fromdate" || name === "todate") {
      setFilters(prev => ({ ...prev, [name]: value }));
      setCurrentPage(1);
      return;
    }

    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const nPages = Math.ceil(totalTasks / recordsPerPage);

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

        <div className="flex gap-4">
          <input type="date" name="fromdate" value={filters.fromdate} onChange={handleChange} />
          <input type="date" name="todate" value={filters.todate} onChange={handleChange} />
        </div>
      </div>

      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found</p>
      ) : (
        <>
          <Record data={tasks} onDelete={handleDelete} />
          <Pegination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
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
