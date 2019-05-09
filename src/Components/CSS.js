import React, { useContext } from "react";
import CssPropertiesContext from "../CssProperties";
import "./CSS.css";

export default function CSS(data) {
  const { style } = data;

  let { cssTextFeatures } = useContext(CssPropertiesContext);

  const css = cssTextFeatures.map(s => {
    if (!style[s.name]) {
      return null;
    }
    return (
      <p key={s.name}>
        {s.label.toLowerCase()}: {style[s.name]};
      </p>
    );
  });

  return <div className="css">{css}</div>;
}
