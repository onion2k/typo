import React, { useState } from "react";
import CssPropertiesContext from "./CssProperties";
import Splitscreen from "./Components/Splitscreen";
import Typo from "./Components/Typo";
import Fontgrid from "./Components/Fontgrid";
import Controller from "./Components/Controller";
import Header from "./Components/Header";
import "./App.css";

const cssdata = require("./ctf.json");
const cssTextFeatures = cssdata.cssTextFeatures;

const defaultState = {
  fontFamily: "serif",
  fontSize: "2em",
  maxWidth: "960px"
};

const defaultCopyState = Object.assign({}, defaultState, {
  fontFamily: "sans-serif"
});

const defaultContent =
  "Welcome to Typo. You can explore different CSS text properties by changing the values in the two control panels below to update the original and copy text, and move the sliding divider left and right to reveal any differences. Use the arrow next to each property to copy its value to the other panel.";

export default function App() {
  let [content, setContent] = useState(defaultContent);
  let [foreground, setForeground] = useState("#000000");
  let [background, setBackground] = useState("#ffffff");
  let [diff, setDiff] = useState(false);
  let [original, setOriginal] = useState(defaultState);
  let [copy, setCopy] = useState(defaultCopyState);
  let [fontgrid, setFontgrid] = useState(false);

  const transfer = (name, value) => {
    const originalStyle = { ...original };
    originalStyle[name] = value;
    setOriginal({ ...originalStyle });
    const copyStyle = { ...copy };
    copyStyle[name] = value;
    setCopy({ ...copyStyle });
  };

  const updateFont = (fontName, updateOriginal) => {
    cssTextFeatures[0].options.push(fontName);
    if (updateOriginal) {
      const originalStyle = { ...original };
      originalStyle["fontFamily"] = fontName;
      setOriginal({ ...originalStyle });
    } else {
      const copyStyle = { ...copy };
      copyStyle["fontFamily"] = fontName;
      setCopy({ ...copyStyle });
    }
  };

  const updateSettings = ({ content, foreground, background, diff }) => {
    setContent(content);
    setForeground(foreground);
    setBackground(background);
    setDiff(diff);
  };

  return (
    <div className={"App"}>
      <Header
        content={content}
        foreground={foreground}
        background={background}
        diff={diff}
        updateFont={updateFont}
        updateSettings={updateSettings}
        fontgrid={fontgrid}
        setFontgrid={setFontgrid}
      />
      <div className="typo-splitscreen">
        {!fontgrid ? (
          <Splitscreen>
            <Typo
              copy
              title="Copy (right)"
              style={copy}
              content={content}
              foreground={foreground}
              background={background}
              diff={diff}
            />
            <Typo
              original
              title="Original (left)"
              style={original}
              content={content}
              foreground={foreground}
              background={background}
            />
          </Splitscreen>
        ) : (
          <Splitscreen>
            <Fontgrid
              copy
              title="Font grid (right)"
              style={copy}
              foreground={foreground}
              background={background}
              diff={diff}
            />
            <Fontgrid
              original
              title="Font grid (left)"
              style={original}
              foreground={foreground}
              background={background}
              diff={diff}
            />
          </Splitscreen>
        )}
      </div>
      <CssPropertiesContext.Provider value={{ cssTextFeatures }}>
        <Controller
          id={"original"}
          style={original}
          update={setOriginal}
          transfer={transfer}
          updateFont={updateFont}
        />
        <Controller
          id={"copy"}
          style={copy}
          update={setCopy}
          transfer={transfer}
          updateFont={updateFont}
        />
      </CssPropertiesContext.Provider>
    </div>
  );
}
