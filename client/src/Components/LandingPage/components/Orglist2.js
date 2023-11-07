import React, { useState } from "react";
import "./orglist2.css";
import { Avatar, IconButton } from "@mui/material";
import { ArrowDropDown, Article, Description } from "@mui/icons-material";

const Orgadaata = [
    {
      OrgName: "hello",
      OrgType: "File",
    },
    {
      OrgName: "Vedant",
      OrgType: "File",
    },
    {
      OrgName: "c2",
      OrgType: "File",
    },
    {
      OrgName: "General",
      OrgType: "File",
    },
    {
      OrgName: "c1",
      OrgType: "File",
    },
    {
      OrgName: "c2",
      OrgType: "File",
    },
    {
      OrgName: "General",
      OrgType: "File",
    },
    {
      OrgName: "c1",
      OrgType: "File",
    },
    {
      OrgName: "c2",
      OrgType: "File",
    },
    {
      OrgName: "General",
      OrgType: "File",
    },
    {
      OrgName: "c1",
      OrgType: "File",
    },
    {
      OrgName: "c2",
      OrgType: "File",
    },
  ];

  function Channel({ handleActiveChannel, OrgName, k, activeChannel }) {
    return (
      <div>
        <button
          className={activeChannel === k ? "channelbox selectedChannel" : "channelbox btn"}
          onClick={() => handleActiveChannel(k, OrgName)}
        >
          <h4 className="channel__name">{OrgName}</h4>
          {/* <Description className="icod" /> */}
        </button>
      </div>
    );
  }
  
  function Orglist2({ setindex , setorgdrop , orgdrop}) {
    const [activeChannel, setActiveChannel] = useState(-1);
    function handleActiveChannel(id, name) {
      setActiveChannel(id);
    }
  
    return (
      <>
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
        <IconButton
            onClick={() => setorgdrop(!orgdrop)}
        >
          <ArrowDropDown className="icoi" />
        </IconButton>
        {/* <ArrowDropDown className="icoi" /> */}

      </div>
      <ul className="ul">
        <li>
            <button>
                Create new Organization
            </button>
        </li>
        {Orgadaata.map((channelDataObj, index) => (
          <li>
            <Channel
              OrgName={channelDataObj.OrgName}
              OrgType={channelDataObj.OrgType}
              k={index}
              activeChannel={activeChannel}
              handleActiveChannel={handleActiveChannel}
            />
          </li>
        ))}
        <li>
            <button>
                Back to Global Post wall
            </button>
        </li>
      </ul>
      </>
    );
  }

  export default Orglist2