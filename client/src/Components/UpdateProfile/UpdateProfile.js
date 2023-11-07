import { useEffect, useState } from "react";
import "./UpdateProfile.css";
import "./New.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const [userData, setUserData] = useState("");
  const [enabledFields, setEnabledFields] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/viewProfile").then((response) => {
      console.log(response.data.data);
      setUserData(response.data.data);
      setUsername(response.data.data.username);
      setName(response.data.data.name);
      setDob(response.data.data.dob);
      setWorkingStatus(response.data.data.workingStatus);
      setEmail(response.data.data.email);
    });
  }, []);

  const [username, setUsername] = useState(userData.username);
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [dob, setDob] = useState(userData.dob);
  const [workingStatus, setWorkingStatus] = useState(userData.workingStatus);

  function handleUpdate() {
    setEnabledFields((old) => !old);
    console.log(dob);
  }
  return (
    <div>
      <h2 className="head">Your Profile</h2>
      <div className="flx-container">
        <LeftBox
          userData={userData}
          enabledFields={enabledFields}
          setEnabledFields={setEnabledFields}
          handleUpdate={handleUpdate}
        />
        <RightBox
          userData={userData}
          enabledFields={enabledFields}
          username={username}
          name={name}
          email={email}
          workingStatus={workingStatus}
          dob={dob}
          setUsername={setUsername}
          setEmail={setEmail}
          setDob={setDob}
          setWorkingStatus={setWorkingStatus}
          setName={setName}
        />
      </div>
    </div>
  );
}

function RightBox({
  userData,
  enabledFields,
  username,
  name,
  email,
  dob,
  workingStatus,
  setUsername,
  setDob,
  setEmail,
  setWorkingStatus,
  setName,
}) {
  console.log(userData);

  return (
    <>
      <div className="big__box">
        <div className="profile__area">
          <h3 className="profile__name">Profile</h3>
        </div>
        <div className="input__box">
          {/* <form className="form__input"> */}
          <div className="job__role fl">
            <label className="jobrole left" htmlFor="jobrole">
              Name
            </label>
            <input
              className="jobrolee right input"
              type="text"
              id="jobrole"
              name="jobrole"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={enabledFields ? false : true}
            />
          </div>

          <div className="user__name fl">
            <label className="username left" htmlFor="username">
              Username
            </label>
            <input
              className="username right input"
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={enabledFields ? false : true}
            />
          </div>
          <div className="e__mail fl">
            <label className="email left" htmlFor="email">
              E-mail
            </label>
            <input
              className="email right input"
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={enabledFields ? false : true}
            />
          </div>
          <div>
            <div className="bir__gen">
              <div className="birth__ fl">
                <label className="birth left" htmlFor="birth">
                  Birth-Date
                </label>
                <input
                  className="birth right input"
                  type="date"
                  id="birth"
                  name="birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  disabled={enabledFields ? false : true}
                />
              </div>
            </div>
          </div>
          <div className="married__ fl">
            <label className="married left" htmlFor="married">
              Working Status
            </label>
            <input
              className="married right input"
              type="text"
              id="married"
              name="married"
              value=""
              onChange={(e) => setWorkingStatus(e.target.value)}
              disabled={enabledFields ? false : true}
            />
          </div>
          {/* </form> */}
        </div>
      </div>
    </>
  );
}

function LeftBox({ userData, setEnabledFields, enabledFields, handleUpdate }) {
  const navigate = useNavigate();
  function handleLogoutButton() {
    if (!enabledFields) {
      axios.get("http://localhost:5000/logout").then((response) => {
        if (response.data.status === "success") {
          navigate("/login");
        }
      });
    } else {
      setEnabledFields(false);
    }
  }

  return (
    <div class="card">
      <div class="banner"></div>
      {/* <div class="menu">
        <div class="opener">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div> */}
      <h2 class="name">{userData.username}</h2>
      <div class="actions">
        <div class="follow-info">
          <h2>
            <a href="#">
              {console.log(userData)}
              <span>{userData !== "" && userData.friends.length}</span>
              <small>Friends</small>
            </a>
          </h2>
          <h2>
            <a href="#">
              <span>{userData !== "" && userData.organisations.length}</span>
              <small>Organisations</small>
            </a>
          </h2>
        </div>
        <div class="follow-btn">
          <button onClick={() => handleUpdate()}>{enabledFields ? "Save Changes" : "Update Profile"}</button>
        </div>

        <div class="follow-btn logout">
          <button onClick={() => handleLogoutButton()}>{enabledFields ? "Cancel" : "Logout"}</button>
        </div>
      </div>
      <div class="desc">
        Morgan has collected ants since they were six years old and now has many dozen ants but none in their pants.
      </div>
    </div>
  );
}

export default UpdateProfile;
