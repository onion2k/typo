import React from "react";

export default function Examples(data) {
  const { style, update } = data;

  return (
    <div className="examples">
      <button
        onClick={() => {
          update({
            ...style,
            ...{ writingMode: "vertical-rl", transform: "rotate(-180deg)" }
          });
        }}
      >
        Vertical (Left)
      </button>
    </div>
  );
}
