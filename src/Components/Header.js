import React, { useState, useRef } from "react";
import "./Header.css";

const cssdata = require("../ctf.json");
const cssTextFeatures = cssdata.cssTextFeatures;

export default function Header({
  content,
  foreground,
  background,
  diff,
  updateSettings,
  fontgrid,
  setFontgrid
}) {
  const [settings, setSettings] = useState(false);

  const contentRef = useRef(null);
  const foregroundRef = useRef(null);
  const backgroundRef = useRef(null);
  const diffRef = useRef(null);

  return (
    <header className="typo-header">
      {settings && (
        <div
          className={`dialog settings`}
          onClick={() => {
            setSettings(false);
          }}
        >
          <div
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <h2>Settings</h2>
            <label>
              <span className="content">Content</span>
              <textarea ref={contentRef} defaultValue={content} />
            </label>
            <label>
              <span>Text Color</span>
              <input
                type="text"
                defaultValue={foreground}
                ref={foregroundRef}
              />
            </label>
            <label>
              <span>Background</span>
              <input
                type="text"
                defaultValue={background}
                ref={backgroundRef}
              />
            </label>
            <label>
              <span>Visual Diff</span>
              <input
                type="checkbox"
                defaultChecked={diff}
                ref={diffRef}
                onClick={e => {
                  e.stopPropagation();
                }}
                className="vdiff"
              />
            </label>
            <label className="update">
              <button
                onClick={e => {
                  updateSettings({
                    content: contentRef.current.value,
                    foreground: foregroundRef.current.value,
                    background: backgroundRef.current.value,
                    diff: diffRef.current.checked
                  });
                  setSettings(false);
                }}
              >
                Update and close
              </button>
            </label>
          </div>
        </div>
      )}
      <h1>
        Typo
        <span>Explore {cssTextFeatures.length} CSS properties for text</span>
      </h1>
      <div className="options">
        <button
          onClick={() => {
            setFontgrid(!fontgrid);
          }}
        >
          {!fontgrid ? "Show Font Grid" : "Show Content"}
        </button>
        <button
          onClick={() => {
            setSettings(true);
          }}
        >
          Settings
        </button>
      </div>
    </header>
  );
}
