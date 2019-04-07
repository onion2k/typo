import React, { useState } from 'react';
import SplitContext from './Split';
import Typo from './Typo';
import Controller from './Controller';
import Divider from './Divider';
import './App.css';

export default function App() {
  let [split, setSplit] = useState(300);
  return (
    <div className="App">
      <SplitContext.Provider value={{split: split, update: setSplit}}>
        <div className="typo-splitscreen">
          <Typo copy />
          <Typo original />
          <Divider />
        </div>
      </SplitContext.Provider>
      <Controller />
      <Controller />
    </div>
  );
}
