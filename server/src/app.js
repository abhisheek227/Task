import express from "express"
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))


import userRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";
import subTaskRoute from "./routes/subTask.route.js";
import { errorHandler } from "./utils/ApiError.js";


app.use('/api/auth', userRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/subTask', subTaskRoute);
app.use(errorHandler)

export { app }