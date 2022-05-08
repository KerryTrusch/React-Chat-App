const express = require("express");
const app = express();
var expressWs = require('express-ws')(app);
const cors = require("cors");
require("dotenv").config({path: "./config.env"});
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
const mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = process.env.ATLAS_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



app.listen(port, () =>  {

    console.log(`Server is running on port: ${port}`);
});