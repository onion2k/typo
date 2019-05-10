import React, { useState } from "react";
import Properties from "./Properties";
import CSS from "./CSS";
import Examples from "./Examples";
import "./Controller.css";

export default function Controller(data) {
  const { id } = data;

  const [view, setView] = useState("simplified");

  const renderProperties = () => {
    switch (view) {
      case "css":
        return <CSS {...data} />;
      case "examples":
        return <Examples {...data} />;
      default:
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
              value="examples"
              checked={view === "examples"}
              onChange={() => {
                setView("examples");
              }}
            />{" "}
            <span>Examples</span>
          </label>
        </div>
        <div>
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
              value="css"
              checked={view === "css"}
              onChange={() => {
                setView("css");
              }}
            />{" "}
            <span>View As CSS</span>
          </label>
        </div>
      </div>
      {renderProperties()}
      <div className="controller-footer">
        Drop a font file on the style area to load a custom font
      </div>
    </div>
  );
}
