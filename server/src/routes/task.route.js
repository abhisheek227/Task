import express from "express"
import { authmiddleware } from "../middleware/auth.middleware.js";
import { createTask, deleteTask, downloadFile, getAllTask, getTask, getTaskStats, searchTask, updateTask } from "../controller/task.controller.js";
import { data } from "../services/mail.services.js";
import { upload } from "../services/upload.services.js";

const router = express.Router();

router.route('/files/:id').get(authmiddleware, downloadFile);
router.route('/email').get(data)
router.route('/').post(authmiddleware,upload.single('attachment'),createTask);
router.route('/').get(authmiddleware,getAllTask);
router.route('/stats').get(authmiddleware,getTaskStats);
router.route('/search').get(authmiddleware,searchTask);
router.route('/:id').get(authmiddleware,getTask);
router.route('/:id').put(authmiddleware,updateTask);
router.route('/:id').delete(authmiddleware,deleteTask)



export default router;