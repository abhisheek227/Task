import express from "express"
import cors  from 'cors'
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))


import userRoutes from "./routes/auth.route.js";
import taskRoutes from "./routes/task.route.js";
import { errorHandler } from "./utils/ApiError.js";


app.use('/api/auth',userRoutes);
app.use('/api/task',taskRoutes);
app.use(errorHandler)

export { app }