import React, { useContext } from 'react';

import './Controller.css';

export default function Controller(data) {
    
  const updateColor = (e) => {
    data.update({...data.style, color: e.target.value});

  }

  const updateSize = (e) => {
    data.update({...data.style, fontSize: e.target.value});
  }

  const updateFamily = (e) => {
    data.update({...data.style, fontFamily: e.target.value});
  }
  
  return (
    <div className="controller">
      <label htmlFor="color">Color</label>
      <input name="color" type="text" onChange={updateColor} defaultValue={data.style.color} />
      <label htmlFor="size">Size</label>
      <input name="size" type="text" onChange={updateSize} defaultValue={data.style.fontSize} />
      <label htmlFor="family">Font Family</label>
      <input name="family" type="text" onChange={updateFamily} defaultValue={data.style.fontFamily} />
    </div>
  );
}
