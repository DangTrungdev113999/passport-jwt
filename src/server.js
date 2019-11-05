const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const server = express();
const port = 3000 || process.env.PORT;

const authAPI  = require("./api/auth/route");

const passport = require('passport');

require('./config/passport/local');

mongoose.connect('mongodb://localhost/passport_jwt_practice', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())


server.use("/api/v1/auth", authAPI);


server.listen(port, () => console.log(`Example app listening on port port!`))