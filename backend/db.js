import app from "./server.js"
import mongoose from 'mongoose'
import dotenv from "dotenv"
const bodyParser = require('body-parser');
dotenv.config()


const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`MongoDB Connected : ${conn.connection.host}`);
    
    return conn;
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;