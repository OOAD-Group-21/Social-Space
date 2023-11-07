import "./MainAreaRight.css";
import Message from "./Message";
import axios from "axios";
import { useEffect } from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

const Notificationdata = [
  {
    username: "Parth",
    organizationname: "IITB",
  },
  {
    username: "Akshat",
    organizationname: "suck his dick",
  },
  {
    username: "user",
    organizationname: "asuss",
  },
];

function ChatArea({ messageList, currentUser, notiList, setNotiList }) {
  // const username = currentUser;
  console.log("messageList", messageList);
  return (
    <>
      <div className="notiDropdown">
        <Notificationslist notiList={notiList} setNotiList={setNotiList} />
      </div>
      {/* <div className="chatArea">
      <ScrollToBottom className="chatArea">
      {messageList != []
        ? messageList.map((message) => {
            return <Message key={message.id} message={message} isTrue={message.from === currentUser ? true : false} />;
          })
        : null}
      </ScrollToBottom>
    </div> */}
    </>
  );
}
function Notificationslist({ setNotiList, notiList }) {
  // useEffect(() => {
  //   axios.get("http://localhost:5000/user/Arushi").then((response) => {
  //     console.log(response.data);
  //     setNotiList(response.data.roomId);
  //     setMessageList(response.data.oldMessages);
  //     socket.emit("join_room", response.data.roomId);
  //   });
  // }, []);

  return (
    <ul className={notiList ? "list" : "list2"}>
      {Notificationdata.map((ndobj) => (
        <li>
          <Notifications sender={ndobj.username} org_name={ndobj.organizationname} />
        </li>
      ))}
    </ul>
  );
}
function Notifications({ sender, org_name }) {
  return (
    <div className="items">
      <div className="item__info">
        {sender} invited you to join {org_name}
      </div>
      <button className="landingPage__accept__btn">
        <DoneIcon />
      </button>
      <button className="landingPage__reject__btn">
        <CloseIcon />
      </button>
    </div>
  );
}
export default ChatArea;
