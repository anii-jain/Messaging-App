// const io = require('socket.io')(8050)
// const cors = require("cors")
// io.use(cors({
//     origin: "*"
// }))
var express = require("express");
var app = express();
var http = require("http").createServer(app);
var socketIO = require("socket.io")(http, {
    cors: {
        origin: "*"
    }
});

const users = {};
http.listen(8050, function() {
socketIO.on('connection', socket=>{
    // console.log("aaaa");
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        // console.log("aa");
        // console.log(name);
        socket.broadcast.emit('user-joined', name);
    })

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
});
});