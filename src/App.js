import React, { useState, useCallback } from "react";
import CssPropertiesContext from "./CssProperties";
import Splitscreen from "./Components/Splitscreen";
import Typo from "./Components/Typo";
import Fontgrid from "./Components/Fontgrid";
import Controller from "./Components/Controller";
import Header from "./Components/Header";
import "./App.css";

const cssdata = require("./ctf.json");
const cssTextFeatures = cssdata.cssTextFeatures;

cssTextFeatures[0].options.push("movementv");

document.fonts.ready.then(fontData => {
  for (let fontFace of fontData.values()) {
    for (var property in fontFace) {
      console.log("  " + property + ": " + fontFace[property]);
    }
  }
});

const defaultState = {
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
  let [fontgrid, setFontgrid] = useState(false);

  let [original, setOriginal] = useState(defaultState);
  let [copy, setCopy] = useState(defaultCopyState);

  const transfer = (name, value) => {
    setOriginal(prevState => {
      return { ...prevState, [name]: value };
    });
    setCopy(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const updateFont = (fontName, updateOriginal) => {
    cssTextFeatures[0].options.push(fontName);
    if (updateOriginal) {
      setOriginal(prevState => {
        return { ...prevState, fontFamily: fontName };
      });
    } else {
      setCopy(prevState => {
        return { ...prevState, fontFamily: fontName };
      });
    }
  };

  const updateSettings = ({ content, foreground, background, diff }) => {
    setContent(content);
    setForeground(foreground);
    setBackground(background);
    setDiff(diff);
  };

  // useEffect(() => {
  //   console.log(copy);
  // }, [copy]);

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
          updateFont={useCallback(updateFont, [original])}
        />
        <Controller
          id={"copy"}
          style={copy}
          update={setCopy}
          transfer={transfer}
          updateFont={useCallback(updateFont, [copy])}
        />
      </CssPropertiesContext.Provider>
    </div>
  );
}
