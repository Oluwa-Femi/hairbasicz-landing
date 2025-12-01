import React from "react";
import ProfileIcon from "../../assets/ProfileIcon.svg";
import OrderIcon from "../../assets/OrderIcon.svg";
import DeliveryIcon from "../../assets/DeliveryIcon.svg";
import Setting from "../../assets/Setting.svg";
import LogOut from "../../assets/LogOut.svg";
import SideBarItem from "./SideBarItem";
import { useLogOut } from "../../hooks/auth/useLogout";

const AccountInformationSideBar = () => {
  const { handleLogout } = useLogOut();
  const myAccount = "/store/profile";

  return (
    <div className="grid grid-flow-col relative ">
      <div className="py-7 relative  flex flex-col gap-[14px] border-solid md:border-[1px] lg:border-[1px] xl:border-[1px] 2xl:border-[1px] border-[#D8DCE2] min-w-[291px] min-h-[500px] max-h-[628px] rounded-[10px] xsm:w-full sm:w-full md:w-fit lg:w-fit xl:w-fit 2xl:w-fit xsm:bg-[#F8F9FB] sm:bg-[#F8F9FB] bg-white">
        <SideBarItem icon={ProfileIcon} name="Profile" link={myAccount} />
        <SideBarItem
          icon={OrderIcon}
          name="Order history"
          link={`${myAccount}/order-history`}
        />
        <SideBarItem
          icon={DeliveryIcon}
          name="Delivery address"
          link={`${myAccount}/delivery-address`}
        />
        {/* <SideBarItem
          icon={Message}
          name="Message centre"
          link={`${myAccount}/message-centre`}
        /> */}
        <SideBarItem
          icon={Setting}
          name="Settings"
          link={`${myAccount}/settings`}
        />
        <div className="absolute bottom-0 left-0">
          <SideBarItem
            link="/"
            onClick={handleLogout}
            icon={LogOut}
            name="Logout"
            color={"text-[#EF4444]"}
          />
        </div>
      </div>
    </div>
  );
};

export default AccountInformationSideBar;
