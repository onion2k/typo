import React, { useContext } from "react";
import SplitContext from "../Split";

import "./Typo.css";

const cssdata = require("../ctf.json");
const cssTextFeatures = cssdata.cssTextFeatures;

export default function Typo(data) {
  
  const { background, foreground, content, style, title, copy} = data;
  
  let split = useContext(SplitContext);

  let typoStyle = {};
  let tempStyle = {};

  if (data.copy) {
    typoStyle.clipPath = `polygon(${split.split}px 0, 100vw 0, 100vw 100vh, ${
      split.split
    }px 100vh)`;
  }

  if (style) {
    cssTextFeatures.forEach(s => {
      tempStyle[s.name] = style[s.name];
    });
  }
  
  typoStyle.color = foreground;
  typoStyle.backgroundColor = background;

  return (
    <div
      className={`typo ${copy ? "copy" : "original"}`}
      style={{ ...typoStyle }}
    >
      <span className="title">{title}</span>
      <div className="content" style={tempStyle}>
        {content}
      </div>
    </div>
  );
}
