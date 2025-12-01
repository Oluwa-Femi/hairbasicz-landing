/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const Dropdown = ({
  dropdownList,
  width,
  height,
  dropdownTitle,
  dropdownOption,
  setDropdownOption,
  errorMessage,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <div>
      <p className="mb-[6px] text-[14px] font-[500] leading-[20px]">
        {dropdownTitle}
      </p>
      <div
        onClick={toggleDropdown}
        className={`border-[1px] border-solid ${
          showDropdown && "border-[#D0D5DD]"
        }  ${showDropdown && "border-[2px]"} bg-white ${
          !showDropdown && "border-[#D0D5DD]"
        } rounded-md ${width} ${height} flex items-center px-[16px] justify-between relative`}
      >
        <p
          className={`${
            dropdownOption == "Select" ? "text-[#B5BAC2]" : "text-black"
          } text-[14px] font-[400] capitalize`}
        >
          {dropdownOption}
        </p>
        <FontAwesomeIcon
          className="text-[#B5BAC2] text-[14px] font-[400] cursor-pointer"
          icon={!showDropdown ? faAngleDown : faAngleUp}
        />

        {showDropdown && (
          <div className="drop z-50 bg-white px-[16px] py-[13px] rounded-[5px] absolute w-[100%] top-12 left-[-2px] border-[#D0D5DD] border-[1px] border-solid max-h-[300px] overflow-auto">
            {dropdownList?.map((item, index) => (
              <div
                onClick={() => {
                  setDropdownOption(item?.value);
                  toggleDropdown();
                }}
                className={`font-[400] text-[13px] capitalize text-[black] leading-[20.16px] py-[8px] pl-[5px] rounded-[5px] mt-[6px]m cursor-pointer hover:bg-[#2922b3]  hover:text-white mt-[10px]`}
                key={index}
              >
                {item?.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="mt-[5px] text-[13px] text-red-600">{errorMessage}</p>
    </div>
  );
};

Dropdown.propTypes = {
  dropdownList: PropTypes.array,
  width: PropTypes.string,
  height: PropTypes.string,
  placeholder: PropTypes.string,
};

Dropdown.defaultProps = {
  // dropdownList: ["Male", "Female"],
  width: "w-[181px]",
  height: "h-[48px]",
};

export default Dropdown;
