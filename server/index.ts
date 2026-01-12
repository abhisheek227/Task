import dotenv from "dotenv";
import { app } from './src/app.ts'
import { connectDb } from './src/config/db.ts';

dotenv.config({
    path:'.env'
})

const port = process.env.PORT || 5000; 

connectDb()
    .then(()=>{
        app.listen(port,()=>{
            console.log(`Server is running https://localhost:${port}`);
            
        })
    })
