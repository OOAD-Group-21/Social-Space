import React from "react";
import "./Dm__chat.css";
import { Avatar } from "@mui/material";

function Dm__chat({ dm }) {
  return (
    <div className="Dm__chat">
      <Avatar style={{ flex: "0.15", height: "6vh", margin: "14px" }} />
      <h3>{dm}</h3>
    </div>
  );
}

export default Dm__chat;
