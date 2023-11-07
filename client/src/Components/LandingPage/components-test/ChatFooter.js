import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import { useState, useEffect } from "react";

import Message from "./Message";

import "./MainAreaRight.css";

// function ChatFooter({ currentUser, socket, room, friend, setMessageList }) {
//   const [currentMessage, setCurrentMessage] = useState("");

//   return (
//     <div className="input__field">
//       <div className="input__area">
//         <input
//           type="text"
//           placeholder="Type a message"
//           value={currentMessage}
//           onChange={(e) => setCurrentMessage(e.target.value)}
//         />
//         <button className="input__button" onClick={sendMessage}>
//           Send Message
//         </button>

//         <IconButton onClick={sendMessage}>
//           <SendIcon />
//         </IconButton>
//       </div>
//     </div>
//   );
// }

function ChatCombined({ currentUser, socket, room, messageList, setMessageList }) {
  const [currentMessage, setCurrentMessage] = useState("");
  // const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        from: currentUser,
        user1: "Aryan",
        user2: "Arushi",
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
    <>
      <div className="landingPage__mainAreachatArea">
        {/* <ScrollToBottom className="chatArea"> */}
        {messageList != []
          ? messageList.map((message) => {
              return (
                <Message key={message.id} message={message} isTrue={message.from === currentUser ? true : false} />
              );
            })
          : null}
        {/* </ScrollToBottom> */}
      </div>
      <div className="landingField__chatArea__inputArea">
        <div className="landingField__chatArea__inputField">
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
    </>
  );
}

export default ChatCombined;
