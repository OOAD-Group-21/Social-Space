import React from "react";
import "./Dm__chat.css";
import { Avatar } from "@mui/material";
import logoo from "./immmmg.svg";

function Dm__chat({ dm }) {
  return (
    <div className="Dm__chat">
      {/* <Avatar style={{ flex: "0.15", height: "6vh", margin: "14px" }} /> */}
      <div className="avatar">
        <img src={logoo} />
      </div>
      <h3>{dm}</h3>
    </div>
  );
}

export default Dm__chat;
