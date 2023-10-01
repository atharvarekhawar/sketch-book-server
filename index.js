const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { log } = require("console");

const app = express();
app.use(cors({origin: 'http://localhost:3000'}))

const httpServer = createServer(app);

const io = new Server(httpServer,{cors:'http://localhost:3000'});

io.on("connection", (socket) => {
    console.log("server was connected ");
    socket.on('beginPath',(arg)=>{
        socket.broadcast.emit('beginPath',arg);
    });

    socket.on('drawLine',(arg)=>{
        socket.broadcast.emit('drawLine',arg);
    });

    socket.on('changeConfig',(arg)=>{
        socket.broadcast.emit('changeConfig',arg);
    });

    socket.on('menuItem',(arg)=>{
        socket.broadcast.emit('menuItem',arg);
    })

    socket.on('actionItem',(arg)=>{
        socket.broadcast.emit('actionItem',arg);
    })
});

httpServer.listen(5000);
