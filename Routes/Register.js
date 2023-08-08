import express from 'express'
import { userModel } from '../Models/Users.js';
import bcrypt, { hash } from 'bcrypt';

const router = express.Router();

router.get('/',(req,res)=>{
return res.status(200).send('welcome to users of townbazzar')
})
//addUser:
router.post('/add',async(req,res)=>{
    const{email,username,password}=req.body;
    const userRegister = await userModel.findOne({email});
   try {
    
    if(userRegister){
        return res.status(409).send('User already Exists !');
    }else{
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password,salt);
        console.log("password:", hashpassword);
const newUser = new userModel({
    email,
    username,
    password: hashpassword
})
await newUser.save();
console.log(newUser);
return res.status(200).json(`Hey ${username}, welcome to Town Bazzar Family`)
    }

   } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Server Error", error.message);
   }
})


export const Register = router;