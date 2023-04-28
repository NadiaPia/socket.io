import './App.css';
import io from "socket.io-client";
import {useEffect, useState} from "react";

const socket = io.connect("http://localhost:3001"); //connection with the BE

function App() {

  const [room, setRoom] = useState("");

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if(room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });  //socket.emit() - we send a message to the BE 
  };

  useEffect(() => { //will run every time any event is thrown to us on a socket.io server (when event is emited this function will run)
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
 
    return (
        <div className="App">
          <input onChange={(event) => {setRoom(event.target.value);}} placeholder="Room number..."/>
          <button onClick={joinRoom}>Join Room</button>


          <input onChange={(event) => {setMessage(event.target.value);}} placeholder="Message..."/>
          <button onClick={sendMessage}>Send Message</button>
          <h1>Message:{messageReceived}</h1>
            
        </div>
    );
}

export default App;
