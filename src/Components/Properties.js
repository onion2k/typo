import React, { useState, useContext } from "react";
import CssPropertiesContext from "../CssProperties";
import path from "path";
import { useDropzone } from "react-dropzone";
import CSSInput from "./CSSInput";
import "./Properties.css";

const opentype = require("opentype.js");
const VariableFont = require("../variablefont.js");

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

export default function Properties(data) {
  const { view, style, update, transfer, updateFont } = data;
  let [userFonts, setUserFonts] = useState({});

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

        const f = opentype.parse(font);
        const vf = new VariableFont(f);

        setUserFonts({
          ...userFonts,
          [fontName]: {
            axes: vf.getAxes()
          }
        });

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
        change={value => {
          change(value);
        }}
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

  if (userFonts.hasOwnProperty(style["fontFamily"])) {
    console.log("User loaded font");

    userFonts[style["fontFamily"]].axes.forEach(a => {
      console.log(a);
      properties.splice(
        2,
        0,
        <React.Fragment key={a.tag}>
          <label htmlFor={a.tag}>{a.name.en}</label>
          RANGE
          <button onClick={() => transfer(a.tag, style[a.tag])}>⇌</button>
        </React.Fragment>
      );
    });
  }

  return (
    <div
      className={`properties dropzone ${isDragActive ? "drag" : ""}`}
      {...getRootProps()}
    >
      {properties}
    </div>
  );
}
