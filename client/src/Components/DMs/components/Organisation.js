import React, { useState } from "react";
import "./Organisation.css";
import { Avatar } from "@mui/material";
import { ArrowDropDown, Article, Description } from "@mui/icons-material";

const Channeldata = [
  {
    ChannelName: "Arushi",
    ChannelType: "File",
  },
  {
    ChannelName: "Vedant",
    ChannelType: "File",
  },
  {
    ChannelName: "c2",
    ChannelType: "File",
  },
  {
    ChannelName: "General",
    ChannelType: "File",
  },
  {
    ChannelName: "c1",
    ChannelType: "File",
  },
  {
    ChannelName: "c2",
    ChannelType: "File",
  },
  {
    ChannelName: "General",
    ChannelType: "File",
  },
  {
    ChannelName: "c1",
    ChannelType: "File",
  },
  {
    ChannelName: "c2",
    ChannelType: "File",
  },
  {
    ChannelName: "General",
    ChannelType: "File",
  },
  {
    ChannelName: "c1",
    ChannelType: "File",
  },
  {
    ChannelName: "c2",
    ChannelType: "File",
  },
];

function Channel({ handleActiveChannel, ChannelType, ChannelName, k, activeChannel }) {
  return (
    <div>
      <button
        className={activeChannel === k ? "channelbox selectedChannel" : "channelbox"}
        onClick={() => handleActiveChannel(k, ChannelName)}
      >
        <h4 className="channel__name">{ChannelName}</h4>
        {/* <Description className="icod" /> */}
      </button>
    </div>
  );
}

function ChannelsList({ title, setTitle, setFriend }) {
  const [activeChannel, setActiveChannel] = useState(0);

  function handleActiveChannel(id, name) {
    setActiveChannel(id);
    setTitle(name);
    setFriend(name);
  }

  return (
    <ul className="ul">
      {Channeldata.map((channelDataObj, index) => (
        <li>
          <Channel
            ChannelName={channelDataObj.ChannelName}
            ChannelType={channelDataObj.ChannelType}
            k={index}
            activeChannel={activeChannel}
            handleActiveChannel={handleActiveChannel}
          />
        </li>
      ))}
    </ul>
  );
}

function Organisation({ title, setTitle, setFriend }) {
  return (
    <div className="organisation">
      <div className="organisation__title">
        <div className="avatar">
          <Avatar className="icoi" />
        </div>
        <div className="organisation__info">
          <h3 className="organisation__name">Social-Space</h3>
          <p className="organisation__about">
            Re-defining how people chat and separating their professional and personal lives
          </p>
        </div>
        <ArrowDropDown className="icoi" />
      </div>
      <div className="box">
        <ChannelsList title={title} setTitle={setTitle} setFriend={setFriend} />
      </div>
    </div>
  );
}

export default Organisation;
