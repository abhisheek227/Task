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



export default router;
