import "./MainAreaRight.css";

function ChatHeader({ title }) {
  return (
    <div className="postWall">
      <h2 className="orgName">{title}</h2>
    </div>
  );
}

export default ChatHeader;
