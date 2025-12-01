import React from "react";
import { Divider } from "@chakra-ui/react";
import { relativeDate } from "../../utils/functions/formatDate";
import { useReadOne } from "../../hooks/notifications";

const Notification = ({ Notifications }) => {
  const { postUseReadOne } = useReadOne();
  return (
    <>
      {Notifications?.map((each, index) => (
        <div role="presentation" onClick={() => postUseReadOne(each?.reference)} key={index} className="px-[22px] flex gap-4 items-start mb-[25px] cursor-pointer">
          <div

             className={`min-w-[12px] min-h-[12px] bg-[#2922b3]  rounded-full mt-[8px] cursor-pointer ${each.is_read && 'bg-[#868A90]'}`}></div>
          <div>
            <p className={`text-[16px] text-[#2F3133] ${each?.is_read && 'text-[#868A90]'} font-[Gilroy-Medium]`}>
              {each.title}
            </p>
            <p className={`relative text-[14px] text-[#2F3133] ${each?.is_read && 'text-[#868A90]'} mt-[8px]`}>
              {relativeDate(each?.updated_at)}
            </p>
            <div className="absolute top-0">
              <Divider />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Notification;
