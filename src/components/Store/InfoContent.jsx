/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { CloseIcon, WarningIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

const InfoContent = () => {
  const [showContent, setShowConent] = useState();
  return (
    <div>
      <a className="cursor-pointer" onClick={() => setShowConent(!showContent)}>
        <div
          id=""
          style={{ border: "1px solid #FFBA2D" }}
          className="text-[#F59E0B] bg-[#FFFCF5] border-[#FFBA2D] px-4 py-3 rounded-[0.5em]"
        >
          <div className="flex justify-between">
            <div id="flex" className="flex gap-2 items-center cursor-pointer">
              <WarningIcon />
              <h3 className="rounded-sm font-[Gilroy-Medium] text-[14px]">
                Why do you need my BVN?
              </h3>
            </div>

            {showContent && <CloseIcon />}
          </div>

          {showContent && (
            <div className="my-2" id="body">
              <p className="text-[14px]">
                Your BVN allows us to verify your identity and ensure that the
                information provided during onboarding is accurate.
              </p>
            </div>
          )}
        </div>
      </a>
    </div>
  );
};

export default InfoContent;
