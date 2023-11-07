import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import LandingPage from "./Components/LandingPage/LandingPage";
import Organisation from "./Components/Organisation/Organisation";
import CreateOrganisation from "./Components/CreateOrganisation/CreateOrganisation";
import CreateChannel from "./Components/CreateChannel/CreateChannel";
import DMs from "./Components/DMs/DMs";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import ViewProfile from "./Components/ViewProfile/ViewProfile";

function App() {
  const [showNotiList, setShowNotiList] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="login" />}></Route>

        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route
          path="home"
          element={
            <LandingPage
              showNotiList={showNotiList}
              setShowNotiList={setShowNotiList}
            />
          }
        ></Route>
        <Route
          path="organisation/:organisationName"
          element={
            <Organisation
              showNotiList={showNotiList}
              setShowNotiList={setShowNotiList}
            />
          }
        ></Route>
        <Route
          path="createorganisation"
          element={<CreateOrganisation />}
        ></Route>
        <Route
          path="organisation/:organisationName/createchannel"
          element={<CreateChannel />}
        ></Route>
        <Route
          path="DMs"
          element={
            <DMs
              showNotiList={showNotiList}
              setShowNotiList={setShowNotiList}
            />
          }
        ></Route>
        <Route path="user/:username" element={<ViewProfile />}></Route>
        <Route path="/updateProfile" element={<UpdateProfile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
