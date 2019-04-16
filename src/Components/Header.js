import React from "react";
import "./Header.css";

const cssdata = require("../ctf.json");
const cssTextFeatures = cssdata.cssTextFeatures;

export default function Header({ setContent }) {
  return (
    <header className="typo-header">
      <h1>
        Typo
        <span>Explore {cssTextFeatures.length} CSS properties for text</span>
      </h1>
      <div className="options">
        <button className="settings">Settings</button>
      </div>
    </header>
  );
}
