import React, { useContext } from "react";
import SplitContext from "../Split";

export default function Fontgrid(data) {
  const { background, foreground, diff, style, title, copy } = data;

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
    typoStyle.mixBlendMode = "difference";
  }

  return (
    <div
      className={`typo ${copy ? "copy" : "original"}`}
      style={{ ...typoStyle }}
    >
      <span className="title">{title}</span>
      <div
        style={style}
      >
        <span>A</span>
        <span>B</span>
        <span>C</span>
        <span>D</span>
      </div>
    </div>
  );
}
