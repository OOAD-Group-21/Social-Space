import React from "react";
import "./dm_message.css";
import { Avatar } from "@mui/material";

function dm_message({ message, isTrue }) {
  return (
    <div className={` ${isTrue ? "chat_reciever__dms" : "dm_message"}`}>
      <div className="dm__main__message">
        <Avatar style={{ marginRight: "10px", marginTop: "5px" }} />
        <div className="dm__message_info">
          <p>{message.text}</p>
        </div>
      </div>
      <p className="dm_timestamp">{message.date}</p>
    </div>
  );
}

export default dm_message;
