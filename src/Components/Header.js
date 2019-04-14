import React from "react";
import "./Header.css";

import cog from "../assets/cog.svg";

const cssdata = require("../ctf.json");
const cssTextFeatures = cssdata.cssTextFeatures;

export default function Header({setContent}) {
  return (
    <header className="typo-header">
      <h1>Typo
      <span>Explore {cssTextFeatures.length} CSS properties for text</span>
      </h1>
      <div className="options">
        <img src={cog} width={24} height={24} />
      </div>
    </header>
  );
}
