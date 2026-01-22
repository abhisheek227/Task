import express from 'express'
import Task from '../models/task.model.js';

const router = express.Router()

router.route("/:subtaskId").put(async (req, res) => {
    try {
        const { subtaskId } = req.params;
        const { isCompleted } = req.body;

        const updatedTask = await Task.findOneAndUpdate(
            { "subtask._id": subtaskId },
            { $set: { "subtask.$.isCompleted": isCompleted } },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Subtask not found",
            });
        }

        res.json({
            success: true,
            message: "Subtask updated successfully",
            data: updatedTask,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
});

router.post("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { subtask } = req.body;

    if (!Array.isArray(subtask) || subtask.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Subtask array is required",
      });
    }

    const formattedSubtasks = subtask.map(item => ({
      data: item.data,
      isCompleted: false,
    }));

    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        $push: { subtask: { $each: formattedSubtasks } },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Subtasks added successfully",
      data: task,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


export default router;
