import React from "react";
import "./Controller.css";

const cssdata = require("../ctf.json");
const cssTextFeatures = cssdata.cssTextFeatures;

export default function Controller(data) {
  const update = e => {
    const style = { ...data.style };
    style[e.target.name] = e.target.value;
    data.update({ ...style });
  };

  const settings = cssTextFeatures.map(s => {
    let input = (
      <input
        name={s.name}
        type="text"
        onChange={update}
        placeholder="inherit"
        value={data.style[s.name]}
      />
    );
    if (s.options) {
      input = (
        <select name={s.name} onChange={update} value={data.style[s.name]}>
          {s.options.map(o => {
            return (
              <option key={o} value={o}>
                {o}
              </option>
            );
          })}
          <option key={"inherit"} value={"inherit"}>{"inherit"}</option>
          <option key={"initial"} value={"initial"}>{"initial"}</option>
          <option key={"unset"} value={"unset"}>{"unset"}</option>
        </select>
      );
    }
    return (
      <React.Fragment key={s.name}>
        <label htmlFor={s.name}><a target="_BLANK" href={`https://developer.mozilla.org/en-US/docs/Web/CSS/${s.label}`}>{s.label}</a></label>
        {input}
        <button onClick={() => data.transfer(s.name, data.style[s.name])}>
          ⇌
        </button>
      </React.Fragment>
    );
  });

  return <div className="controller">{settings}</div>;
}
