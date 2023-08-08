import express from 'express';
import { prodModel } from '../Models/Products.js';


const router = express.Router();



router.get('/',async(req,res)=>{
    try {
        const data = await prodModel.find()
        // console.log(data)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error.message)
        return res.status(500).send("Internal Server Error")
    }
})

export const ProdRouter = router;