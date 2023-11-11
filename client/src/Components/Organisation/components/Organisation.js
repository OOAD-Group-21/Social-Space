import React, { useState } from "react";
import "./Organisation.css";
import { Avatar, IconButton } from "@mui/material";
import { ArrowDropDown, Article, Description } from "@mui/icons-material";
import logoo from "./immmmg.svg";

function Organisation({ title, setTitle, setorgdrop, organisationData }) {
  return (
    <div className="organisation">
      <div className="organisation__title">
        <div className="avatar">
          <img src={logoo} />
          {/* <Avatar className="icox" /> */}
        </div>
        <div className="organisation__info">
          <h3 className="organisation__name">
            {organisationData.organisationName}
          </h3>
        </div>
        <IconButton onClick={() => setorgdrop((old) => !old)}>
          <ArrowDropDown className="icox icoz" style={{ color: "white" }} />
        </IconButton>
      </div>
      <div className="box">
        <ChannelsList
          title={title}
          setTitle={setTitle}
          organisationData={organisationData}
        />
      </div>
      <div></div>
    </div>
  );
}

function ChannelsList({ title, setTitle, organisationData }) {
  const [activeChannel, setActiveChannel] = useState(0);
  function handleActiveChannel(id, name) {
    setActiveChannel(id);
    setTitle(name);
  }

  return (
    <ul className="ul">
      {/* {console.log(organisationData)} */}
      {organisationData !== ""
        ? organisationData.channels.map((channelName, index) => (
            <li>
              <Channel
                ChannelName={channelName}
                k={index}
                activeChannel={activeChannel}
                handleActiveChannel={handleActiveChannel}
              />
            </li>
          ))
        : null}
    </ul>
  );
}

function Channel({ handleActiveChannel, ChannelName, k, activeChannel }) {
  return (
    <div>
      <button
        className={
          activeChannel === k ? "channelbox selectedChannel" : "channelbox btn"
        }
        onClick={() => handleActiveChannel(k, ChannelName)}
      >
        <h4 className="channel__name">{ChannelName}</h4>
      </button>
    </div>
  );
}

export default Organisation;
