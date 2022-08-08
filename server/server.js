const express = require("express");
const app = module.exports = express();
const cors = require("cors");
require("dotenv").config({path: "./config.env"});
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));


app.listen(port, () =>  {

    console.log(`Server is running on port: ${port}`);
});