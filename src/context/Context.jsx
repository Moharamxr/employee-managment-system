import React, { createContext, useState } from "react";

export const gState = createContext();

const Context = ({ children }) => {
  const [data, setData] = useState({
    baseSalary: "",
    empIDs: [],
  });

  return (
    <gState.Provider value={{ data, setData }}>{children}</gState.Provider>
  );
};

export default Context;
