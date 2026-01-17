import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const createTask = async (req, res, next) => {
    try {
        if (!req.user || !req.user._id) {
            throw new ApiError(401, "Unauthorized")
        }

        const user_id = req.user._id;

        let { title, description, status, priority, due_date } = req.body;

        if (!title) {
            return next(new ApiError(400, "Title is required"))
        }

        if (!['pending', 'in_progress', 'completed'].includes(status)) {
            status = 'pending';
        }

        if (!['low', 'medium', 'high'].includes(priority)) {
            priority = 'low';
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            due_date,
            user: user_id
        });

        await User.findByIdAndUpdate(user_id, {
            $push: { tasks: task._id }
        });

        res.status(201).json({
            msg: "Task created successfully",
            task
        });

    } catch (error) {
        return next(new ApiError(500, error.message))
    }
};


const getTask = async (req, res, next) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!task) {
            return next(new ApiError(404, "Task not found"));
        }

        res.status(200).json({
            success: true,
            task,
        });
    } catch (error) {
        next(error);
    }
};

const getAllTask = async (req, res, next) => {
    try {
        const userId = req.user._id;

        const {
            sortBy = "createdAt",
            order = "desc",
            page = 1,
            limit = 10,
            fromdate,
            todate,
            priority,
            status,
            search
        } = req.query;

        const skip = (page - 1) * limit;

        const filter = { user: userId };

        if (search) {
            filter.title = { $regex: search, $options: "i" };
        }

        if (priority) {
            filter.priority = priority;
        }

        if (status) {
            filter.status = status;
        }

        if (fromdate || todate) {
            filter.createdAt = {};
            if (fromdate) filter.createdAt.$gte = new Date(fromdate);
            if (todate) filter.createdAt.$lte = new Date(todate);
        }

        const tasks = await Task.find(filter)
            .sort({ [sortBy]: order === "asc" ? 1 : -1 })
            .skip(skip)
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            data: tasks,
            page: Number(page),
            limit: Number(limit),
        });
    } catch (error) {
        next(error);
    }
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
            return next(new ApiError(400, "No fields provided to update"))
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
            task
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteTask = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return next(new ApiError(404, "Task not found"));
    }

    // Admin can delete any task, user only their own
    if (user.role !== "Admin" && task.user.toString() !== user._id.toString()) {
      return next(new ApiError(403, "Not allowed"));
    }

    await Task.findByIdAndDelete(task._id);

    res.status(200).json({
      success: true,
      msg: "Task deleted",
    });
  } catch (error) {
    next(error);
  }
};

const searchTask = async (req, res, next) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const tasks = await Task.find({
      user: req.user._id,
      title: { $regex: search, $options: "i" },
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

const getTaskStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const stats = await Task.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    let total = 0;
    let completed = 0;
    let active = 0;

    stats.forEach(item => {
      total += item.count;

      if (item._id === "completed") {
        completed = item.count;
      } else {
        active += item.count;
      }
    });

    res.status(200).json({
      success: true,
      stats: {
        total,
        active,
        completed
      }
    });
  } catch (error) {
    next(error);
  }
};


export { createTask, getTask, getAllTask, updateTask, deleteTask, searchTask, getTaskStats }