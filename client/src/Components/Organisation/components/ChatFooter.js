import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import { useState, useEffect } from "react";

import "./MainAreaRight.css";

function ChatFooter({ currentUser, socket, room, setMessageList, title }) {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        type: "channel",
        room: room,
        channelName: title,
        from: currentUser,
        text: currentMessage,
        date: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);

      setMessageList((list) => {
        console.log([...list, messageData]);
        return [...list, messageData];
      });
      // console.log(mes)
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
    <div className="landingField__chatArea__inputArea">
      <div className="landingField__chatArea__inputField">
        <input
          type="text"
          placeholder="Type a message"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyUp={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <IconButton onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ChatFooter;
