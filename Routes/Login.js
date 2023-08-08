import express from 'express';
import { userModel } from '../Models/Users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

// router.post('/',async(req,res)=>{
//     try {
//         const{email,username,password}=req.body 

//         const user = await userModel.findOne({email,username})
//         if(!user){
//             return res.status(404).json({message:"user not found"})
//         }else{
//             const ValidatePassword = await bcrypt.compare(password,user.password);
//             console.log(ValidatePassword);
//             if(!ValidatePassword){
//                 return res.status(401).json({message: 'Invalid Credentials'})
//             }
//             //genToken
    
//             const genToken = jwt.sign({id: user._id},process.env.SecretKey)
    
//             return res.status(200).json({message: 'Login Success',token: genToken,userId:user._id,user:user.username })
//         }
        
//     } catch (error) {
//         console.log(error.message);
//         return res.status(500).json("Internal Server Error", error.message);
//     }
// })

router.post('/',async(req, res)=>{
    const{email,username, password}=req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        const ValidatePassword = await bcrypt.compare(password, user.password)
        console.log(ValidatePassword);
        if(!ValidatePassword){
            return res.status(401).json({message: 'Invalid Credentials'});
        }
        //generate Token:
        const genToken = jwt.sign({id: user._id},process.env.SecretKey);
        return res.status(200).json({token: genToken, userID: user._id, user:user.username});
    } catch (error) {
        console.log(error.message)
        return res.status(500).json('Internal Server Error during Login process')
    }
    })


export const LoginRouter = router;