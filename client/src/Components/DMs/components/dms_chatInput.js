import React, { useState, useEffect } from "react";
import "./dms_chatInput.css";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { IconButton } from "@mui/material";

function Dms_chatInput({ currentUser, socket, room, setMessageList, activeDM }) {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        type: "DM",
        room: room,
        from: currentUser,
        user1: currentUser,
        user2: activeDM,
        text: currentMessage,
        date: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);

      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("oof");
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="dms_chatInput">
      <AttachFileIcon style={{ color: "gray", margin: "3.5vh" }} />
      <input
        className="dms__chatInput"
        placeholder="Type your message here"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />
      <IconButton onClick={sendMessage}>
        <SendIcon style={{ color: "gray", margin: "3.5vh" }} />
      </IconButton>
    </div>
  );
}

export default Dms_chatInput;
