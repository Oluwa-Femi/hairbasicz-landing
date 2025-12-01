/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { EditIcon } from "@chakra-ui/icons";
import { Avatar, Badge } from "@chakra-ui/react";
import React from "react";

const ProfileSuccessComp = ({
  icon,
  imgUrl,
  title,
  children,
  avatar,
  onClick,
  relationship,
}) => {
  return (
    <div
      style={{ border: "1px solid #EBEEF2" }}
      className="py-4 px-4 rounded-md"
      id="bank-account"
    >
      <div id="header" className="flex justify-between items-center">
        <div id="title">
          <h2 className="text-[#000000] text-[14px] font-[Gilroy-Medium]">
            {title}
            {relationship && (
              <Badge ml="2" color="#8597FF" rounded={"full"}>
                {relationship}
              </Badge>
            )}
          </h2>
        </div>
        <div className="cursor-pointer" onClick={onClick} id="edit-icon">
          {" "}
          <EditIcon />{" "}
        </div>
      </div>
      <div id="body" className="my-2">
        <div className="flex items-center gap-4" id="content-flex">
          <div id="icon">
            {icon && <img className="w-[3em] my-3" src={icon} alt="icon" />}
            {avatar && <Avatar src={imgUrl} name={avatar} />}
          </div>
          <div id="content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSuccessComp;
