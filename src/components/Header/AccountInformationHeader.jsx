import React from "react";
import Logo from "../../assets/logo.svg";
import SearchInput from "../Input/SearchInput";
import NotificationBell from "../../assets/NotificationIcon.svg";
import CartIcon from "../../assets/CartIcon.svg";
import AdminDropdown from "../../components/Dropdown/AdminDropdown";
import AllCategoriesHeader from "./AllCategoriesHeader";
import { Menu, MenuButton, MenuList } from "@chakra-ui/react";
import NotificationMenu from "../Notifications/NotificationMenu";
import Sort from "../../components/SortComponent/Sort";

const AccountInformationHeader = () => {
  return (
    <div className="sticky top-0 bg-white z-10">
      <div className="flex px-[128px] py-[16px] gap-[16px]">
        <img src={Logo} alt="paysmosmo-logo" />
        <div className="flex items-center text-[16px] text-[#868A90] space-x-[36px] child:cursor-pointer ">
          <span className="hover:text-[#2922b3] hover:font-[Gilroy-Medium]">
            Dashboard
          </span>
          <span className="hover:text-[#2922b3] hover:font-[Gilroy-Medium]">
            Store
          </span>
          {/* <span className="hover:text-[#2922b3] hover:font-[Gilroy-Medium]">
            Savings
          </span> */}
          <span className="hover:text-[#2922b3] hover:font-[Gilroy-Medium]">
            Transactions
          </span>
        </div>
        <SearchInput
          width={"w-[342px]"}
          height={"h-[48px]"}
          placeholder={"Search..."}
          borderSize={"border-[1px]"}
          borderRadius={"rounded-[8px]"}
        />
        <Menu>
          <MenuButton>
            <div className="flex items-center p-[12px] w-[48px] h-[48px] rounded-[8px] border-solid border-[1px] border-[#D8DCE2] relative cursor-pointer">
              <img src={NotificationBell} alt="notification-bell" />
              <div className="absolute top-2 right-2 w-[16px] h-[16px] bg-[#2922b3] rounded-full text-[10px] text-white grid place-items-center border-[1px] border-solid border-white">
                2
              </div>
            </div>
          </MenuButton>
          <MenuList>
            <NotificationMenu />
          </MenuList>
        </Menu>
        <AdminDropdown
          Label="My Account"
          height={"48px"}
          ButtonBackgroundColor={"white"}
        />
        <div className="relative flex items-center p-[12px] w-[48px] h-[48px] rounded-[8px] border-solid border-[1px] border-[#D8DCE2] cursor-pointer">
          <img src={CartIcon} alt="cart-icon" />
          <div className="absolute top-2 right-2 w-[16px] h-[16px] bg-[#EF4444] rounded-full text-[10px] text-white grid place-items-center border-[1px] border-solid border-white">
            2
          </div>
        </div>
      </div>
      <AllCategoriesHeader showAllCategories />
      <Sort accountInformation />
    </div>
  );
};

export default AccountInformationHeader;
