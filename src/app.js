const express = require('express');
const cookie_parser = require('cookie-parser');
const registerRoute = require("./routes/auth.route");
const MusicRoute = require("./routes/music.route")


const app = express();
app.use(express.json());
app.use(cookie_parser());


app.use("/api/auth", registerRoute)
app.use("/api/music", MusicRoute);

module.exports = app;