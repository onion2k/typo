import React, { useState } from "react";
import SplitContext from "./Split";
import Typo from "./Components/Typo";
import Controller from "./Components/Controller";
import Divider from "./Components/Divider";
import Header from "./Components/Header";
import "./App.css";

const defaultState = {
    color: "#ffffff",
    fontSize: "5em",
    fontFamily: "julietta-messie-ooer"
}

export default function App() {
  let [split, setSplit] = useState('50%');
  let [content, setContent] = useState('Ooer');
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
  return (
    <div className="App">
      <Header setContent={setContent} />
      <SplitContext.Provider value={{ split: split, update: setSplit }}>
        <div className="typo-splitscreen">
          <Typo copy title="Copy" style={copy} content={content} />
          <Typo original title="Original" style={original} content={content} />
          <Divider />
        </div>
      </SplitContext.Provider>
      <Controller style={original} update={setOriginal} transfer={transfer} />
      <Controller style={copy} update={setCopy} transfer={transfer} />
    </div>
  );
}
