const express = require('express');
const router  = express.Router();
const socketController = require('../controllers/socketController');
//var userModel      = require('../../model/others/User');
const walletController = require('../controllers/walletController');

router.post('/get_messages', socketController.get_messages);
router.post('/get_wallet_details', walletController.getWalletDetails);
router.post('/insert_wallet_details', walletController.insertWalletDetails);
router.post('/update_wallet_details', walletController.updateWalletDetails);
router.post('/single_wallet_details', walletController.singleWalletDetails);

module.exports = router; 