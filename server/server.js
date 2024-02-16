const express = require("express");
const app = express();

const mongoose = require('mongoose');
const config = require('./config/dbconfig');

app.listen(9000, () => {
    console.log("server is running in port 9000")
})

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));