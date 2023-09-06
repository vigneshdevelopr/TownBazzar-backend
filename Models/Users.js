import express from 'express'
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: 'string',
        required: true,
        unique: true

    },
    username:{
        type: 'string',
        required: true,
    },
    password:{
        type: 'string',
        required: true,
    },
    cart:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    }]
})


export const userModel = mongoose.model('users',userSchema);