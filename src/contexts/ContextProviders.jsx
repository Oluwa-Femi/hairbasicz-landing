import React from "react";
import OverviewTypeProvider from "./OverviewTypeContext";

const ContextProviders = ({ children }) => {
  return (
    // All contexts will go here
    <OverviewTypeProvider>{children}</OverviewTypeProvider>
  );
};

export default ContextProviders;
