import { useState } from "react";
import "./LandingPage.css";
import Header from "./../Header/Header";
import MainArea from "./components/MainArea";
import JoinOrg from "./components/JoinOrg";

function LandingPage({ showNotiList, setShowNotiList }) {
  const [joinbox, setjoinbox] = useState(false);
  return (
    <>
      <div className="landingPage">
        <Header showNotiList={showNotiList} setShowNotiList={setShowNotiList} />
        <MainArea setjoinbox={setjoinbox} />
        {joinbox === false ? null : <JoinOrg setjoinbox={setjoinbox} />}
      </div>
      <div className="hel"></div>
    </>
  );
}

export default LandingPage;
