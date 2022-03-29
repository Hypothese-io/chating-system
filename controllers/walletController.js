const express = require('express');
const app = express();
const walletModel = require('../model/walletModel');

exports.getWalletDetails = async (req, res) => {
    // Check Wallet

    let data = await walletModel.find({});
    console.log("data==>", data);
    outputJson = { code: 200, status: "Success", message: 'Get Wallet Data Success', result: data };
    res.json(outputJson);
}

exports.insertWalletDetails = async (req, res) => {
    // New Wallet

    const user = new walletModel({
        wallet_address: req.body.wallet_address,
        bid_id: req.body.bid_id,
        bid_amount: req.body.bid_amount,
        wallet_balance: req.body.wallet_balance,
    });

    const userdata = await user.save();
    outputJson = { code: 200, status: "Success", message: 'Insert Wallet Data Success', result: userdata };
    res.json(outputJson);
}

exports.updateWalletDetails = async (req, res) => {
    // Check Wallet

    var postData = req.body;

    let wallet_balance = postData.wallet_balance;
    let bid_amount = postData.bid_amount;
    let total_amount = Number(wallet_balance - bid_amount);

    let where_user = { wallet_address: postData.wallet_address }
    let result_user = await walletModel.findOne(where_user);

    if (result_user != null && result_user != '') {
        const data = await walletModel.findOneAndUpdate(
            { wallet_address: postData.wallet_address },
            {
                //bid_amount: bid_amount,
                wallet_balance: total_amount,
            },
        );
        outputJson = { code: 200, status: "Success", message: 'Wallet Update Successfully' };
        res.json(outputJson);
    }
    else {
        outputJson = { code: 400, status: "faild", message: 'Wallet Update Faild' };
        res.json(outputJson);
    }
}

exports.singleWalletDetails = async (req, res) => {
    // Check Wallet

    var postData = req.body;

    let where_user = { wallet_address: postData.wallet_address }
    let result_user = await walletModel.findOne(where_user);

    if(result_user != null && result_user != '')
    {
        outputJson = {code: 200, status: "Success", message: 'Wallet Available',result:result_user};
        res.json(outputJson);
    }
    else
    {
        outputJson = {code: 400, status: "faild", message: 'Wallet Not Available'};
        res.json(outputJson);
    }
}