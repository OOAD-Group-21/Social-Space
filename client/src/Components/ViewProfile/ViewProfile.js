import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Avatar, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import "./ViewProfile.css";

function ViewProfile() {
  const [userData, setUserData] = useState("");
  const [isFriend, setIsFriend] = useState(true);
  const params = useParams();

  useEffect(() => {
    const username = params.username;
    if (username !== "")
      axiosInstance.get(`/search/${username}`).then((response) => {
        console.log(response.data.data);
        setUserData(response.data.data.user);

        if (response.data.data.user.friends.some((ele) => ele === response.data.data.currentUser.username)) {
          setIsFriend(true);
        } else {
          setIsFriend(false);
        }
      });
  }, [params]);

  function handleAddFriend(username) {
    axiosInstance
      .post("/sendFriendRequest", { username })
      .then((response) => console.log(response), alert("Friend Request Sent"));
  }

  return (
    <div className="userProfile">
      <div className="userProfile__Box">
        <div className="userProfile__boxLeft">
          <div className="userProfile__boxLeftMain">
            <Avatar />
            <h3>{userData.username}</h3>
            {!isFriend && (
              <IconButton onClick={() => handleAddFriend(userData.username)}>
                <PersonAddAlt1Icon style={{ width: "3vw", height: "3vw", "margin-top": "3vw" }} />
              </IconButton>
            )}
          </div>
        </div>
        <div className="userProfile__boxRight">
          <div className="userProfile__rightInfo">
            <h2>Information</h2>

            <div className="userProfile__rightEmail">
              <h3 className="userProfile__title">Username</h3>
              <p className="userProfile__titleInfo">{userData.username}</p>
            </div>

            <div className="userProfile__rightEmail">
              <h3 className="userProfile__title">Email</h3>
              <p className="userProfile__titleInfo">{userData.email}</p>
            </div>

            <div className="userProfile__rightEmail">
              <h3 className="userProfile__title">Date of Birth</h3>
              <p className="userProfile__titleInfo">{userData.dob === undefined ? "Not Set" : userData.dob}</p>
            </div>
            <div className="userProfile__rightEmail">
              <h3 className="userProfile__title">Working Status</h3>
              <p className="userProfile__titleInfo">
                {userData.workingStatus === undefined ? "Not Set" : userData.workingStatus}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
