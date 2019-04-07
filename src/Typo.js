import React, { useContext } from 'react';
import SplitContext from './Split';

import './Typo.css';

export default function Typo(data) {
  let split = useContext(SplitContext);
  
  let clipPath = '';
  let style = {};

  if (data.copy) {
    clipPath = `polygon(${split.split}px 0, 100vw 0, 100vw 100vh, ${split.split}px 100vh)`;
  }
  
  if (data.style) {
    style.color = data.style.color;
  }

  return (
    <div
    className={`typo ${data.copy?"copy":"original"}`}
    style={{ clipPath }}>
      <span className="title">{data.title}</span>
      <div className="content" style={style}>
        Ooer
      </div>
    </div>
  );
}
