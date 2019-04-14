import React, { useState } from "react";
import Properties from "./Properties"
import CSS from "./CSS"
import "./Controller.css";

export default function Controller(data) {
    
  const [view, setView] = useState('all');
  
  const renderProperties = () => {
    if (view==='css') {
      return <CSS {...data} />
    } else {
      return <Properties {...data} view={view} />
    }
  }
  
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
      { renderProperties() }
    </div>
  );

}
