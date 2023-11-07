import React, { useState } from "react";
import "./MainArea.css";
import MainAreaLeft from "./MainAreaLeft";
import MainAreaRight from "./MainAreaRight";

function MainArea({ setNotiList, notiList, setjoinbox }) {
  const [title, setTitle] = useState("");
  const [friend, setFriend] = useState("Arushi");
  const [index, setindex] = useState(0);
  return (
    <div className="landingPage__mainArea">
      <MainAreaLeft
        title={title}
        setTitle={setTitle}
        setFriend={setFriend}
        setindex={setindex}
        setjoinbox={setjoinbox}
      />
      <MainAreaRight title={title} friend={friend} index={index} notiList={notiList} setNotiList={setNotiList} />
    </div>
  );
}

export default MainArea;
