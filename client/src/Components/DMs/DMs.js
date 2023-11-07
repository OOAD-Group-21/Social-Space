import "./DMs.css";
import Header from "./../Header/Header";
import MainArea from "./components/MainArea";

function DMs({ setShowNotiList, showNotiList }) {
  return (
    <div className="App">
      <Header showNotiList={showNotiList} setShowNotiList={setShowNotiList} />
      <MainArea />
    </div>
  );
}

export default DMs;
