const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const { connect } = require("./db")
const socketModel = require("./model/socketModel");

connect();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const socketRoutes = require("./router/rout");
app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded())

app.use("/api", socketRoutes);

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next();
});

var user = [];

io.on('connection', (socket) => {
    console.log('User connected: ' + socket.id);

    socket.on("disconnect", () => {
        console.log("user disconnect")
    });

    socket.on("message", (data) => {
        user[data] = socket.id;
        io.emit('message', data);
    });

    socket.on("send_message", async (data) => {
        var socketId = user[data.receiver];
        io.to(socketId).emit("new_message", data);

        const user = new socketModel({
            sender: data.sender,
            receiver: data.receiver,
            message: data.message,
        });

        //save in database
        const userdata = await user.save();
        console.log("userdata==>", userdata);
    });
});

server.listen(8000, () => {
    console.log('App running in port : 8000');
});