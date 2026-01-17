<<<<<<< HEAD:server/src/routes/task.route.ts
import express from 'express'
import { authmiddleware } from "../middleware/auth.middleware.ts";
import { createTask, deleteTask, getAllTask, getTask, searchTask, updateTask } from "../controller/task.controller.ts";
=======
import express from "express"
import { authmiddleware } from "../middleware/auth.middleware.js";
import { createTask, deleteTask, getAllTask, getTask, getTaskStats, searchTask, updateTask } from "../controller/task.controller.js";
>>>>>>> 3fe05514f2baae9185bc551931ab776e0bd80d3f:server/src/routes/task.route.js

const router = express.Router();

router.route('/').post(authmiddleware,createTask);
router.route('/').get(authmiddleware,getAllTask);
router.route('/stats').get(authmiddleware,getTaskStats);
router.route('/search').get(authmiddleware,searchTask);
router.route('/:id').get(authmiddleware,getTask);
router.route('/:id').put(authmiddleware,updateTask);
router.route('/:id').delete(authmiddleware,deleteTask)



export default router;