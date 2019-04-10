import React from "react";
import "./Header.css";

const cssdata = require("../ctf.json");
const cssTextFeatures = cssdata.cssTextFeatures;

export default function Header({setContent}) {
  return (
    <header className="typo-header">
      <h1>Typo
      <span>Explore {cssTextFeatures.length} CSS properties for text</span>
      </h1>
      <div className="options">
        <button onClick={()=>setContent('Ooer')}>Title</button>
        <button onClick={()=>setContent('A sentence about text rendering')}>Sentence</button>
        <button onClick={()=>setContent('A full paragraph of text on the virtues of well-designed, well-thought out text on a website. It\'s worthwhile spending time on your text, perfecting your font choices, and making sure what you publish is as readable as it is interesting.')}>Paragraph</button>
      </div>
    </header>
  );
}
