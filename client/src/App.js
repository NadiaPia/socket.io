import './App.css';
import io from "socket.io-client";
import {useEffect, useState} from "react";

const socket = io.connect("http://localhost:3001"); //connection with the BE

function App() {

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message });  //socket.emit() - we send a message to the BE 
  };

  useEffect(() => { //will run every time any event is thrown to us on a socket.io server (when event is emited this function will run)
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
 
    return (
        <div className="App">
          <input onChange={(event) => {setMessage(event.target.value);}} placeholder="Message..."/>
          <button onClick={sendMessage}>Send Message</button>
          <h1>Message:{messageReceived}</h1>
            
        </div>
    );
}

export default App;
