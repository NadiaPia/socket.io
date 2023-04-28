const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",  //connection with the FE
        methods: ["GET", "POST"],
    },
});

//Starting listening some events coming from the FE:

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`); //User connected: O47tlsRvDakptmhtAAAJ - every time after user come in website

    socket.on("send_message", (data) => {  //it is listening the event called "send_message" and this event will contain some data
        //console.log(data); //we want to emit this data to everyone, who is connected to this server, but not yourself
        socket.broadcast.emit("receive_message", data); //broadcast allows us to sent data anyone but 
        //yourself. We will listening to this in the FE so that we can receive all the messages that were emited by other people.
    });

}); //.on means listening for the event, "connection" - the type of the event. There is a 
//user, who is connecting to the server, like someone opens the webside and going to the 
//client, then this code will emmediatelly start running.

//socket variable that we can get from there, give us a lot of
// info: f.e we can console.log when the user is connecting


server.listen(3001, () => {
    console.log("SERVER IS RUNNING ON PORT 3001");
});