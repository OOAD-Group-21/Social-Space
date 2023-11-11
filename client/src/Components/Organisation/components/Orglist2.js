import React, { useEffect, useState } from "react";
import "./orglist2.css";
import { Link } from "react-router-dom";
import { Avatar, IconButton } from "@mui/material";
import { ArrowDropDown, Article, Description } from "@mui/icons-material";
import logoo from "./immmmg.svg";

function Orglist2({ setorgdrop, organisations }) {
  const [activeChannel, setActiveChannel] = useState(-1);

  function handleActiveChannel(id, name) {
    setActiveChannel(id);
  }

  return (
    <>
      <div className="organisation__title">
        <div className="avatar">
          <img src={logoo} />
          {/* <Avatar className="icox" /> */}
        </div>
        <div className="organisation__info">
          <h3 className="organisation__name">Social-Space</h3>
          <p className="organisation__about">
            Re-defining how people chat and separating their professional and
            personal lives
          </p>
        </div>
        <IconButton onClick={() => setorgdrop((old) => !old)}>
          <ArrowDropDown className="icox icoz" style={{ color: "white" }} />
        </IconButton>
      </div>

      <ul className="ul">
        <li>
          <Link to="/createorganisation">
            <button className="org-twofixedbuttons">
              Create new Organization
            </button>
          </Link>
        </li>
        <li>
          <Link to="/home">
            <button className="org-twofixedbuttons">
              Back to Global Post wall
            </button>
          </Link>
        </li>
        {organisations !== ""
          ? organisations.map((orgName, index) => (
              <li>
                <Channel
                  OrgName={orgName}
                  k={index}
                  activeChannel={activeChannel}
                  handleActiveChannel={handleActiveChannel}
                />
              </li>
            ))
          : null}
      </ul>
    </>
  );
}

function Channel({ handleActiveChannel, OrgName, k, activeChannel }) {
  return (
    <div>
      <Link to={`/organisation/${OrgName}`}>
        <button
          className={
            activeChannel === k
              ? "channelbox selectedChannel"
              : "channelbox btn"
          }
          onClick={() => handleActiveChannel(k, OrgName)}
        >
          <h4 className="channel__name">{OrgName}</h4>
        </button>
      </Link>
    </div>
  );
}

export default Orglist2;
