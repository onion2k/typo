import React, { useContext } from "react";
import SplitContext from "../Split";

import "./Typo.css";

export default function Typo(data) {
  const { background, foreground, diff, content, style, title, copy } = data;

  let split = useContext(SplitContext);

  let typoStyle = {};

  if (data.copy) {
    typoStyle.clipPath = `polygon(${split.split}px 0, 100vw 0, 100vw 100vh, ${
      split.split
    }px 100vh)`;
  }

  typoStyle.color = foreground;
  typoStyle.backgroundColor = background;
  if (diff) {
    typoStyle.mixBlendMode = "exclusion";
  }

  return (
    <div
      className={`typo ${copy ? "copy" : "original"}`}
      style={{ ...typoStyle }}
    >
      <span className="title">{title}</span>
      <div
        className="content"
        style={style}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
