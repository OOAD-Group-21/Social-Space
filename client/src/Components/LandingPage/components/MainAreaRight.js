import React, { useState } from "react";
import ChatArea from "./ChatArea";
import ChatCombined from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import "./MainAreaRight.css";

import io from "socket.io-client";

const socket = io.connect(process.env.REACT_PUBLIC_BACKEND_URL);

function MainAreaRight({ title, friend, index, notiList, setNotiList }) {
  const [username, setUsername] = useState("Aryan");
  const [room, setRoom] = useState("");
  const [messageList, setMessageList] = useState([]);

  const [css, setcss] = useState(false);

  return (
    <div className={css === false ? "landingPage__mainArea__right" : "landingPage__mainArea__right2"}>
      <ChatHeader title="Global Post Wall" setcss={setcss} css={css} />
      <ChatArea notiList={notiList} setNotiList={setNotiList} />

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
