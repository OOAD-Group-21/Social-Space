import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import LandingPage from "./Components/LandingPage/LandingPage";
import Organisation from "./Components/Organisation/Organisation";
import CreateOrganisation from "./Components/CreateOrganisation/CreateOrganisation";
import CreateChannel from "./Components/CreateChannel/CreateChannel";
import DMs from "./Components/DMs/DMs";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="home" element={<LandingPage />}></Route>
        <Route path="organisation/:organisationName" element={<Organisation />}></Route>
        <Route path="createorganisation" element={<CreateOrganisation />}></Route>
        <Route path="organisation/:organisationName/createchannel" element={<CreateChannel />}></Route>
        <Route path="DMs" element={<DMs />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
