import React, { useState, useCallback, useRef } from "react";
import path from "path";
import { useDropzone } from "react-dropzone";
import "./Header.css";

const cssdata = require("../ctf.json");
const cssTextFeatures = cssdata.cssTextFeatures;

function addFont(file) {
  return new Promise((resolve, reject) => {
    const fr = new FileReader();
    fr.onabort = () => console.log("file reading was aborted");
    fr.onerror = () => console.log("file reading has failed");
    fr.onload = () => {
      resolve(fr.result);
    };
    fr.readAsArrayBuffer(file);
  });
}

export default function Header({
  content,
  foreground,
  background,
  diff,
  updateFont,
  updateSettings
}) {
  const [loadfont, setLoadfont] = useState(false);
  const [settings, setSettings] = useState(true);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const fontLoader = addFont(file);
      const fontName = file.name.substr(
        0,
        file.name.length - path.extname(file.name).length
      );

      fontLoader.then(font => {
        const fontFace = new FontFace(fontName, font);
        fontFace.load();
        document.fonts.add(fontFace);

        setLoadfont(false);
        updateFont(fontName);
      });
    });
  }, []);

  const { getRootProps, isDragActive } = useDropzone({
    onDrop
  });

  const contentRef = useRef(null);
  const foregroundRef = useRef(null);
  const backgroundRef = useRef(null);
  const diffRef = useRef(null);

  return (
    <header className="typo-header">
      {loadfont && (
        <div
          className={`dialog dropzone ${isDragActive ? "drag" : ""}`}
          {...getRootProps()}
          onClick={() => {
            setLoadfont(false);
          }}
        >
          Drop a font on the page to load
          <span>or click anywhere to cancel</span>
        </div>
      )}
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
                Update Settings
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
            setLoadfont(true);
          }}
        >
          Load Fonts
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
