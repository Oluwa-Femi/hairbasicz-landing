import React from "react";
import StoreFooter from "../../components/Footer/StoreFooter";
import Header from "../../components/Header/Header";
import LandingBody from "../../container/store/LandingBody";
import Services from "../../container/store/Services";
import Subscription from "../../container/store/Subscription";
import TopBrand from "../../container/store/TopBrand";
import { useSearchParams } from "react-router-dom";
import useLoggout, { useCheckLoggedIn } from "../../hooks/auth/useLogout";

const StoreLandingPage = () => {
  const [URLSearchParams] = useSearchParams();
  useLoggout(URLSearchParams.get("logout"));
  useCheckLoggedIn();
  return (
    <div>
      <Header store />
      <LandingBody />
      <TopBrand />
      <Services />
      <Subscription />
      <StoreFooter />
    </div>
  );
};

export default StoreLandingPage;
