import React from "react";
import { useState, useEffect } from "react";
import "./MainAreaRight.css";
import ChatHeader from "./ChatHeader";
import ChatArea from "./ChatArea";
import ChatFooter from "./ChatFooter";
import axios from "axios";

import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function MainAreaRight({ title, friend }) {
  const [username, setUsername] = useState("Aryan");
  const [room, setRoom] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (friend !== "") {
      axios.get(`http://localhost:5000/user/${friend}`).then((response) => {
        console.log(response.data);
        setUsername(response.data.currentUser);
        setRoom(response.data.roomId);
        setMessageList(response.data.oldMessages);
        socket.emit("join_room", response.data.roomId);
      });
    }
  }, [friend]);

  return (
    <div className="mainArea__right">
      <ChatHeader title={title} />
      <ChatArea messageList={messageList} currentUser={username} />
      <ChatFooter currentUser={username} socket={socket} room={room} setMessageList={setMessageList} friend={friend} />
    </div>
  );
}

export default MainAreaRight;
