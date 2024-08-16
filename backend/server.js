import bcrypt from 'bcrypt'
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import mysql from 'mysql2'
import { config } from 'dotenv'
import userRouter from '../backend/routes/users.js'

config()
const app = express()
const PORT = process.env.PORT

const corsOptions = {
    origin: "http://localhost:8080"
    //   origin: "mycapstone-27eaa.firebaseapp.com"
}

app.use(cors(corsOptions))

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ msg: "Welcome to my application" });
});

app.use('/users', userRouter)

app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
    
})