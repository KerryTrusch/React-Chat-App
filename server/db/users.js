const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    id: String,
    authid: Number,
    username: String,
    password: String,
    servers: [{type: Schema.Types.ObjectId, ref: 'Server'}]
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;