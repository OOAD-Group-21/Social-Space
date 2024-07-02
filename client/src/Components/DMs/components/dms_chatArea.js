import React, { useEffect, useState } from "react";
import "./dms_chatArea.css";
import Dms_chatHeader from "./dms_chatHeader";
import Dms_chatInput from "./dms_chatInput";
import Dms_chatMainArea from "./dms_chatMainArea";

import io from "socket.io-client";
import axiosInstance from "../../axiosInstance";

const socket = io.connect(process.env.REACT_PUBLIC_BACKEND_URL);

function Dms_chatArea({ activeDM, username }) {
  const [room, setRoom] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [oldChannelId, setOldChannelId] = useState("");

  useEffect(() => {
    if (activeDM !== "") {
      axiosInstance.get(`/user/${activeDM}`).then((response) => {
        // console.log(response.data);
        // setUsername(response.data.currentUser);
        // console.log(response.data.currentUser);
        setRoom(response.data.roomId);
        setMessageList(response.data.oldMessages);
        socket.emit("join_room", { newChannel: response.data.roomId, oldChannel: oldChannelId });
        setOldChannelId(response.data.roomId);
      });
    }
  }, [activeDM]);

  return (
    <div className="dms_chatArea">
      <Dms_chatHeader activeDM={activeDM} />
      <Dms_chatMainArea messageList={messageList} currentUser={username} />
      <Dms_chatInput
        currentUser={username}
        socket={socket}
        room={room}
        setMessageList={setMessageList}
        activeDM={activeDM}
      />
    </div>
  );
}

export default Dms_chatArea;
