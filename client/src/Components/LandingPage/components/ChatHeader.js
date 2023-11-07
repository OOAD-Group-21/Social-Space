import "./MainAreaRight.css";

const Memberdata = [
  {
    Username: "Parth",
    Role: "Admin",
  },
  {
    Username: "Parth",
    Role: "Admin",
  },
  {
    Username: "Parth",
    Role: "Admin",
  },
  {
    Username: "Parth",
    Role: "Admin",
  },
  {
    Username: "Parth",
    Role: "Admin",
  },
  {
    Username: "Parth",
    Role: "Admin",
  },
  {
    Username: "Parth",
    Role: "Admin",
  },
  {
    Username: "Parth",
    Role: "Admin",
  },
  {
    Username: "Parth",
    Role: "Admin",
  },
  {
    Username: "Parth",
    Role: "Admin",
  },
  {
    Username: "Parth",
    Role: "Admin",
  },
  {
    Username: "Parth",
    Role: "Admin",
  },
];

function ChatHeader({ title, setcss, css }) {
  return (
    <div className="ChatAreaHeader">
      <h2 className="ChatAreaHeader__chatName">{title}</h2>
      {/* <Membersbutton setcss={setcss} css={css}/> */}
    </div>
  );
}
function Members({ Username }) {
  return (
    <div>
      <button className="memb_btn">
        <h4>{Username}</h4>
      </button>
    </div>
  );
}
function MembersList() {
  return Memberdata.map((MemberdataObj) => (
    <ul>
      <Members Username={MemberdataObj.Username} />
    </ul>
  ));
}

function handleCSS({ setcss, css }) {
  console.log("fafab");
  setcss(!css);
}

function Membersbutton({ setcss, css }) {
  return (
    <>
      <>
        <button
          className="btn btn-primary members mem_button "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseWidthExample"
          aria-expanded="false"
          aria-controls="collapseWidthExample"
          onClick={() => handleCSS({ setcss, css })}
        >
          Members
        </button>
      </>
      <div style={{ minHeight: 120 }}>
        <div
          className="collapse collapse-horizontal memberss"
          id="collapseWidthExample"
        >
          <div className="box-right">
            <MembersList />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatHeader;
