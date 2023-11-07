import "./CreateChannelCSS.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function CreateOrganisation() {
  const params = useParams();
  const [orgName, setOrgName] = useState("");
  const navigate = useNavigate();

  const [rightArr, setRightArr] = useState([]);
  const [leftArr, setLeftArr] = useState([]);
  const [reg, setReg] = useState("");

  const [ChannelName, setChannelName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log(params.organisationName);
    setOrgName(params.organisationName);
  }, [params]);

  useEffect(() => {
    if (orgName !== "") {
      axios.get(`http://localhost:5000/organisation/${orgName}`).then((response) => {
        const arr = response.data.members.map((member) => member.username).sort();

        const userArr = arr.filter((member) => member !== response.data.currentUser.username);

        setLeftArr(userArr);
      });
    }
  }, [orgName]);

  function handleQueryChange(e) {
    setSearchQuery(e.target.value);

    const regex = new RegExp(`^${e.target.value.toLowerCase()}`);
    setReg(regex);
    const newArr = leftArr.filter((item) => regex.test(item.toLowerCase()));

    setResults(newArr);
  }

  function handleAddUser(username) {
    setRightArr((list) => [...list, username]);
    setLeftArr((list) => list.filter((item) => item !== username));
    setResults((list) => list.filter((item) => item !== username));
  }

  function handleCreateChannel() {
    const data = {
      organisationName: orgName,
      channelName: ChannelName,
      members: rightArr,
    };

    axios.post("http://localhost:5000/CreateChannel", data).then((response) => {
      console.log(response.data);
      if (response.data.status === "success") {
        navigate(`/organisation/${orgName}`);
      }
    });
  }

  return (
    <div className="createChannel">
      <div className="new__Channel">
        <div className="newChannel__top">
          <h3>Create new Channel</h3>
        </div>

        <div className="newChannel__bottom">
          <div className="newChannelBottom__mainArea">
            <FormFields setChannelName={setChannelName} />
            <h2>Search Users</h2>
            <div className="newChannel__bigDiv">
              <div className="newChannel__searchBox">
                <Searchformfield handleQueryChange={handleQueryChange} />
                <SearchResults results={results} handleAddUser={handleAddUser} />
              </div>
              <RightSide
                rightArr={rightArr}
                setRightArr={setRightArr}
                setLeftArr={setLeftArr}
                setResults={setResults}
                reg={reg}
              />
            </div>
            <div className="dd">
              <button type="submit" className="searchBtn_submit" onClick={() => handleCreateChannel()}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormFields({ setChannelName }) {
  return (
    <>
      <div className="newChannel__name">
        <h2>Channel name</h2>

        <input
          type="text"
          placeholder="Name"
          className="newChannel__nameInput"
          onChange={(e) => setChannelName(e.target.value)}
        />
      </div>
    </>
  );
}

function Searchformfield({ handleQueryChange }) {
  return (
    <>
      <div className="newChannel__searchUser">
        <div className="newChannel__search">
          <input className="newChannel__nameInput" placeholder="Username" onChange={(e) => handleQueryChange(e)} />
        </div>
      </div>
    </>
  );
}

function SearchResults({ results, handleAddUser, leftArr }) {
  console.log(leftArr);
  return (
    <div className="newChannelsearch__results">
      <ul className="newChannelsearchResults__list">
        {results.map((ele) => (
          <User user={ele} handleAddUser={handleAddUser} />
        ))}
      </ul>
    </div>
  );
}

function User({ user, handleAddUser }) {
  return (
    <li className="newChannel__ResultItem">
      <div className="newChannelSearchitem">
        <AccountCircleIcon className="icom" />
        <p className="newChannel__searchitemName">{user}</p>
        <IconButton onClick={() => handleAddUser(user)}>
          <AddCircleIcon className="icom2" />
        </IconButton>
      </div>
    </li>
  );
}

function RightSide({ rightArr, setRightArr, setLeftArr, setResults, reg }) {
  function removeUserFromMemberList(username) {
    setRightArr((list) => list.filter((item) => item !== username));
    setLeftArr((list) => [...list, username].sort());
    if (reg.test(username.toLowerCase())) {
      setResults((list) => [...list, username].sort());
    }
  }

  return (
    <div className="newChannel__members">
      <div className="newChannel__membersTop">
        <h4>Members</h4>
      </div>
      <div className="newChannel__membersBottom">
        <div className="newChannel__searchUser">
          <ul className="newChannelsearchResults__list">
            {rightArr.map((ele) => (
              <Member user={ele} removeUserFromMemberList={removeUserFromMemberList} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Member({ user, removeUserFromMemberList }) {
  return (
    <li className="newChannel__ResultItem two">
      <div className="newChannelSearchitem">
        <AccountCircleIcon className="icom" />
        <p className="newChannel__searchitemName">{user}</p>
        <IconButton onClick={() => removeUserFromMemberList(user)}>
          <CloseIcon className="icom3" />
        </IconButton>
      </div>
    </li>
  );
}

export default CreateOrganisation;
