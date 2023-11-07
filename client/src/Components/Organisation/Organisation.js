import { useState, useEffect } from "react";
import "./Organisation.css";
import Header from "./components/Header";
import MainArea from "./components/MainArea";
import { useParams } from "react-router-dom";

function Organisation() {
  const [organisationName, setOrganisationName] = useState();
  const params = useParams();

  useEffect(() => {
    setOrganisationName(params.organisationName);
  }, [params]);

  return (
    <div className="Organisation">
      <Header />
      <MainArea organisationName={organisationName} />
    </div>
  );
}

export default Organisation;
