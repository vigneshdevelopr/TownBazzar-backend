import express from "express";
import mongoose from "mongoose";
export function createConnection(){
    const params = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
      mongoose.connect(process.env.mongourl, params);
      console.log("Your Database has connected Successfully 🏆")  
    } catch (error) {
        console.log("Error occured during database connection");
    }
} 