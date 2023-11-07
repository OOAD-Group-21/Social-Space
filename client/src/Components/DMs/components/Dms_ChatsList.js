import React, { useState, useEffect } from "react";
import "./Dms_ChatsList.css";
import SearchIcon from "@mui/icons-material/Search";
import Dm__chat from "./Dm__chat";
import Search__results from "./search__results";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dms_ChatsList({ setActiveDM, username }) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [notificationData, setNotificationData] = useState([]);
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [dmList, setDmList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/notification").then((response) => {
      // console.log(response.data);
      setNotificationData(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/viewProfile").then((response) => {
      console.log(response.data);
      setUsers(response.data.data.friends);
    });
  }, []);

  function handleQueryChange(e) {
    setQuery(e.target.value);
    let newArr = [];
    if (e.target.value != "") {
      const regex = new RegExp(`^${e.target.value.toLowerCase()}`);
      newArr = users.filter((item) => regex.test(item.toLowerCase()));
    }
    setResults(newArr);
  }

  useEffect(() => {
    axios.get("http://localhost:5000/dm").then((response) => {
      console.log(response.data);
      setDmList(response.data);
    });
  }, []);

  return (
    <div className="dms__chatsList">
      <div className="dms__chatsSearch">
        <div className="dms__searchField">
          <SearchIcon style={{ padding: "12px 12px" }} />
          <input
            className="dms__seachInput"
            placeholder="Search..."
            onChange={(e) => handleQueryChange(e)}
          />
        </div>
        <Search__results results={results} setActiveDM={setActiveDM} />
      </div>
      <div className="Dm__allChatsList">
        {dmList.map((ele) => {
          console.log(ele);
          return (
            <button
              onClick={() => setActiveDM(ele)}
              style={{ width: "100%", border: "none" }}
            >
              <Dm__chat dm={ele} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Dms_ChatsList;
