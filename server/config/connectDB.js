const mongoose = require("mongoose");
require('dotenv').config();

// Configures whether the mongo environment will be
// a local db or one hosted by mongos live servers
const dbConfig = process.env.MONGODB_URI;

async function connectDB(){
  await mongoose.connect(dbConfig,{
      useNewUrlParser: true,
      useUnifiedTopology: true  
  }, () =>  
  console.log("Connected to DB")
);
}

module.exports = connectDB;