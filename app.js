const express = require('express');
const app = express();
const http = require('http');
const mongoose = require("mongoose");
const cors     = require("cors");
//const path  = require('path');

// Connect to db

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true, 
  useUnifiedTopology: true 
  },(err) => {
    if(err) {
      console.log('connection err', err);
    } else {
      console.log('Database connected');
    }
});

// import routes
//const userRoutes     = require("./routes/others/user");

app.use(express.json());
app.use(cors());
app.use("/api/user",userRoutes);

//app.use('/public/', express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('App running in port : 3000');
});
