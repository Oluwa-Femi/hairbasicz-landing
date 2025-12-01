/**
 ** @name: SettingTabTemp
 *? @description: WRAPPER FOR PROFILE SETTING SIDEBAR TABS
 */

import React from "react";
import { Button } from "@chakra-ui/react";
import SearchInput from "../Input/SearchInput";
import DateDropdown from "../Dropdown/DateFilter";

const SettingTabTemp = ({
  children,
  title,
  isNewAddress,
  setIsOpen,
  isMyOrder,
  handleFilterDateChange,
  showDatePicker,
  handleSearch,
  onSearch,
  value,
  ranges,
  dateValue,
  isOpen,
}) => {
  return (
    <div
      id="main-content-wrapper"
      className="py-2 flex flex-col gap-[14px] border-solid border-[1px] border-[#D8DCE2] min-w-[291px] rounded-[10px] bg-white w-100 h-full"
    >
      <div
        id="main-content-header"
        className="my-[0.335rem] px-[2.074rem] items-center flex xsm:flex-col sm:flex-col justify-between"
      >
        <h2
          id="title"
          className="text-[23.04px] font-[Gilroy-Bold] font-[600] text-[#1C1D1F]"
        >
          {title}
        </h2>
        {isNewAddress && (
          <Button onClick={setIsOpen} bg="rgba(79, 166, 71, 1)" color="white">
            Add a new address
          </Button>
        )}

        {isMyOrder && (
          <div>
            <div className="flex items-center gap-[12px]">
              <SearchInput
                borderRadius={"rounded-[4px]"}
                height={"h-[36px]"}
                placeholder={"Search by keywords..."}
                borderSize={"border-[1px]"}
                value={value}
                onChange={handleSearch}
                onKeyDown={onSearch}
              />
              <DateDropdown
                Label="Filter by date:"
                handleFilterDateChange={handleFilterDateChange}
                showDatePicker={showDatePicker}
                ranges={ranges}
                value={dateValue}
                isOpen={isOpen}
              />
            </div>
          </div>
        )}
      </div>
      <hr />
      <div id="main-content">{children}</div>
    </div>
  );
};

export default SettingTabTemp;
