import React from "react";
import "./MainAreaLeft.css";
import Organisation from "./Organisation";

function MainAreaLeft({ title, setTitle, setFriend }) {
  return (
    <div className="mainArea__left">
      <Organisation title={title} setTitle={setTitle} setFriend={setFriend} />
    </div>
  );
}

export default MainAreaLeft;
