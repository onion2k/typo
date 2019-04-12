import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import SplitContext from "./Split";
import Typo from "./Components/Typo";
import Controller from "./Components/Controller";
import Divider from "./Components/Divider";
import Header from "./Components/Header";
import "./App.css";

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

  const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader();

    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = file => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result;
      const fontFace = new FontFace(
        "custom",
        "url(data:charset=utf-8;base64," + btoa(binaryStr) + ")"
      );
      fontFace.load();
      document.fonts.add(fontFace);

      const originalStyle = { ...original };
      originalStyle["fontFamily"] = "custom";
      setOriginal({ ...originalStyle });
      const copyStyle = { ...copy };
      copyStyle["fontFamily"] = "custom";
      setCopy({ ...copyStyle });
    };

    acceptedFiles.forEach(file => reader.readAsBinaryString(file));
  }, []);

  const { getRootProps, isDragActive } = useDropzone({
    onDrop
  });

  const transfer = (name, value) => {
    const originalStyle = { ...original };
    originalStyle[name] = value;
    setOriginal({ ...originalStyle });
    const copyStyle = { ...copy };
    copyStyle[name] = value;
    setCopy({ ...copyStyle });
  };

  return (
    <div className={`App ${isDragActive ? "drag" : ""}`} {...getRootProps()}>
      <Header setContent={setContent} />
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
      <Controller style={original} update={setOriginal} transfer={transfer} />
      <Controller style={copy} update={setCopy} transfer={transfer} />
    </div>
  );
}
