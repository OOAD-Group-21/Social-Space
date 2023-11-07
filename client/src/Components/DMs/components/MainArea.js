import React, { useState } from "react";
import "./MainArea.css";
import MainAreaLeft from "./MainAreaLeft";
import MainAreaRight from "./MainAreaRight";

function MainArea() {
  const [title, setTitle] = useState("");
  const [friend, setFriend] = useState("Arushi");
  return (
    <div className="main__area">
      <MainAreaLeft title={title} setTitle={setTitle} setFriend={setFriend} />
      <MainAreaRight title={title} friend={friend} />
    </div>
  );
}

export default MainArea;
