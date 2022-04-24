const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
    username: String,
    password: String
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;