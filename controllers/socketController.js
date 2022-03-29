const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });
const mysql = require("mysql");

const connection = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "web_chat"
});

exports.get_messages = async (req, res) => {
    //try {
        console.log("enter api");
        console.log("req11==>",req.body.sender);
        console.log("req22==>",req.body.receiver);
        //res.JSON({status:200, sender:req.body.sender, receiver:req.body.receiver})
        connection.query("SELECT * FROM message WHERE (sender = '" + req.body.sender + "' AND receiver = '" + req.body.receiver + "') OR (sender = '" + req.body.receiver + "' AND receiver = '" + req.body.sender + "')", function (error, message) {
            res.end(JSON.stringify(message));
        });
    //}
    //catch {
        //socket.on("disconnect", () => {
         //   console.log("user disconnect")
       // });
    //}

};