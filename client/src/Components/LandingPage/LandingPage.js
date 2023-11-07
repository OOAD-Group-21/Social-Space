import {  useState } from "react";
import "./LandingPage.css";
import Header from "./components/Header";
import MainArea from "./components/MainArea";

function LandingPage() {
  const [notiList, setNotiList] = useState(false);
  return (
    <div className="landingPage">
      <Header notiList={notiList} setNotiList={setNotiList} />
      <MainArea notiList={notiList} setNotiList={setNotiList} />
    </div>
  );
}

export default LandingPage;
