import express from "express"
import { authmiddleware } from "../middleware/auth.middleware.js";
import { createTask, deleteTask, getAllTask, getTask, getTaskStats, searchTask, updateTask } from "../controller/task.controller.js";

const router = express.Router();

router.route('/').post(authmiddleware,createTask);
router.route('/').get(authmiddleware,getAllTask);
router.route('/stats').get(authmiddleware,getTaskStats);
router.route('/search').get(authmiddleware,searchTask);
router.route('/:id').get(authmiddleware,getTask);
router.route('/:id').put(authmiddleware,updateTask);
router.route('/:id').delete(authmiddleware,deleteTask)



export default router;