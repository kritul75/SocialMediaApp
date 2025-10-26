import React from "react";
import ProfileCard from "../ProfileCard/ProfileCard";
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from "@mui/icons-material/Home";
import { BrowserRouter as Router, Route, Link } from "react-router";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

import "./ProfileSide.css";
const ProfileSide = () => {
  return (
      <div className="ProfileSide">
        <ProfileCard />
        <div className="Menu">
          <Link to="/">
            <div className="menu-items">
              <HomeIcon style={{ marginRight: 10, color: "#3db3f3" }} />
              Home
            </div>
          </Link>
          <Link to="/profile">
            <div className="menu-items">
              <AccountCircleIcon
                style={{ marginRight: 10, color: "#3db3f3" }}
              />
              Profile
            </div>
          </Link>
          <Link to="/settings">
            <div className="menu-items">
              <SettingsIcon style={{ marginRight: 10, color: "#3db3f3" }} />
              Settings
            </div>
          </Link>
          <Link to="/" >
            <div className="menu-items" >
              <LogoutIcon style={{ marginRight: 10, color: "#3db3f3" }} />
              Log Out
            </div>
          </Link>
        </div>
      </div>
  );
};

export default ProfileSide;
