import React, { useContext } from 'react';
import SplitContext from './Split';

import './Typo.css';

export default function Typo(data) {
  let split = useContext(SplitContext);
  
  let clipPath = '';

  if (data.copy) {
    clipPath = `polygon(${split.split}px 0, 100vw 0, 100vw 100vh, ${split.split}px 100vh)`;
  }

  return (
    <div
    className={`typo ${data.copy?"copy":"original"}`}
    style={{ clipPath }}>
      <span className="title">{data.title}</span>
      <div className="content">
        Ooer
      </div>
    </div>
  );
}
