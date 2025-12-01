import React, { useState, createContext, useContext } from "react";

const Context = createContext();

const OverviewTypeProvider = ({ children }) => {
  const [overviewType, setOverviewType] = useState({
    year: new Date().getFullYear(),
    type: "year",
  });
  return (
    <Context.Provider value={{ overviewType, setOverviewType }}>
      {children}
    </Context.Provider>
  );
};

export default OverviewTypeProvider;

export const useOverviewTypeContext = () => useContext(Context);
