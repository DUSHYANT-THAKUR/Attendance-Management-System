import "./ChatWithUs.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import Chat from "./Chat";
const socket = io.connect("http://localhost:9241");

function ChatWithUs() {
  const [username, setUsername] = useState("admin");
  const [room, setRoom] = useState("1");
  const [showChat, setShowChat] = useState(true);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
useEffect(()=>
{
  joinRoom();
},[username])
  return (
    <div className="App">
        <Chat socket={socket} username={username} room={room} />
        </div>

  );
}

export default ChatWithUs;
