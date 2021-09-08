const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const videosRouter = require("./API/videos");
const usersRouter = require("./API/users");
const sessionsRouter = require("./API/sessions");

app.use(express.json());
mongoose.connect(
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false", 
    { useNewUrlParser: true }
);

app.use(cors("*"));
app.use(express.json());
app.use("/api", (videosRouter));
app.use("/api", (usersRouter));
app.use("/api", (sessionsRouter));


module.exports = app;