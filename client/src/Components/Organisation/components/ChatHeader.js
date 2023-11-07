import "./MainAreaRight.css";

function ChatHeader({ title, showMembers, setShowMembers, organisationData, channelData }) {
  return (
    <div className="ChatAreaHeader">
      <h2 className="ChatAreaHeader__chatName">{title}</h2>
      <MembersButton
        title={title}
        setShowMembers={setShowMembers}
        showMembers={showMembers}
        organisationData={organisationData}
        channelData={channelData}
      />
    </div>
  );
}

function MembersButton({ setShowMembers, showMembers, organisationData, channelData, title }) {
  return (
    <>
      <button
        className="btn btn-primary members mem_button "
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapseWidthExample"
        aria-expanded="false"
        aria-controls="collapseWidthExample"
        onClick={() => setShowMembers((old) => !old)}
      >
        Members
      </button>
      <div style={{ minHeight: 120 }}>
        <div className="collapse collapse-horizontal memberss" id="collapseWidthExample">
          {!showMembers ? null : (
            <div className="box-right">
              <ul className="chatArea__memberList">
                <MembersList channelData={channelData} title={title} />
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function MembersList({ channelData, title }) {
  const channelObj = channelData.filter((channelObj) => channelObj.channelName === title)[0];
  return channelObj.members.map((member) => (
    <li>
      <Members username={member} role={"admin"} />
    </li>
  ));
}

function Members({ username, role }) {
  return (
    <div>
      <button className="organisationMembersList__btn">
        <h4>{username}</h4>
      </button>
    </div>
  );
}

export default ChatHeader;
