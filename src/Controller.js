import React from "react";
import "./Controller.css";

const cssTextFeatures = [
  { name: "fontFamily", label: "Font Family" },
  { name: "fontSize", label: "Font Size" },
  { name: "color", label: "Color" },
  { name: "letterSpacing", label: "Letter Spacing" },
  { name: "lineHeight", label: "Line Height" }
];

export default function Controller(data) {
  const update = e => {
    const style = { ...data.style };
    style[e.target.name] = e.target.value;
    data.update({ ...style });
  };

  const settings = cssTextFeatures.map(s => {
    return (
      <React.Fragment key={s.name}>
        <label htmlFor={s.name}>{s.label}</label>
        <input
          name={s.name}
          type="text"
          onChange={update}
          value={data.style[s.name] || "inherit"}
        />
        <button onClick={()=>data.transfer(s.name, data.style[s.name])}>⇌</button>
      </React.Fragment>
    );
  });

  return (
    <div className="controller">
      {settings}
    </div>
  );
}
