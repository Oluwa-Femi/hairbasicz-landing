/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { ChevronRightIcon } from "@chakra-ui/icons";
import React from "react";

const ProfileIncomplete = ({ openModal, each }) => {
  return (
    <div
      onClick={() => openModal(each)}
      key={each?.id}
      style={{ borderBottom: "1px solid #EBEEF2" }}
      className={`flex justify-between pt-6 pb-4 ${
        each?.status === null ? "cursor-pointer" : "cursor-not-allowed"
      }`}
    >
      <div>
        <p className="text-[1em] font-[Gilroy-Medium]">{each?.name}</p>
      </div>
      <div>
        <div className="flex justify-between gap-2">
          {(each?.status === "completed" || each?.status !== null) && (
            <div
              style={{ border: "1px solid #469F00" }}
              className="bg-[#F4FFEB] p-2 border-2 border-[#469F00] rounded-full text-[#469F00]"
              id="success-border"
            >
              <p className="text-[12px]">Completed</p>
            </div>
          )}
          {!each?.status && (
            <div
              className="bg-[#EF4444] p-2 border-2 rounded-full text-[#fff]"
              id="error-border"
            >
              <p className="text-[12px]">Unverified</p>
            </div>
          )}
          {each?.status === "pending" && (
            <div
              className="bg-[#F59E0B] p-2 border-2 rounded-full text-[#fff]"
              id="pending"
            >
              <p className="text-[12px]">Pending</p>
            </div>
          )}
          {(each?.status === "0" || each?.status === "1") && (
            <div id="count">
              <p className="text-[12px]">
                {each?.status}/{each?.total}
              </p>
            </div>
          )}
          <div>
            <ChevronRightIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileIncomplete;
