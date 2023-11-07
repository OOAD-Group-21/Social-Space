import React from "react";
import "./dms_chatMainArea.css";
import Dm_message from "./dm_message";

function dms_chatMainArea({ messageList, currentUser }) {
  return (
    <div className="dms_chatMainArea">
      {messageList != []
        ? messageList.map((message) => {
            return <Dm_message key={message.id} message={message} isTrue={message.from === currentUser ? true : false} />;
          })
        : null}
    </div>
  );
}

export default dms_chatMainArea;
