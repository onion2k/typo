import React, { useContext } from "react";
import SplitContext from "../Split";

import "./Typo.css";

const cssdata = require("../ctf.json");
const cssTextFeatures = cssdata.cssTextFeatures;

export default function Typo(data) {
  
  const { content, style, title, copy} = data;
  
  let split = useContext(SplitContext);

  let clipPath = "";
  let tempStyle = {};

  if (data.copy) {
    clipPath = `polygon(${split.split}px 0, 100vw 0, 100vw 100vh, ${
      split.split
    }px 100vh)`;
  }

  if (style) {
    cssTextFeatures.forEach(s => {
      tempStyle[s.name] = style[s.name];
    });
  }

  return (
    <div
      className={`typo ${copy ? "copy" : "original"}`}
      style={{ clipPath }}
    >
      <span className="title">{title}</span>
      <div className="content" style={style}>
        {content}
      </div>
    </div>
  );
}
