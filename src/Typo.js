import React, { useContext } from 'react';
import SplitContext from './Split';

export default function Typo(data) {
  let split = useContext(SplitContext);
  
  let clipPath = '';
  if (data.copy) {
    clipPath = `polygon(0 0, ${split.split}px 0, ${split.split}px 100vh, 0 100vh)`;
  }

  return (
    <div
    className={`typo ${data.copy?"copy":""}`}
    style={{ clipPath }}>
      Ooer
    </div>
  );
}
