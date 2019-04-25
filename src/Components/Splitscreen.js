import React, { useState } from "react";
import SplitContext from "../Split";
import Divider from "./Divider";

export default function Splitscreen({ children }) {
  let [split, setSplit] = useState(500);

  return (
    <SplitContext.Provider value={{ split: split, update: setSplit }}>
      {children}
      <Divider />
    </SplitContext.Provider>
  );
}
