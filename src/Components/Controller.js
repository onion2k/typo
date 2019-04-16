import React, { useState } from "react";
import Properties from "./Properties";
import CSS from "./CSS";
import "./Controller.css";

function Radio(props) {
  return <input type="radio" {...props} />;
}

export default function Controller(data) {
  const { id } = data;

  const [view, setView] = useState("all");

  const renderProperties = () => {
    if (view === "css") {
      return <CSS {...data} />;
    } else {
      return <Properties {...data} view={view} />;
    }
  };

  return (
    <div className="controller">
      <div className="controller-options">
        <div>
          <label>
            <input
              type="radio"
              name={`view-${id}`}
              value="css"
              checked={view === "css"}
              onChange={() => {
                setView("css");
              }}
            />{" "}
            <span>View As CSS</span>
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name={`view-${id}`}
              value="all"
              checked={view === "all"}
              onChange={() => {
                setView("all");
              }}
            />{" "}
            <span>All Properties</span>
          </label>
          <label>
            <input
              type="radio"
              name={`view-${id}`}
              value="simplified"
              checked={view === "simplified"}
              onChange={() => {
                setView("simplified");
              }}
            />{" "}
            <span>Simplified</span>
          </label>
        </div>
      </div>
      {renderProperties()}
    </div>
  );
}
