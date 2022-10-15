const express = require('express')
const app = express()
const http = require('http')
const moment = require('moment')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
app.use(express.static('public'))

io.on('connection', (socket) => {
    let username, roomname;
    socket.on('join', (message)=>{
        username = message.username;
        roomname = message.roomname;
        socket.join(roomname);
        console.log(`${username} connected in ${roomname}`);
        io.sockets.in(roomname).emit('connectToRoom', "You are in room " + roomname);
    })

    socket.on('message', (message) =>{
        io.sockets.in(roomname).emit('textMessage', {text: message, author: username, time:moment().format('h:mm a')  })
    })

    socket.on('disconnect', (message) =>{
        console.log(`${username} disconnected from ${roomname}`);
    })
});

server.listen(3000,'192.168.29.249')
