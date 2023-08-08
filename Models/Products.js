import mongoose from 'mongoose';

const prodSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true,
    },
    title:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required: true
    },
    image:{
        type:String,
        required: true
    },
    rating:{
        type:Array
    }
})
export const prodModel = mongoose.model('products',prodSchema);