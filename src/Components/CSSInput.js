import React, { useState, useEffect, useRef } from "react";

const length = /^((\d+)\.?(\d?))(em|rem|px)$/;

export default function CSSInput({ name, value, type, placeholder, update }) {
  const ref = useRef(null);
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
    update(p);
  }, [name, statevalue, update]);

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
    e.preventDefault();
    let mod = 1;
    if (e.deltaY > 0) {
      mod = -1;
    }
    updateStateValue(mod);
  };

  const updateStateValue = mod => {
    if (!value) return;
    let [val, whole, quantity, fraction, unit] = value.match(length);
    if (fraction) {
      whole = parseFloat(whole) + mod * 0.1;
      whole = whole.toFixed(1);
    } else {
      whole = parseFloat(whole) + mod;
    }
    setStateValue(`${whole}${unit}`);
  };

  const onChange = e => {
    setStateValue(e.target.value);
  };

  return (
    <input
      ref={ref}
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
