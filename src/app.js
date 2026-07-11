const express = require('express');
const cookie_parser = require('cookie-parser');



const app = express();
app.use(express.json());
app.use(cookie_parser());

module.exports = app;