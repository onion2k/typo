import React, { useState } from 'react';
import SplitContext from './Split';
import Typo from './Typo';
import Controller from './Controller';
import Divider from './Divider';
import './App.css';

export default function App() {
  let [split, setSplit] = useState(300);
  let [original, setOriginal] = useState({});
  let [copy, setCopy] = useState({});
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
      <Controller style={original} update={setOriginal} />
      <Controller style={copy} update={setCopy} />
    </div>
  );
}
