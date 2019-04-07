import React, { useContext } from 'react';

import './Controller.css';

export default function Controller(data) {
  
  const updateColor = (e) => {
    data.update({
      color: e.target.value
    })
  }

  return (
    <div className="controller">
      <input type="text" onChange={updateColor} />
    </div>
  );
}
