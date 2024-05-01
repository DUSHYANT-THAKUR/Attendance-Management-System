

const express = require('express');
const app = express();
const port = 9241;
const config = require('./config/config.js');
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

  
app.use(express.urlencoded())
app.use(express.json())
// const settelmentRoute = require('./route/settelmentRoute')
// Cors error
// app.use(cors({origin:["http://localhost:3000", "http://localhost:3002"]}));
app.use(cors())
const server = http.createServer(app);
// routing
app.use(express.static('public'))
app.use(require('./route/route'));
app.use(require('./routeMerchant/route'));

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

io.on("connection", (socket) => {
    // console.log(`User Connected: ${socket.id}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    socket.on("send_message", (data) => {
      console.log(data)
      socket.to(data.room).emit("receive_message", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });
// run website
server.listen(port, (req, res) =>{
    console.log('http://' + config.DB_HOST + ':' + port);
});


