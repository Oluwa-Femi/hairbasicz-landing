/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Drawer } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
const SideBarItem = ({
  icon,
  name,
  color,
  marginTop,
  onClick,
  isOpen,
  onClose,
  link,
}) => {
  const location = useLocation();
  return (
    <>
      <Link to={link}>
        <div
          onClick={onClick}
          className={`flex items-center ${marginTop} ${
            !color && "text-[#868A90]"
          } ${
            color && color
          } text-[16px] space-x-[16px] font-[Gilroy-Medium] py-[12px] cursor-pointer  pl-7 ${
            location.pathname == link &&
            "border-solid border-l-[5px] border-l-[#2922b3] bg-[#EFFFED]"
          } `}
        >
          <img src={icon} alt="profile-icon" />
          <p className="font-[Gilroy-Medium]">{name}</p>
        </div>
      </Link>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        ccxc
      </Drawer>
    </>
  );
};

export default SideBarItem;
