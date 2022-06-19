const express = require('express');
const bp = require('body-parser');
const app = express();
const router = require('./server/routes/api.js');
const path = require("path");
const connectDB = require("./server/config/connectDB.js");

// 1. Create Database connection
connectDB();

// Middleware for accepting the body of an api request 
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

// Serve up static assets from build in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Define and connect to api Routes
app.use(router);

// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Listen for requests from the PORT
app.listen(process.env.PORT || 4000);