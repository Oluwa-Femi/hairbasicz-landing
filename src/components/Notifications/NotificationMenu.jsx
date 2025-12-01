/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { MenuDivider, Spinner } from "@chakra-ui/react";
import NoSpam from "../../assets/NoSpam.svg";
import Notification from "./Notification";
import { useReadAll } from "../../hooks/notifications";


const NotificationMenu = ({ notifications, counts }) => {
  const { isLoading, postUseReadAll } = useReadAll();
  return (
    <div className="w-[464px]">
      {counts > 0 && (
        <div className="flex justify-between px-[22px] pt-[17px]">
          <div className="flex items-center">
            <span className="text-[20px] font-[Gilroy-Bold]">
              Notifications
            </span>
            <span className="w-[16px] h-[16px] bg-[#2922b3] rounded-full text-[10px] text-white grid place-items-center border-[1px] border-solid border-white">
              {counts}
            </span>
          </div>
          {isLoading && <Spinner />}
          {!isLoading && (
          <div
            role="presentation"
              onClick={postUseReadAll} className="underline text-[#2922b3] cursor-pointer">Mark all as read</div>
            )}
        </div>
      )}
      <MenuDivider color={"#F8F9FB"} />
      <Notification Notifications={notifications} />
      {counts <= 0 && (
        <div className="min-h-[366px] flex flex-col justify-center items-center text-center gap-2">
          <img src={NoSpam} alt="no-spam" />
          <p className="text-[18px] font-[Gilroy-Bold]">
            You don't have any notification
          </p>
          <p className="text-[14px] text-[#868A90]">
            Here you will be able to see all the notifications on <br /> your
            account.
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationMenu;
