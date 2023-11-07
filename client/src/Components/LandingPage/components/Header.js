import React from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton } from "@mui/material";

function Header({ notiList, setNotiList }) {
  return (
    <div className="landingPage__header">
      <div className="landingPage__headerLeft">
        <h3 className="landingPage__headerLeft__logo">Social Space</h3>
      </div>

      <div className="landingPage__headerCenter">
        <div className="landingPage__headerCenter__searchBox">
          <input type="text" placeholder="Search" />
          <SearchIcon />
        </div>
      </div>

      <div className="landingPage__headerRight">
        <IconButton onClick={() => setNotiList(!notiList)}>
          <NotificationsIcon className="landingPage__headerRight__Icon" />
        </IconButton>
        <IconButton>
          <AccountCircleIcon className="landingPage__headerRight__Icon drop" />
        </IconButton>
        <div className="landingPage__header__profileDropdown">
          <div className="landingPage__header__profileDropdown__item">
            <p>Name</p>
          </div>
          <div className="landingPage__header__profileDropdown__item">
            <p>Logout</p>
          </div>
          <div className="landingPage__header__profileDropdown__item">
            <p>Edit Profile</p>
          </div>
          <div className="landingPage__header__profileDropdown__item">
            <p>Change Password</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
