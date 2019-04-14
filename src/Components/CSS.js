import React from "react";
import "./CSS.css";

const cssdata = require("../ctf.json");
const cssTextFeatures = cssdata.cssTextFeatures;

export default function CSS(data) {
  
  const { style } = data;
      
  const css = cssTextFeatures.map(s => {
    if (!style[s.name]) { return null; }
    return <p key={s.name}>{s.label}: {style[s.name]}</p>;
  });

  return <div className="css">{css}</div>;
}
