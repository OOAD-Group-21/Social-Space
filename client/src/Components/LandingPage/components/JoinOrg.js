import React, { useState } from "react";
import axiosInstance from "../../axiosInstance";
import "./JoinOrg.css";

function JoinOrg({ setjoinbox }) {
  const [code, setCode] = useState("");

  function handleCode() {
    axiosInstance
      .post("/joinOrganisation", { code })
      .then((response) => {
        console.log(response);
        if (response.data.status === "success") {
          setjoinbox((old) => !old);
        } else {
          alert(response.data.message);
        }
      })
      .catch((err) => alert(err.response.data.message));
  }

  return (
    <div className="joinOrganisation">
      <div className="joinOrganisation__box">
        <div className="joinOrganisation__boxTop">
          <h3>Join Organisation</h3>
        </div>
        <div className="joinOrganisation__boxBottom">
          <div className="joinOrganisation__searchBox">
            <h4>Organisation Code</h4>
            <input
              className="joinOrganisation__input"
              type="text"
              placeholder="Write Code"
              onChange={(e) => setCode(e.target.value)}
              onKeyUp={(event) => {
                event.key === "Enter" && handleCode();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default JoinOrg;
