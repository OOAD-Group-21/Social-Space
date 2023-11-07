import React from "react";
import "./dm_message.css";

function dm_message({ message, isTrue }) {
  return (
    <div className="dm___message">
      <div className={`dm_message ${isTrue ? "chat_reciever__dms" : ""}`}>
        <div className="dm__message_info">
          <p>{message.text}</p>
        </div>
        <span className="dm_timestamp">{message.date}</span>
      </div>
    </div>
  );
}

export default dm_message;
