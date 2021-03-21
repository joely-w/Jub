// Requirements
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();

// Create server and start listening
const server = http.createServer(app);
let io = socketIO(server, {path: '/live/socket.io'});

class VideoChats {
    constructor(io) {
        this.io = io;
        const currentClass = this;
        this.activeSockets = [];
        this.io.on("connection", socket => {
            currentClass.listener(socket);
        });
        this.io.on("disconnect", socket => {
            currentClass.disconnect(socket);
        });
    }

    listener(socket) {
        const existingSocket = this.activeSockets.find(
            existingSocket => existingSocket.id === socket.id
        );

        if (!existingSocket) {
            this.activeSockets.push({id: socket.id, name: ""});
            socket.on('set name', name => {
                socket.name = name;
                const socketIndex = this.activeSockets.findIndex(x => x.id === socket.id);
                this.activeSockets[socketIndex].name = name;
                socket.broadcast.emit("update-user-list", {
                    users: [{id: socket.id, name: socket.name}]
                });
            });

            socket.emit("update-user-list", {
                users: this.activeSockets.filter(
                    existingSocket => existingSocket.id !== socket.id
                )
            });


        }
        socket.on('call-user', data => {
            socket.to(data.to).emit("call-made", {
                offer: data.offer,
                socket: socket.id
            })
        })
        socket.on('make-answer', data => {
            socket.to(data.to).emit("answer-made", {socket: socket.id, answer: data.answer});
        })

        socket.on('disconnect', () => {
            this.disconnect(socket);
        })
    }

    disconnect(socket) {
        this.activeSockets = this.activeSockets.filter(
            existingSocket => existingSocket.id !== socket.id
        );
        socket.broadcast.emit("remove-user", {socketId: socket.id});
    }
}

new VideoChats(io)
server.listen(3000, () => {
    console.log("Server started! 🚀")
})
