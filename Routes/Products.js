    import express from 'express';
    import { prodModel } from '../Models/Products.js';
    import { userModel } from '../Models/Users.js';

    import razorpay from 'razorpay';
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

    router.post('/add',async(req,res)=>{

        try {
            const{title,price,description,category,image,rating}=req.body
            const prod =  new prodModel({
            title,
                price,
                description,
                category,
                image,
                rating
            })

    await prod.save();
    return res.status(200).json('New Product is added successfully')
        } catch (error) {
            console.log(error)
            return res.status(500).send('Internal Server Error')
            
        }
    })


    router.put('/cart',async(req,res)=>{
        try {
        const prod = await prodModel.findById(req.body.prodId)
        const user = await userModel.findById(req.body.userId)
        
        user.cart.push(prod);
        await user.save();
        console.log({cart: user.cart})
        return res.status(200).json({cart: user.cart})
        } catch (error) {
            console.log(error)
            return res.status(500).json({message: 'Internal server Error'})
        }
    })

    router.get('/cart/:userId',async(req,res)=>{
    try {
        const users = await userModel.findById(req.params.userId);
        console.log(users);
        const cartProdId =  users.cart.map(prod=>prod._id)
        const cartProd = await prodModel.find({_id: {$in: cartProdId}});
        return res.status(200).json(cartProd);
    } catch (error) {
    console.log(error)
    return res.status(500).send(error.message)
    }
    })


    router.delete('/cart/:userId/:productId',async(req,res)=>{
        try {
        const userId = req.params.userId;
        const productId = req.params.productId;
        
        const user = await userModel.findById(userId);

        if(!user){
            return res.status(404).json({message: 'user not found'})
        }

        user.cart=user.cart.filter((product)=>product._id.toString() !== productId);
        await user.save();
        return res.status(200).json({message: 'Product removed from your cart'})
        } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Internal Server Error'}) 
        }
    })


 



    export const ProdRouter = router;