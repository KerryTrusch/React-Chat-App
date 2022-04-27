const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: String,
    authid: Number,
    username: String,
    password: String,
    servers: [Number]
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;