const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    wallet_address: { type: String, required: true },
    bid_id: { type: String, required: true },  
    bid_amount: { type: String, required: true },
    wallet_balance: { type: String, required: true },
});

module.exports = mongoose.model("wallet", dataSchema);