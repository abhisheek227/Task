import Task from "../models/task.model.ts";
import User from "../models/user.model.ts";
import { ApiError } from "../utils/ApiError.ts";

const createTask = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      throw new ApiError(401, "Unauthorized");
    }

    const user_id = req.user._id;

    let { title, description, status, priority, due_date } = req.body;

    if (!title) {
      return next(new ApiError(400, "Title is required"));
    }

    if (!["pending", "in_progress", "completed"].includes(status)) {
      status = "pending";
    }

    if (!["low", "medium", "high"].includes(priority)) {
      priority = "low";
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      due_date,
      user: user_id,
    });

    await User.findByIdAndUpdate(user_id, {
      $push: { tasks: task._id },
    });

    res.status(201).json({
      msg: "Task created successfully",
      task,
    });
  } catch (error) {
    return next(new ApiError(500, error.message));
  }
};

const getTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user._id;

  const user = await User.findOne({ _id: userId });
  if (!user) {
    return next(new ApiError(404, "User is not exist"));
  }

  if (user.tasks.length === 0) {
    return next(new ApiError(404, "Task not found for this user"));
  }

  const task = await Task.findById(taskId);

  if (!task) {
    // return res.status(404).json({ message: "Task does not exist" });
    return next(new ApiError(404, "Task does not exist"));
  }

  res.status(200).json({
    success: true,
    msg: "Task found",
    task,
  });
};

const getAllTask = async (req, res, next) => {
  const user = req.user._id;

  const sortBy = req.query.sortBy || "";
  const sortOrder = req.query.order === "asc" ? 1 : -1;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const fromDate = req.query.fromdate;
  const toDate = req.query.todate;
  const skip = (page - 1) * limit;
  const priority = req.query.priority;
  const search = req.query.search;

  const filter = {
    user: user,
  };

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }

  if (priority) {
    filter.priority = priority;
  }

  if (fromDate || toDate) {
    filter.createdAt = {};

    if (fromDate) {
      filter.createdAt.$gte = new Date(fromDate);
    }

    if (toDate) {
      const endDate = new Date(toDate);
      filter.createdAt.$lte = endDate;
    }
  }

  const data = await Task.find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    data,
    success: true,
    mes: "Data is fetched",
    page,
    limit,
    sortBy,
    sortOrder: sortOrder === 1 ? "asc" : "desc",
  });
};

const updateTask = async (req, res) => {
  try {
    const { title, description, status, priority, due_date } = req.body;

    const updated = {};

    if (title !== undefined) updated.title = title;
    if (description !== undefined) updated.description = description;
    if (status !== undefined) updated.status = status;
    if (priority !== undefined) updated.priority = priority;
    if (due_date !== undefined) updated.due_date = due_date;

    if (Object.keys(updated).length === 0) {
      return next(new ApiError(400, "No fields provided to update"));
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: updated },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.status(200).json({
      msg: "Task updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res, next) => {
  const id = req.user.id;
  const userid = req.user._id;
  const user = await User.find(userid);
  const isAdmin = user.role;
  if (isAdmin === "Admin") {
    const delted = await Task.findByIdAndDelete(id);
    if (!delted) {
      res.status(400).json({
        msg: "error while delteing ",
      });
    }

    res.status(200).json({
      msg: "Delteted",
      delted,
    });
  } else {
    return next(new ApiError(400, "Only Admin can delete this "));
  }
};
const searchTask = async (req, res) => {
  try {
    const search = req.query.search || "";
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 10;

    const tasks = await Task.find({
      title: { $regex: search, $options: "i" },
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
};

export { createTask, getTask, getAllTask, updateTask, deleteTask, searchTask };
