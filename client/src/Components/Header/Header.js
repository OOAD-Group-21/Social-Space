import React, { useState, useEffect } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Header({ setShowNotiList, showNotiList }) {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [notificationData, setNotificationData] = useState([]);
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((response) => {
      const userArr = response.data.userArr.map((user) => user.username).sort();

      setUsers(userArr.filter((username) => username !== response.data.currentUser.username));
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/notification").then((response) => {
      console.log(response.data);
      setNotificationData(response.data);
    });
  }, []);

  function handleQueryChange(e) {
    setQuery(e.target.value);
    let newArr = [];
    if (e.target.value !== "") {
      const regex = new RegExp(`^${e.target.value.toLowerCase()}`);
      newArr = users.filter((item) => regex.test(item.toLowerCase()));
    }
    setResults(newArr);
  }

  function handleAccept(notification) {
    if (notification.isFriendRequest) {
      axios
        .post("http://localhost:5000/addfriends", {
          username: notification.friendOrOrgName,
        })
        .then((response) => {
          console.log(response);
        });

      setNotificationData((list) => list.filter((item) => item !== notification));
    } else {
      const data = {
        role: notification.role,
        code: notification.orgCode,
      };

      axios.post("http://localhost:5000/joinOrganisation", data).then((response) => {
        console.log(response);
      });

      setNotificationData((list) => list.filter((item) => item !== notification));
    }
  }

  function handleReject(notification) {
    const { friendOrOrgName, orgCode } = notification;
    axios
      .post("http://localhost:5000/deleteNotification", {
        friendOrOrgName,
        orgCode,
      })
      .then((response) => {
        console.log(response);
      });

    setNotificationData((list) => list.filter((item) => item !== notification));
  }

  return (
    <>
      <div className="header">
        <div className="header__left">
          <h3 className="logo">Social Space</h3>
        </div>

        <div className="header__center">
          <div className="search__box">
            <input type="text" placeholder="Search" onChange={(e) => handleQueryChange(e)} />
            <SearchIcon />
            <SearchResults results={results} />
          </div>
        </div>

        <div className="header__right">
          <IconButton onClick={() => setShowNotiList(!showNotiList)}>
            <NotificationsIcon className="ico" />
          </IconButton>
          {notificationData.length === 0 ? null : notificationData.length}
          <IconButton onClick={() => navigate("/updateProfile")}>
            <AccountCircleIcon className="ico drop" />
          </IconButton>
          {/* <div className="dropdown">
            <div className="item">
              <p>Name</p>
            </div>
            <div className="item">
              <p>Logout</p>
            </div>
            <div className="item">
              <p>Edit Profile</p>
            </div>
            <div className="item">
              <p>Change Password</p>
            </div>
          </div> */}
        </div>
      </div>
      <div className="notiDropdown" id="dropdownHeaderNoti">
        {showNotiList ? (
          <Notifications notificationData={notificationData} handleAccept={handleAccept} handleReject={handleReject} />
        ) : null}
      </div>
    </>
  );
}

function SearchResults({ results }) {
  return (
    <div
      className="newChannelsearch__results"
      style={{
        display: "flex",
        "flex-direction": "column",
        "margin-left": "0px",
        position: "fixed",
        top: "0",
        "margin-top": "43px",
        "background-color": "#0077b6",
        width: "77vh",
      }}
    >
      <ul className="newChannelsearchResults__list" id="userSearch">
        {results.map((ele) => (
          <User user={ele} />
        ))}
      </ul>
    </div>
  );
}

function User({ user }) {
  return (
    <li className="newChannel__ResultItem colooo">
      <Link to={`/user/${user}`} style={{ textDecoration: "none" }} className="headerPage_Anchor">
        <div className="newChannelSearchitem">
          <AccountCircleIcon className="icom" />
          <p className="newChannel__searchitemName">{user}</p>
        </div>
      </Link>
    </li>
  );
}

function Notifications({ notificationData, handleAccept, handleReject }) {
  return (
    <ul className="listHeader">
      {notificationData.map((notification) => (
        <Notification notification={notification} handleAccept={handleAccept} handleReject={handleReject} />
      ))}
    </ul>
  );
}

function Notification({ notification, handleAccept, handleReject }) {
  return (
    <div className="items">
      <div className="item__info">
        {notification.isFriendRequest
          ? `${notification.friendOrOrgName} sent you a friend request`
          : `You are invited to join ${notification.friendOrOrgName}`}
      </div>
      <IconButton
        className="landingPage__accept__btn"
        onClick={() => {
          handleAccept(notification);
        }}
        style={{
          "background-color": "green",
          color: "white",
          "border-radius": "12px",
        }}
      >
        <DoneIcon />
      </IconButton>

      <IconButton
        className="landingPage__reject__btn"
        onClick={() => {
          handleReject(notification);
        }}
        style={{
          "background-color": "red",
          color: "white",
          "border-radius": "12px",
        }}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
}

export default Header;
