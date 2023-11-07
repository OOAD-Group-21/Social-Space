import React from "react";
import "./MainAreaLeft.css";
import Organisation from "./Organisation";
import { Link } from "react-router-dom";

function MainAreaLeft({ title, setTitle, setindex, setjoinbox }) {
  return (
    <div className="landingPage__mainAreaLeft">
      <div className="dms-org">
        <div className="deff">
          <button className="org-dm-button">organizaion</button>
        </div>
        <MyButton />
      </div>
      <div>
        <Organisation title={title} setTitle={setTitle} setindex={setindex} />
      </div>
      <div className="landingpage_left_buttons">
        <Link to="/createorganisation">
          <button className="twofixedbuttons">create organization</button>
        </Link>
        <button className="twofixedbuttons" onClick={() => setjoinbox((old) => !old)}>
          join organization
        </button>
      </div>
    </div>
  );
}

function MyButton() {
  return (
    <div className="deff">
      <Link to="/DMs">
        <button className="org-dm-button dms_btn">DMs</button>
      </Link>
    </div>
  );
}

export default MainAreaLeft;
