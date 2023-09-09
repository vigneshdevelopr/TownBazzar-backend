import express from 'express'
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true

    },
    username:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }]
})


export const userModel = mongoose.model('users',userSchema);