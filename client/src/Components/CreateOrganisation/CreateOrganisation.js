import "./CreateOrganisationCSS.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// NOTES - SEARCH BAR NOT CLOSING ON NO RESULTS

function App() {
  const [rightArr, setRightArr] = useState([]);
  const [leftArr, setLeftArr] = useState([]);
  const [reg, setReg] = useState("");

  const [orgName, setOrgName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((response) => {
      console.log(response.data.userArr);
      const userArr = response.data.userArr.map((user) => user.username).sort();

      setLeftArr(userArr.filter((username) => username !== response.data.currentUser.username));
    });
  }, []);

  function handleQueryChange(e) {
    setSearchQuery(e.target.value);
    let newArr = [];
    if(e.target.value!=''){

    const regex = new RegExp(`^${e.target.value.toLowerCase()}`);
    setReg(regex);
    newArr = leftArr.filter((item) => regex.test(item.toLowerCase()));
    }
    setResults(newArr);
  }

  function handleAddUser(username) {
    setRightArr((list) => [...list, { username, role: "Member" }]);
    setLeftArr((list) => list.filter((item) => item !== username));
    setResults((list) => list.filter((item) => item !== username));
  }

  function handleCreateOrganisation() {
    // {organisationName,memrole:[]}

    const data = {
      organisationName: orgName,
      memrole: rightArr,
    };

    axios.post("http://localhost:5000/CreateOrganisation", data).then((response) => {
      console.log(response.data);
      if (response.data.status === "success") {
        navigate("/home");
      }
    }).catch(err=>(alert(err.response.data)));
  }

  return (
    <div className="createOrganisation">
      <div className="new__org">
        <div className="newOrg__top">
          <h3>Create new Organisation</h3>
        </div>

        <div className="newOrg__bottom">
          <div className="newOrgBottom__mainArea">
            <FormFields setOrgName={setOrgName} />
            <h2>Search Users</h2>
            <div className="newOrg__bigDiv">
              <div className="newOrg__searchBox">
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
              <button type="submit" className="searchBtn_submit" onClick={() => handleCreateOrganisation()}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormFields({ setOrgName }) {
  return (
    <>
      <div className="newOrg__name">
        <h2>Organization name</h2>

        <input
          type="text"
          placeholder="Name"
          className="newOrg__nameInput"
          onChange={(e) => setOrgName(e.target.value)}
        />
      </div>
    </>
  );
}

function Searchformfield({ handleQueryChange }) {
  return (
    <>
      <div className="newOrg__searchUser">
        <div className="newOrg__search">
          <input className="newOrg__nameInput" placeholder="Username" onChange={(e) => handleQueryChange(e)} />
        </div>
      </div>
    </>
  );
}

function SearchResults({ results, handleAddUser, leftArr }) {
  console.log(leftArr);
  return (
    <div className="newOrgsearch__results">
      <ul className="newOrgsearchResults__list">
        {results.map((ele) => (
          <User user={ele} handleAddUser={handleAddUser} />
        ))}
      </ul>
    </div>
  );
}

function User({ user, handleAddUser }) {
  return (
    <li className="newOrg__ResultItem">
      <div className="newOrgSearchitem">
        <AccountCircleIcon className="icom" />
        <p className="newOrg__searchitemName">{user}</p>
        <IconButton onClick={() => handleAddUser(user)}>
          <AddCircleIcon className="icom2" />
        </IconButton>
      </div>
    </li>
  );
}

function RightSide({ rightArr, setRightArr, setLeftArr, setResults, reg }) {
  function removeUserFromMemberList(username) {
    setRightArr((list) => list.filter((item) => item.username !== username));
    setLeftArr((list) => [...list, username].sort());
    if (reg.test(username.toLowerCase())) {
      setResults((list) => [...list, username].sort());
    }
  }

  console.log(rightArr);
  return (
    <div className="newOrg__members">
      <div className="newOrg__membersTop">
        <h4>Members</h4>
      </div>
      <div className="newOrg__membersBottom">
        <div className="newOrg__searchUser">
          <ul className="newOrgsearchResults__list">
            {console.log(rightArr)}
            {rightArr.map((ele) => (
              <Member
                user={ele.username}
                removeUserFromMemberList={removeUserFromMemberList}
                setRightArr={setRightArr}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Member({ user, removeUserFromMemberList, setRightArr }) {
  // const [role, setRole] = useState("Member");
  return (
    <li className="newOrg__ResultItem two">
      <div className="newOrgSearchitem">
        <AccountCircleIcon className="icom" />
        <p className="newOrg__searchitemName">{user}</p>
        <label for="access" className="label">
          Role
        </label>
        <select
          className="select"
          name="access"
          onChange={(e) => {
            setRightArr((list) => {
              return list.map((item) => {
                return item.username === user ? { username: user, role: e.target.value } : item;
              });
            });
          }}
        >
          <option className="option">Admin</option>
          <option className="option" selected>
            Member
          </option>
        </select>
        <IconButton onClick={() => removeUserFromMemberList(user)}>
          <CloseIcon className="icom3" />
        </IconButton>
      </div>
    </li>
  );
}

export default App;
