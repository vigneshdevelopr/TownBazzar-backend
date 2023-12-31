import express from "express";
import dotenv from 'dotenv';
import { createConnection } from "./Database/MongoDB.js";
import { Register } from "./Routes/Register.js";
import cors from 'cors'
import { LoginRouter } from "./Routes/Login.js";
import { ProdRouter } from "./Routes/Products.js";
import { PaymentRouter } from "./Routes/Razorpay.js";
dotenv.config();
const app = express();

const PORT = process.env.PORT


createConnection();

app.use(express.json());
app.use(cors());     
app.use('/users',Register)
app.use('/signin',LoginRouter)
app.use('/products',ProdRouter)


app.get('/',(req,res)=>{
return res.status(200).json("Hey You Offically entered to access Town_Bazzar Database Backend Server")
})

app.listen(PORT,'0.0.0.0',()=>{
    console.log(`Your Server has running on localhost ${PORT}`)
})