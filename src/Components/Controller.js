import React, { useState } from "react";
import Properties from "./Properties"
import "./Controller.css";

export default function Controller(data) {
  
  const [view, setView] = useState('all');
  
  return (
    <div className="controller">
      <div className="controller-options">
        <button onClick={()=>{ setView('all'); }}>View All</button>
        <button onClick={()=>{ setView('simplified'); }}>Simplified</button>
      </div>
      <Properties {...data} view={view} />
    </div>
  );

}
