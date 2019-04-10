import React, { useContext, useState } from "react";
import SplitContext from "../Split";
import "./Divider.css";

export default function Divider() {
  let split = useContext(SplitContext);
  let [dragging, setDragging] = useState(false);

  const moveDivider = e => {
    if (dragging !== false) {
      split.update(e.clientX);
    }
  };

  return (
    <div
      className="dividerMouseArea"
      onMouseMove={moveDivider}
      onMouseUp={e => setDragging(false)}
    >
      <div className="divider" style={{ left: split.split - 10 + "px" }}>
        <span
          className={`handle ${dragging ? "dragging" : ""}`}
          onMouseDown={e => setDragging(true)}
        >
          ⋮
        </span>
      </div>
    </div>
  );
}
