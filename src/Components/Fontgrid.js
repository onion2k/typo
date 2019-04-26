import React, { useContext } from "react";
import SplitContext from "../Split";
import "./Fontgrid.css";

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

  let tempStyle = Object.assign({}, style);
  tempStyle.maxWidth = "inherit";

  const offset = 32;

  const charmap = Array.from(Array(26 * 10).keys()).map((p, i) => {
    return <span>{String.fromCharCode(offset + i)}</span>;
  });

  return (
    <div
      className={`fontgrid ${copy ? "copy" : "original"}`}
      style={{ ...typoStyle }}
    >
      <span className="title">{title}</span>
      <div style={tempStyle}>{charmap}</div>
    </div>
  );
}
