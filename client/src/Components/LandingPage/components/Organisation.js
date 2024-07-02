import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import "./Organisation.css";

function OrganisationPage({ title, setTitle, setindex }) {
  return (
    <div className="landingPage__mainAreaLeft__organisation">
      <div className="landingPage__mainAreaLeft__organisationBox ">
        <OrganisationsList title={title} setTitle={setTitle} setindex={setindex} />
      </div>
    </div>
  );
}

function OrganisationsList({ title, setTitle, setindex }) {
  const [activeOrganisation, setActiveOrganisation] = useState(0);
  const [organisations, setOrganisations] = useState([]);

  useEffect(() => {
    axiosInstance.get("/organisations").then((response) => {
      console.log(response.data);
      setOrganisations(response.data);
    });
  }, []);

  function handleActiveOrganisation(id, name) {
    setActiveOrganisation(id);
    setTitle(name);
    setindex(1);
  }

  return (
    <ul className="landingPage__mainAreaLeft__channelList ">
      {organisations.map((orgName, index) => (
        <li>
          <Organisation
            organisationName={orgName}
            k={index}
            activeOrganisation={activeOrganisation}
            handleActiveOrganisation={handleActiveOrganisation}
          />
        </li>
      ))}
    </ul>
  );
}

function Organisation({ handleActiveOrganisation, organisationName, k, activeOrganisation }) {
  return (
    <div>
      <Link to={`/organisation/${organisationName}`}>
        <button
          className={
            activeOrganisation === k
              ? "landingPage__mainAreaLeft__channelListItem landingPage__mainAreaLeft__channelList__selectedChannel"
              : "landingPage__mainAreaLeft__channelListItem landingPage__mainAreaLeft__channelList__nonSelected"
          }
          onClick={() => handleActiveOrganisation(k, organisationName)}
        >
          <h4 className="channel__name">{organisationName}</h4>
        </button>
      </Link>
    </div>
  );
}

export default OrganisationPage;
