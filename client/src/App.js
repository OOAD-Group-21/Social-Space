import "./App.css";
import { useState, useEffect } from "react";

function App() {
    const [backendData, setBackendData] = useState([{}]);

    useEffect(() => {
        fetch("/api")
            .then((response) => response.json())
            .then((data) => setBackendData(data));
    }, []);
    return <div>{typeof backendData.user === "undefined" ? <p>Hi</p> : <p>{backendData.user}</p>}</div>;
}

export default App;
