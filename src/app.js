require('dotenv').config();
const express = require("express");
const connectDB = require("./db/db");



const app = express();
connectDB();


module.exports = app;