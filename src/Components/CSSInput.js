import React, { useState, useEffect } from "react";

const length = /^((\d+)\.?(\d?))(em|rem|px)$/;

export default function CSSInput({ name, value, type, placeholder, change }) {
  let [statevalue, setStateValue] = useState(value);

  useEffect(() => {
    setStateValue(value);
  }, [value]);

  useEffect(() => {
    const p = {
      target: {
        name: name,
        value: statevalue
      }
    };
    change(p);
  }, [name, statevalue, change]);

  const onKeyUp = e => {
    if (e.keyCode === 38 || e.keyCode === 40) {
      let mod = 1;
      if (e.keyCode === 40) {
        mod = -1;
      }
      updateStateValue(mod);
    }
  };

  const onWheel = e => {
    // e.preventDefault();
    let mod = 1;
    if (e.deltaY > 0) {
      mod = -1;
    }
    updateStateValue(mod);
  };

  const updateStateValue = mod => {
    if (!value) return;
    let [val, whole, quantity, fraction, unit] = statevalue.match(length);
    let newval;
    if (fraction) {
      newval = parseFloat(whole) + mod * 0.1;
      newval = newval.toFixed(1);
    } else {
      newval = parseFloat(whole) + mod;
    }
    setStateValue(`${newval}${unit}`);
  };

  const onChange = e => {
    setStateValue(e.target.value);
  };

  return (
    <input
      onKeyUp={onKeyUp}
      onWheel={onWheel}
      onChange={onChange}
      type="text"
      name={name}
      placeholder={placeholder}
      value={statevalue}
      autoComplete={"off"}
      spellCheck={"false"}
    />
  );
}
