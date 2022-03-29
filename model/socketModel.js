const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    sender: { type: String },
    receiver: { type: String },  
    message: { type: String },
});

module.exports = mongoose.model("socketdata", dataSchema);