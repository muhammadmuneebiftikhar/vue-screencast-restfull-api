const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const videosRouter = require("./API/videos");

mongoose.connect(
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false", 
    { useNewUrlParser: true }
);

app.use(cors("*"));
app.use(express.json());
app.use("/api", (videosRouter));


module.exports = app;