import React, { useState } from "react";
import SplitContext from "../Split";
import Typo from "./Typo";
import Divider from "./Divider";

export default function Splitscreen({content,copy,original,foreground,background,diff}) {

  let [split, setSplit] = useState(500);

  return (
      <SplitContext.Provider value={{ split: split, update: setSplit }}>
        <Typo
          copy
          title="Copy (right control panel)"
          style={copy}
          content={content}
          foreground={foreground}
          background={background}
          diff={diff}
        />
        <Typo
          original
          title="Original (left control panel)"
          style={original}
          content={content}
          foreground={foreground}
          background={background}
        />
        <Divider />
      </SplitContext.Provider>
   );
 }
