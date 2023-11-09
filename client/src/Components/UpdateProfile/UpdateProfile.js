import { useEffect, useState } from "react";
import "./UpdateProfile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UpdateProfile() {
  const [userData, setUserData] = useState("");
  const [enabledFields, setEnabledFields] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/viewProfile").then((response) => {
      setUserData(response.data.data);
      setUsername(response.data.data.username);
      setName(response.data.data.name);
      setDob(
        response.data.data.dateofbirth !== undefined
          ? new Date(response.data.data.dateofbirth).toISOString().substring(0, 10)
          : ""
      );

      setWorkingStatus(response.data.data.workingstatus);
      setEmail(response.data.data.email);
    });
  }, []);

  const [username, setUsername] = useState("");
  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [dob, setDob] = useState("");
  const [workingStatus, setWorkingStatus] = useState(userData.workingStatus);

  function handleUpdate() {
    setEnabledFields((old) => !old);
    if (enabledFields) {
      const data = {
        username,
        email,
        name,
        dateofbirth: new Date(dob),
        workingstatus: workingStatus,
      };
      axios.post("http://localhost:5000/updateMyProfile", data).then((response) => {
        alert("Profile updated");
      });
    }
  }
  return (
    <div className="body_123">
      <div className="fntsize">Social-Space</div>
      <h2 className="head">Your Profile</h2>
      <div className="flx-container-1 f2c2">
        <LeftBox
          userData={userData}
          enabledFields={enabledFields}
          setEnabledFields={setEnabledFields}
          handleUpdate={handleUpdate}
        />
        <RightBox
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
  return (
    <>
      <div className="big__box">
        <div className="profile__area">
          <h3 className="profile__name">Profile</h3>
        </div>
        <div className="input__box">
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
              value={workingStatus}
              onChange={(e) => setWorkingStatus(e.target.value)}
              disabled={enabledFields ? false : true}
            />
          </div>
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
    <div class="card__123">
      <div class="banner_123"></div>

      <h2 class="name_123">{userData.username}</h2>
      <div class="actions_123">
        <div class="follow-info_123 flexaddkarnahai">
          <h2>
            <span>{userData !== "" && userData.friends.length}</span>
            <small>Friends</small>
          </h2>
          <h2>
            <span>{userData !== "" && userData.organisations.length}</span>
            <small>Organisations</small>
          </h2>
        </div>
        <div className="buttons-logout">
          <div class="follow-btn_123 button-marginchange">
            <button onClick={() => handleUpdate()}>{enabledFields ? "Save Changes" : "Update Profile"}</button>
          </div>

          <div class="follow-btn_123 logout_123 button-marginchange">
            <button onClick={() => handleLogoutButton()}>{enabledFields ? "Cancel" : "Logout"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
