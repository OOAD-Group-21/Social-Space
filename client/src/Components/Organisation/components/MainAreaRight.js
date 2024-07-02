import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axiosInstance from "../../axiosInstance";
import ChatArea from "./ChatArea";
import ChatFooter from "./ChatFooter";
import ChatHeader from "./ChatHeader";
import "./MainAreaRight.css";

const socket = io.connect(process.env.REACT_PUBLIC_BACKEND_URL);

function MainAreaRight({ title, organisationData, channelData, username, organisationName }) {
  const [room, setRoom] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const [oldChannelId, setOldChannelId] = useState("");

  useEffect(() => {
    if (title !== "Welcome to Social Space") {
      axiosInstance.get(`/organisation/${organisationName}/channel/${title}`).then((response) => {
        setMessageList(response.data.channel.messages);
        setRoom(response.data.channel._id);
        // console.log(response.data.channel);
        socket.emit("join_room", {
          newChannel: response.data.channel._id,
          oldChannel: oldChannelId,
        });
        setOldChannelId(response.data.channel._id);
      });
    }
  }, [title]);

  return (
    <div className="landingPage__mainArea__right shadow3" style={showMembers ? { flex: "0.6" } : {}}>
      {title === "Welcome to Social Space" ? (
        <h4>{title}</h4>
      ) : (
        <>
          <ChatHeader
            title={title}
            showMembers={showMembers}
            setShowMembers={setShowMembers}
            organisationData={organisationData}
            channelData={channelData}
          />
          <ChatArea messageList={messageList} currentUser={username} />
          <ChatFooter
            currentUser={username}
            socket={socket}
            room={room}
            setMessageList={setMessageList}
            title={title}
          />
        </>
      )}
    </div>
  );
}

export default MainAreaRight;
