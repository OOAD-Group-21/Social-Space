import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import { useState, useEffect } from "react";

import "./MainAreaRight.css";

function ChatFooter({ currentUser, socket, room, messageList, setMessageList, friend }) {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        type: "DM",
        room: room,
        from: currentUser,
        user1: "Aryan",
        user2: friend,
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
    <div className="input__field">
      <div className="input__area">
        <input
          type="text"
          placeholder="Type a message"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <IconButton onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatFooter;
