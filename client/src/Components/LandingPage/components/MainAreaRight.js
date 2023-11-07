import React from "react";
import { useState, useEffect } from "react";
import "./MainAreaRight.css";
import ChatHeader from "./ChatHeader";
import ChatArea from "./ChatArea";
import ChatCombined from "./ChatFooter";
import axios from "axios";

import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function MainAreaRight({ title, friend, index, notiList, setNotiList }) {
  const [username, setUsername] = useState("Aryan");
  const [room, setRoom] = useState("");
  const [messageList, setMessageList] = useState([]);

  const [css, setcss] = useState(false);
  // return( index=== 0?
  //   <div className="mainArea__right">
  //     <h4>welcome to Social-space</h4>
  //   </div>
  //   :
  return (
    <div className={css === false ? "landingPage__mainArea__right" : "landingPage__mainArea__right2"}>
      <ChatHeader title="Global Post Wall" setcss={setcss} css={css} />
      <ChatArea notiList={notiList} setNotiList={setNotiList} />
      {/* <ChatArea messageList={messageList} currentUser={currentUser} />
      <ChatFooter
        currentUser={currentUser}
        socket={socket}
        room={room}
        setMessageList={setMessageList}
        friend={friend}
      /> */}

      <ChatCombined
        socket={socket}
        room={room}
        messageList={messageList}
        setMessageList={setMessageList}
        currentUser={username}
      />
    </div>
  );
}

export default MainAreaRight;
