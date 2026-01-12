import express from 'express'
import { authmiddleware } from "../middleware/auth.middleware.ts";
import { createTask, deleteTask, getAllTask, getTask, searchTask, updateTask } from "../controller/task.controller.ts";

const router = express.Router();

router.route('/').post(authmiddleware,createTask);
router.route('/').get(authmiddleware,getAllTask);
router.route('/search').get(authmiddleware,searchTask);
router.route('/:id').get(authmiddleware,getTask);
router.route('/:id').put(authmiddleware,updateTask);
router.route('/:id').delete(authmiddleware,deleteTask)



export default router;