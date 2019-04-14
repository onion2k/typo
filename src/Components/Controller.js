import React, { useState } from "react";
import Properties from "./Properties"
import "./Controller.css";

export default function Controller(data) {
  
  const [view, setView] = useState('all');
  
  return (
    <div className="controller">
      <div className="controller-options">
        <div>
          <button onClick={()=>{ setView('css'); }}>View As CSS</button>
        </div>
        <div>
          <button onClick={()=>{ setView('all'); }}>View All</button>
          <button onClick={()=>{ setView('simplified'); }}>Simplified</button>
        </div>
      </div>
      <Properties {...data} view={view} />
    </div>
  );

}
