import React, { useContext, useState } from "react";
import SplitContext from "../Split";

export default function Divider() {
  let split = useContext(SplitContext);
  let [dragging, setDragging] = useState(false);

  const moveDivider = e => {
    if (dragging !== false) {
      split.update(e.clientX - 10);
    }
  };

  return (
    <div
      className="dividerMouseArea"
      onMouseMove={moveDivider}
      onMouseUp={e => setDragging(false)}
    >
      <div className="divider" style={{ left: split.split - 10 + "px" }}>
        <span className="handle" onMouseDown={e => setDragging(true)} />
      </div>
    </div>
  );
}
