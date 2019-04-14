import React from "react";
import "./Properties.css";

const cssdata = require("../ctf.json");
const cssTextFeatures = cssdata.cssTextFeatures;

export default function Properties(data) {
  
  const { view, style, update, transfer } = data;
  
  const change = e => {
    const newstyle = { ...style };
    newstyle[e.target.name] = e.target.value;
    update({ ...newstyle });
  };
  
  const properties = cssTextFeatures.map(s => {
    if (view==='simplified' && s.simple!==true) { return null; }
    let input = (
      <input
        name={s.name}
        type="text"
        onChange={change}
        placeholder="inherit"
        value={style[s.name]}
      />
    );
    if (s.options) {
      input = (
        <select name={s.name} onChange={change} value={style[s.name]}>
          {s.options.map(o => {
            return (
              <option key={o} value={o}>
                {o}
              </option>
            );
          })}
          <option key={"inherit"} value={"inherit"}>
            {"inherit"}
          </option>
          <option key={"initial"} value={"initial"}>
            {"initial"}
          </option>
          <option key={"unset"} value={"unset"}>
            {"unset"}
          </option>
        </select>
      );
    }
    return (
      <React.Fragment key={s.name}>
        <label htmlFor={s.name}>
          <a
            target="_BLANK"
            href={`https://developer.mozilla.org/en-US/docs/Web/CSS/${s.label}`}
            rel="noopener noreferrer"
          >
            {s.label}
          </a>
        </label>
        {input}
        <button onClick={() => transfer(s.name, style[s.name])}>
          ⇌
        </button>
      </React.Fragment>
    );
  });

  return <div className="properties">{properties}</div>;
}
