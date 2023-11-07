import React from "react";
import "./Sidebar.css";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/home">
        <HomeIcon
          className="dm__sidebar__icon"
          style={{
            width: "100%",
            height: "5vh",
            color: "white",
            margin: "10px 0px",
            paddingBottom: "10px",
            borderBottom: "1px solid white",
          }}
        />
      </Link>
      <Link to="/updateProfile">
        <PersonIcon
          className="dm__sidebar__icon"
          style={{
            width: "100%",
            color: "white",
            height: "5vh",
            margin: "10px 0px",
            paddingBottom: "10px",
            borderBottom: "1px solid white",
          }}
        />
      </Link>
      <MessageIcon
        className="dm__sidebar__icon"
        style={{
          width: "100%",
          height: "5vh",
          color: "white",
          margin: "10px 0px",
          paddingBottom: "10px",
          borderBottom: "1px solid white",
        }}
      />
    </div>
  );
}

export default Sidebar;
