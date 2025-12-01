import React from "react";
import SearchInput from "../../components/Input/SearchInput";
import Calendar from "../../assets/Calendar.svg";

const CurrentAccountInformation = ({ selectedItem, selectedElement }) => {
  return (
    <div className="py-7  flex flex-col  border-solid border-[1px] border-[#D8DCE2]  rounded-[10px] bg-white w-full">
      <div className="flex items-center justify-between pb-[16px] border-solid border-b-[1px] border-b-[#EBEEF2]">
        <h1 className="text-[20px] text-[#1C1D1F] pl-7">{selectedItem}</h1>
        {selectedItem == "Message centre" && (
          <div className="flex gap-3 items-center">
            <SearchInput
              width={"w-[222px]"}
              placeholder="Search by keywords..."
              borderRadius={"rounded-[8px]"}
              borderSize={"border-[1px]"}
              height={"h-[36px]"}
            />
            <div className="flex items-center px-[12px] py-[11px] bg-[#EBEEF2] rounded-[8px] mr-4">
              <span className="text-[#868A90]">Filter by date:</span>
              <img src={Calendar} alt="calendar-icon" />
            </div>
          </div>
        )}
      </div>
      {/* <Divider /> */}

      {selectedElement}
    </div>
  );
};

export default CurrentAccountInformation;
