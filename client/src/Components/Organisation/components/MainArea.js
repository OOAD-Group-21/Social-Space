import React, { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import "./MainArea.css";
import MainAreaLeft from "./MainAreaLeft";
import MainAreaRight from "./MainAreaRight";

function MainArea({ organisationName }) {
  const [organisationData, setOrganisationData] = useState("");
  const [channelData, setChannelData] = useState([]);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState("Welcome to Social Space");

  useEffect(() => {
    if (organisationName !== "") {
      console.log(organisationName);
      axiosInstance
        .get(`/organisation/${organisationName}`)
        .then((response) => {
          setOrganisationData(response.data);
        })
        .catch((err) => console.log(err));
    }
  }, [organisationName]);

  useEffect(() => {
    if (organisationData) {
      console.log(organisationData);
      organisationData.channels.map((channel) => {
        axiosInstance.get(`/organisation/${organisationName}/channel/${channel}`).then((response) => {
          setChannelData((list) => [...list, response.data.channel]);
          setUsername(response.data.currentUser.username);
        });
      });
    }
  }, [organisationData]);

  return (
    <div className="landingPage__mainArea">
      <MainAreaLeft
        title={title}
        setTitle={setTitle}
        organisationData={organisationData}
        organisationName={organisationName}
      />
      <MainAreaRight
        title={title}
        organisationData={organisationData}
        channelData={channelData}
        username={username}
        organisationName={organisationName}
      />
    </div>
  );
}

export default MainArea;
