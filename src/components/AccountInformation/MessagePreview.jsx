/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import PaysmosmoWallet from "../../assets/PaysmosmoWallet.svg";

import MessageIcon from "../../assets/MessageIcon.svg";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Spinner,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SearchInput from "../Input/SearchInput";
import { formatDate } from "../../libs/fnDate/date.helper";
import Storage from "../../utils/services/storage";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../store/Profile/profileActions";
import { selectProfile } from "../../store/Profile/profileSlice";
import { useReadOne } from "../../hooks/notifications";

const MessagePreview = () => {
  const [open] = useState(false);
  const { postUseReadOne } = useReadOne()
  const navigate = useNavigate();
  const selectMessage = (singleMessage) => {
    Storage.set("SingleMessage", JSON.stringify(singleMessage));
    postUseReadOne(singleMessage?.reference);
    navigate("message");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {
      page: 1,
      limit: 4,
    };
    dispatch(getNotifications(payload));
  }, []);
  const Messages = useSelector(selectProfile);
  const messageData = Messages?.data?.data;

  const pageCount = messageData && Math.ceil(messageData?.total / 4);

  const handlePageClick = (event) => {
    const payload = {
      page: event.selected + 1,
      limit: 4,
    };
    dispatch(getNotifications(payload));
  };

  const handleSearch = (e) => {
    if (e.target.value === "") {
      const payload = {
        page: 1,
        limit: 4,
      };
      dispatch(getNotifications(payload));
    }
  };

  const onSearch = (e) => {
    if (e.key === "Enter") {
      dispatch(
        getNotifications({
          limit: 4,
          page: 1,
          search: e.target.value.toLowerCase(),
        }),
      );
    }
  };

  return (
    <>
      <div className="flex justify-between items-center py-[16px] px-[24px] bg-white">
        <h2 className="text-[20px] font-[Gilroy-Bold]">Message centre</h2>
        {/* {messageData?.notifications?.length > 0 && ( */}
        <div className="flex items-center gap-[12px]">
          <SearchInput
            borderRadius={"rounded-[4px]"}
            height={"h-[36px]"}
            placeholder={"Search by keywords..."}
            borderSize={"border-[1px]"}
            onChange={handleSearch}
            onKeyDown={(e) => onSearch(e)}
          />
        </div>
        {/* )} */}
      </div>
      {Messages?.isGettingAll && (
        <div className="h-full bg-white flex flex-col items-center justify-center gap-2">
          <img alt="messageIcon" src={MessageIcon} />
          <h1 className="text-[18px] text-[#1C1D1F]">Please wait, loading</h1>
          <Spinner size="xl" />
        </div>
      )}

      {messageData?.notifications?.length > 0 &&
        messageData?.notifications.map((message, index) => (
          <div
            key={index}
            className={`grid grid-cols-4 gap-6 px-[36px] pt-[16px] pb-[35px] ${
              message?.is_read ? "bg-[#FFF]" : "bg-[#F8F9FB]"
            } border-solid border-b-[1px] border-[#EBEEF2] bg-[#F8F9FB] cursor-pointer`}
            onClick={() => selectMessage(message)}
          >
            <div className="flex gap-4 pr-4 col-span-3">
              <img src={PaysmosmoWallet} alt="wallet" />
              <div className="">
                <h3
                  className={`text-[16px] ${
                    message?.is_read ? "text-[#868A90]" : "text-[#1C1D1F]"
                  }  font-[Gilroy-Medium]`}
                >
                  {message?.title}
                </h3>
                <p
                  className={`mt-[4px] text-[14px] ${
                    message?.is_read ? "text-[#868A90]" : "text-[#1C1D1F]"
                  }`}
                >
                  {message?.body}
                </p>
              </div>
            </div>
            <div
              className={`${
                message?.is_read ? "text-[#868A90]" : "text-[#1C1D1F]"
              } text-[14px] text-right`}
            >
              {formatDate(message?.created_at)}
            </div>
          </div>
        ))}
      {messageData?.notifications?.length > 0 && (
        <div className="bg-white">
          <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
        </div>
      )}

      {messageData?.notifications?.length <= 0 && (
        <div className="h-full bg-white flex flex-col items-center justify-center gap-2">
          <img alt="all" src={MessageIcon} />
          <h1 className="text-[18px] text-[#1C1D1F]">
            You don't have any messages
          </h1>
          <p className="text-[#868A90] text-center">
            Here you will be able to see all the messages that we <br /> send
            you. Stay tuned.
          </p>
        </div>
      )}

      <Drawer isOpen={open} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody></DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MessagePreview;
