import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Sort from "../../components/SortComponent/Sort";
import { useParams } from "react-router-dom";
import AccountInformationSideBar from "./AccountInformationSideBar";

const AccountDetailShell = ({ children }) => {
  let params = useParams();
  const pageTitle = params;
  return (
    <div className="w-screen bg-[#f1f3f6]">
      <Header
        showAllCategories={true}
        top
        showSearchInput
        showNotification
        showMyAccount
        showBtnAndCart
      />
      <Sort pageTitle={pageTitle} />
      <div className="flex md:px-[128px] lg:px-[128px] xl:px-[128px] 2xl:px-[128px] gap-[24px] pt-[24px] pb-[56px]">
        <div className="xsm:hidden sm:hidden">
          <AccountInformationSideBar />
        </div>
        <div className="w-screen">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountDetailShell;
