import express from "express"
import cors  from 'cors'
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))


import userRoutes from "./routes/auth.route.ts";
import taskRoutes from "./routes/task.route.ts";
import { errorHandler } from "./utils/ApiError.ts";


app.use('/api/auth',userRoutes);
app.use('/api/task',taskRoutes);
app.use(errorHandler)

export { app }