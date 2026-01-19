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
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const nPages = Math.ceil(totalTasks / recordsPerPage);

  return (
    <section className="p-6 space-y-8">

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Stat label="Total Tasks" value={stats.total} color="bg-blue-600" />
        <Stat label="Active Tasks" value={stats.active} color="bg-amber-500" />
        <Stat label="Completed" value={stats.completed} color="bg-emerald-600" />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-5">
        <input
          name="search"
          value={filters.search}
          placeholder="🔍 Search by title..."
          className="w-full h-11 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <select className="filter-input" name="status" value={filters.status} onChange={handleChange}>
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <select className="filter-input" name="priority" value={filters.priority} onChange={handleChange}>
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="date" name="fromdate" value={filters.fromdate} onChange={handleChange} className="filter-input" />
          <input type="date" name="todate" value={filters.todate} onChange={handleChange} className="filter-input" />
        </div>
      </div>
      {tasks.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center text-gray-500 shadow-sm border">
          No tasks found
        </div>
      ) : (
        <>
          <Record data={tasks} onDelete={handleDelete} />
          <div className="flex justify-center pt-4">
            <Pegination
              nPages={nPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      )}
    </section>
  );
};

const Stat = ({ label, value, color }) => (
  <div className={`${color} rounded-2xl p-6 shadow-md flex items-center justify-between`}>
    <span className="text-white text-sm font-semibold uppercase tracking-wide">
      {label}
    </span>
    <span className="text-white text-3xl font-extrabold">
      {value}
    </span>
  </div>
);

export default TaskItem;
