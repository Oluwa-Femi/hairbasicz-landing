import React from "react";
import { Route, Routes } from "react-router-dom";
import EcommerceRoutes from "./EcommerceRoutes";
import StoreLandingPage from "../pages/Store/StoreLandingPage";

const HairbasiczRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StoreLandingPage />} />
      <Route path="/*" element={<EcommerceRoutes />} />
    </Routes>
  );
};

export default HairbasiczRoutes;
