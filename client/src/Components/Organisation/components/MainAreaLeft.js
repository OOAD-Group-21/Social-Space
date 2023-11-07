import React, { useState, useEffect } from "react";
import "./MainAreaLeft.css";
import Organisation from "./Organisation";
import Orglist2 from "./Orglist2";
import axios from "axios";
import { Link } from "react-router-dom";

function MainAreaLeft({ title, setTitle, organisationData, organisationName }) {
  const [orgDrop, setOrgDrop] = useState(false);
  const [organisations, setOrganisations] = useState("");
  useEffect(() => {
    axios.get("http://localhost:5000/organisations").then((response) => {
      console.log(response.data);
      setOrganisations(response.data);
    });
  }, []);

  return (
    <>
      <div className="landingPage__mainAreaLeft">
        {orgDrop === false ? (
          <Organisation title={title} setTitle={setTitle} setorgdrop={setOrgDrop} organisationData={organisationData} />
        ) : (
          <Orglist2 setorgdrop={setOrgDrop} organisations={organisations} />
        )}

        <div className="landingpage_left_buttons">
          <Link to={`/organisation/${organisationName}/createchannel`}>
            <button className="org-twofixedbuttons">Create Channel</button>
          </Link>
          <button className="org-twofixedbuttons">Join Channel</button>
          <button className="org-twofixedbuttons">Change Role</button>
        </div>
      </div>
    </>
  );
}

export default MainAreaLeft;
