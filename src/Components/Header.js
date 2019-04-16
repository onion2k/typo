import React, { useState, useCallback } from "react";
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

export default function Header({ setContent }) {
  const [loadfont, setLoadfont] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const fontLoader = addFont(file);

      fontLoader.then(font => {
        const fontFace = new FontFace("custom", font);
        fontFace.load();
        document.fonts.add(fontFace);

        setLoadfont(false);

        // const originalStyle = { ...original };
        // originalStyle["fontFamily"] = "custom";
        // setOriginal({ ...originalStyle });

        // const copyStyle = { ...copy };
        // copyStyle["fontFamily"] = "custom";
        // setCopy({ ...copyStyle });
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
          className={`dropzone ${isDragActive ? "drag" : ""}`}
          {...getRootProps()}
          onClick={() => {
            setLoadfont(false);
          }}
        >
          Drop a font on the page to load
          <br />
          or click to cancel.
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
        <button className="settings">Settings</button>
      </div>
    </header>
  );
}
