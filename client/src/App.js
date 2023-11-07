import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import LandingPage from "./Components/LandingPage/LandingPage";
import Organisation from "./Components/Organisation/Organisation";
import CreateOrganisation from "./Components/CreateOrganisation/CreateOrganisation";
import CreateChannel from "./Components/CreateChannel/CreateChannel";
import DMs from "./Components/DMs/DMs";
import { useState } from "react";

function App() {
  const [showNotiList, setShowNotiList] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route
          path="home"
          element={<LandingPage showNotiList={showNotiList} setShowNotiList={setShowNotiList} />}
        ></Route>
        <Route
          path="organisation/:organisationName"
          element={<Organisation showNotiList={showNotiList} setShowNotiList={setShowNotiList} />}
        ></Route>
        <Route path="createorganisation" element={<CreateOrganisation />}></Route>
        <Route path="organisation/:organisationName/createchannel" element={<CreateChannel />}></Route>
        <Route path="DMs" element={<DMs showNotiList={showNotiList} setShowNotiList={setShowNotiList} />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
