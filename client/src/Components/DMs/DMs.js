import "./DMs.css";
import React, { useState, useEffect } from "react";

import Dms_ChatsList from "./components/Dms_ChatsList";
import Sidebar from "./components/Sidebar";
import Dms_chatArea from "./components/dms_chatArea";

import axios from "axios";

function DMs({ setShowNotiList, showNotiList }) {
  const [activeDM, setActiveDM] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/viewProfile").then((response) => {
      // console.log(response.data);
      setUsername(response.data.data.username);
    });
  }, []);

  return (
    <div className="Dms">
      <Sidebar />
      <Dms_ChatsList setActiveDM={setActiveDM} />
      <Dms_chatArea activeDM={activeDM} username={username}/>
    </div>
  );
}

export default DMs;
