import React, { useContext, useCallback } from "react";
import CssPropertiesContext from "../CssProperties";
import path from "path";
import { useDropzone } from "react-dropzone";
import CSSInput from "./CSSInput";
import "./Properties.css";

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

// const cssdata = require("../ctf.json");
// const cssTextFeatures = cssdata.cssTextFeatures;

export default function Properties(data) {
  const { view, style, update, transfer, updateFont } = data;

  let { cssTextFeatures } = useContext(CssPropertiesContext);

  const change = e => {
    update({ ...style, [e.target.name]: e.target.value });
  };

  const onDrop = acceptedFiles => {
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
        updateFont(fontName, data.id === "original");
      });
    });
  };

  const { getRootProps, isDragActive } = useDropzone({
    onDrop
  });

  const properties = cssTextFeatures.map(s => {
    if (view === "simplified" && s.simple !== true) {
      return null;
    }
    let input = (
      <CSSInput
        name={s.name}
        change={change}
        placeholder="inherit"
        value={style[s.name]}
      />
    );
    if (s.options) {
      input = (
        <select name={s.name} onChange={change} value={style[s.name]}>
          {s.options.map(o => {
            return (
              <option key={o} value={o}>
                {o}
              </option>
            );
          })}
          <option key={"inherit"} value={"inherit"}>
            {"inherit"}
          </option>
          <option key={"initial"} value={"initial"}>
            {"initial"}
          </option>
          <option key={"unset"} value={"unset"}>
            {"unset"}
          </option>
        </select>
      );
    }
    return (
      <React.Fragment key={s.name}>
        <label htmlFor={s.name}>
          <a
            target="_BLANK"
            href={`https://developer.mozilla.org/en-US/docs/Web/CSS/${s.label}`}
            rel="noopener noreferrer"
          >
            {s.label}
          </a>
        </label>
        {input}
        <button onClick={() => transfer(s.name, style[s.name])}>⇌</button>
      </React.Fragment>
    );
  });

  return (
    <div
      className={`properties dropzone ${isDragActive ? "drag" : ""}`}
      {...getRootProps()}
    >
      {properties}
    </div>
  );
}
