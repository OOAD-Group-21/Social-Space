import React from "react";
import "./search__results.css";
import { Avatar } from "@mui/material";

function search__results({ results, setActiveDM }) {
  return (
    <div className="search__results">
      <ul className="search__results__listUL">
        {results.map((ele) => (
          <li className="search__results__itemUL">
            <button
              onClick={() => setActiveDM(ele)}
              style={{ width: "100%", "padding-left": "41px", border: "none" }}
            >
              <div className="ULresult__item">
                <Avatar style={{ margin: "14px 10px" }} />
                <h4>{ele}</h4>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default search__results;
