import React, { useState } from "react";
import SplitContext from "./Split";
import CssPropertiesContext from "./CssProperties";
import Typo from "./Components/Typo";
import Controller from "./Components/Controller";
import Divider from "./Components/Divider";
import Header from "./Components/Header";
import "./App.css";

const cssdata = require("./ctf.json");
const cssTextFeatures = cssdata.cssTextFeatures;

const defaultState = {
  color: "#ffffff",
  fontSize: "2em",
  maxWidth: "960px"
};

const defaultContent =
  "Welcome to Typo. You can explore different CSS text properties by changing the values in the two control panels below to update the original and copy text, and move the sliding divider left and right to reveal any differences. Use the arrow next to each property to copy its value to the other panel.";

export default function App() {
  let [split, setSplit] = useState(500);
  let [content, setContent] = useState(defaultContent);
  let [original, setOriginal] = useState(defaultState);
  let [copy, setCopy] = useState(defaultState);

  const transfer = (name, value) => {
    const originalStyle = { ...original };
    originalStyle[name] = value;
    setOriginal({ ...originalStyle });
    const copyStyle = { ...copy };
    copyStyle[name] = value;
    setCopy({ ...copyStyle });
  };
  
  const updateFont = (fontName) => {
    
    cssTextFeatures[0].options.push(fontName);

    const originalStyle = { ...original };
    originalStyle["fontFamily"] = fontName;
    setOriginal({ ...originalStyle });

    const copyStyle = { ...copy };
    copyStyle["fontFamily"] = fontName;
    setCopy({ ...copyStyle });
  }

  return (
    <div className={"App"}>
      <Header setContent={setContent} updateFont={updateFont}/>
      <SplitContext.Provider value={{ split: split, update: setSplit }}>
        <div className="typo-splitscreen">
          <Typo
            copy
            title="Copy (right control panel)"
            style={copy}
            content={content}
          />
          <Typo
            original
            title="Original (left control panel)"
            style={original}
            content={content}
          />
          <Divider />
        </div>
      </SplitContext.Provider>
      <CssPropertiesContext.Provider value={{ cssTextFeatures }}>
      <Controller
        id={"original"}
        style={original}
        update={setOriginal}
        transfer={transfer}
      />
      <Controller
        id={"copy"}
        style={copy}
        update={setCopy}
        transfer={transfer}
      />
      </CssPropertiesContext.Provider>
    </div>
  );
}
