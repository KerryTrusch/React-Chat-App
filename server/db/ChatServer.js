const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serverSchema = new Schema({
    _id: Schema.Types.ObjectId,
    id: String,
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    src: String,
    name: String
});

const serverModel = mongoose.model("Server", serverSchema);

module.exports = serverModel;