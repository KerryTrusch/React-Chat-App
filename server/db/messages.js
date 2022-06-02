const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
    id: String,
    body: String,
    timestamp: Number,
    author: {type: Schema.Types.ObjectId, ref: 'User'}
})


const messsageModel = mongoose.model("Message", messageSchema);

module.exports = messsageModel;