const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(" Connected to MongoDB");
    return mongoose.connection;
  } catch (err) {
    console.error(" Error connecting to MongoDB:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;