/**
 * @name: EmptyContent
 * @description: Empty state for when notification is empty
 */

import React from "react";
import MessageIcon from "../../assets/MessageIcon.svg";

const EmptyContent = () => {
  return (
    <div className="h-full bg-white flex flex-col items-center justify-center gap-2">
      <img alt="messageIcon" src={MessageIcon} />
      <h1 className="text-[18px] text-[#1C1D1F]">Message not found</h1>
      <p className="text-[#868A90] text-center">
        The selected message is no longer available
      </p>
    </div>
  );
};

export default EmptyContent;
