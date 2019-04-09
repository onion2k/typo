import React, { useContext } from "react";
import SplitContext from "../Split";

import "./Typo.css";

const cssdata = require("../ctf.json");
const cssTextFeatures = cssdata.cssTextFeatures;

export default function Typo(data) {
  let split = useContext(SplitContext);

  let clipPath = "";
  let style = {};

  if (data.copy) {
    clipPath = `polygon(${split.split}px 0, 100vw 0, 100vw 100vh, ${
      split.split
    }px 100vh)`;
  }

  if (data.style) {
    cssTextFeatures.forEach(s => {
      style[s.name] = data.style[s.name];
    });
  }

  return (
    <div
      className={`typo ${data.copy ? "copy" : "original"}`}
      style={{ clipPath }}
    >
      <span className="title">{data.title}</span>
      <div className="content" style={style}>
        { data.content }
      </div>
    </div>
  );
}
