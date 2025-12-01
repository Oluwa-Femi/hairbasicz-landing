/* eslint-disable react/no-unescaped-entities */
import React from "react";
import SubscriptionForm from "./SubscriptionForm";

const Subscription = () => {
  return (
    <div className="relative bg-[#12263A] h-[208px] sm:text-center flex p-[64px] xsm:px-[24px] xsm:py-[32px] sm:px-[24px] sm:py-[32px] mx-[128px] xsm:mx-[16px] sm:mx-[16px] rounded-3xl top-[100px] xsm:flex-col xsm:h-full sm:flex-col sm:h-full">
      <div className="w-[55%] xsm:w-full sm:w-full  ">
        <h1 className="text-[#2922b3] text-[34px]">
          Don't miss out on our biggest deals{" "}
        </h1>
        <p className="text-[#FFFFFF] text-lg  pt-[8px] ">
          Sign up to our newsletter to get the latest updates.
        </p>
      </div>
      <div className="w-[45%] xsm:w-full xsm:mt-[30px] sm:mx-auto sm:w-full sm:mt-[30px]">
        <SubscriptionForm />
      </div>
    </div>
  );
};

export default Subscription;
