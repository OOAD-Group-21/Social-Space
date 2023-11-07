import React from "react";
import "./Message.css";
import { Avatar } from "@mui/material";

function Message({ isTrue, message }) {
  return (
    <div className="message">
      <div className={`main__message ${isTrue && "chat__reciever"}`}>
        <div className="icoed">
          <Avatar className="" />
        </div>
        <div className="message__info">
          <h4>{message.from}</h4>
          <p>{message.text}</p>
        </div>
        <span className="message__timestamp">{message.date}</span>
      </div>
    </div>
  );
}

export default Message;
