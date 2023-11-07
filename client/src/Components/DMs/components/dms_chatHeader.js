import React from "react";
import "./dms_chatHeader.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

function dms_chatHeader({ activeDM }) {
  return (
    <div className="dms_chatHeader">
      <div className="dms__chatHeader_icon">
        <PersonOutlineIcon style={{ width: "50%", height: "40%", margin: "32px 25px" }} />
      </div>
      <div className="dms__chatName">
        <h2>{activeDM}</h2>
      </div>
    </div>
  );
}

export default dms_chatHeader;
