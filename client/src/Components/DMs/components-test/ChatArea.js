import "./MainAreaRight.css";
import Message from "./Message";

function ChatArea({ messageList, currentUser }) {
  // const username = currentUser;
  console.log("messageList", messageList);
  return (
    <div className="chatArea">
      {/* <ScrollToBottom className="chatArea"> */}
      {messageList != []
        ? messageList.map((message) => {
            return <Message key={message.id} message={message} isTrue={message.from === currentUser ? true : false} />;
          })
        : null}
      {/* </ScrollToBottom> */}
    </div>
  );
}

export default ChatArea;
