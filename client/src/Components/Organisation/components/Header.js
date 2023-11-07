import React, { useState } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";

const notificationData = ["Aryan", "Akshat", "Atish"];

function Header() {
  const [showNoti, setShowNoti] = useState(false);
  return (
    <>
      <div className="header">
        <div className="header__left">
          <h3 className="logo">Social Space</h3>
        </div>

        <div className="header__center">
          <div className="search__box">
            <input type="text" placeholder="Search" />
            <SearchIcon />
          </div>
        </div>

        <div className="header__right">
          <IconButton onClick={() => setShowNoti(!showNoti)}>
            <NotificationsIcon className="ico" />
          </IconButton>
          <IconButton>
            <AccountCircleIcon className="ico drop" />
          </IconButton>
          <div className="dropdown">
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
          </div>
        </div>
      </div>
      {showNoti ? <Notifications /> : null}
    </>
  );
}

function Notifications() {
  return (
    <ul className="list">
      {notificationData.map((notification) => (
        <Notification notification={notification} />
      ))}
    </ul>
  );
}

function Notification({ notification }) {
  return (
    <div className="items">
      <div className="item__info">{notification} invited you to join Asus</div>
      <button className="accept__btn">Tick</button>
      <button className="reject__btn">Cross</button>
    </div>
  );
}

export default Header;
