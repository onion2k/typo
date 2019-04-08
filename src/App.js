import React, { useState } from 'react';
import SplitContext from './Split';
import Typo from './Typo';
import Controller from './Controller';
import Divider from './Divider';
import './App.css';

export default function App() {
  let [split, setSplit] = useState(300);
  let [original, setOriginal] = useState({
    color: "#ffffff",
    fontSize: "5em",
    fontFamily: "julietta-messie-ooer"
  });
  let [copy, setCopy] = useState({
    color: "#ffffff",
    fontSize: "5em",
    fontFamily: "julietta-messie-ooer"
  });
  const transfer = (name, value) => {
    const originalStyle = { ...original };
    originalStyle[name] = value;
    setOriginal({ ...originalStyle });
    const copyStyle = { ...copy };
    copyStyle[name] = value;
    setCopy({ ...copyStyle });
  }
  return (
    <div className="App">
      <header className="typo-header">Typo</header>
      <SplitContext.Provider value={{split: split, update: setSplit}}>
        <div className="typo-splitscreen">
          <Typo copy title="Copy" style={copy} />
          <Typo original title="Original" style={original}  />
          <Divider />
        </div>
      </SplitContext.Provider>
      <Controller style={original} update={setOriginal} transfer={transfer} />
      <Controller style={copy} update={setCopy} transfer={transfer} />
    </div>
  );
}
