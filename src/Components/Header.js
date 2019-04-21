import React, { useState, useCallback } from "react";
import path from 'path';
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

export default function Header({ setContent, updateFont }) {
  const [loadfont, setLoadfont] = useState(false);
  const [settings, setSettings] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const fontLoader = addFont(file);
      const fontName = file.name.substr(0, file.name.length - path.extname(file.name).length);

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
          <div onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}>
            <label>Content
            <textarea></textarea>
            </label>
            <label>Background
            <input type="text" value="#000"/>
            </label>
            <label>Text color
            <input type="text" value="#fff"/>
            </label>
            <label>
              <button>Update Settings</button>
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
          className="settings"
          onClick={() => {
            setLoadfont(true);
          }}
        >
          Load Fonts
        </button>
        <button className="settings" 
          onClick={() => {
            setSettings(true);
          }}>Settings</button>
      </div>
    </header>
  );
}
