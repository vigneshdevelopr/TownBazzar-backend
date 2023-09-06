import mongoose from 'mongoose';

const prodSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    price:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    category:{
        type:String,
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