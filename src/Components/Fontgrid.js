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

  return (
    <div
      className={`fontgrid ${copy ? "copy" : "original"}`}
      style={{ ...typoStyle }}
    >
      <span className="title">{title}</span>
      <div style={tempStyle}>
        <span>A</span>
        <span>B</span>
        <span>C</span>
        <span>D</span>
        <span>E</span>
        <span>F</span>
        <span>G</span>
        <span>H</span>
        <span>I</span>
        <span>J</span>
        <span>K</span>
        <span>L</span>
        <span>M</span>

        <span>a</span>
        <span>b</span>
        <span>c</span>
        <span>d</span>
        <span>e</span>
        <span>f</span>
        <span>g</span>
        <span>h</span>
        <span>i</span>
        <span>j</span>
        <span>k</span>
        <span>l</span>
        <span>m</span>

        <span>N</span>
        <span>O</span>
        <span>P</span>
        <span>Q</span>
        <span>R</span>
        <span>S</span>
        <span>T</span>
        <span>U</span>
        <span>V</span>
        <span>W</span>
        <span>X</span>
        <span>Y</span>
        <span>Z</span>

        <span>n</span>
        <span>o</span>
        <span>p</span>
        <span>q</span>
        <span>r</span>
        <span>s</span>
        <span>t</span>
        <span>u</span>
        <span>v</span>
        <span>w</span>
        <span>x</span>
        <span>y</span>
        <span>z</span>

        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
        <span>7</span>
        <span>8</span>
        <span>9</span>
        <span>0</span>
        <span>.</span>
        <span>,</span>
        <span />
      </div>
    </div>
  );
}
