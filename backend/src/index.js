import dotenv from 'dotenv'
import authRoutes from './routes/authRoute.js'
import messageRoutes from './routes/messageRoutes.js'
import cookieParser from 'cookie-parser'
import { connectDB } from './lib/db.js'
import cors from 'cors'
import express from 'express'
import path from "path"
dotenv.config()
import { app,server } from './lib/socket.js'
const PORT=process.env.PORT||5000
const __dirname=path.resolve();
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes)
if(process.env.NODE_ENV==="product")
{
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

server.listen(PORT,()=>{

    console.log(`Server is listening on port number ${PORT} `)
        connectDB();

})