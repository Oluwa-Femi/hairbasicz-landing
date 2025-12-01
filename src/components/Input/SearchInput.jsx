import React from "react";
import SearchIcon from "../../assets/searchicon.png";
import { Button } from "../Button/Button";

const SearchInput = ({
  width,
  height,
  onChange,
  value,
  placeholder,
  borderRadius,
  buttonHeight,
  onClick,
  btnTop,
  btnRight,
  borderSize,
  backgroundColor,
  border,
  onKeyDown,
  focus,
}) => {
  return (
    <div className="relative">
      <input
        className={`${borderSize} ${backgroundColor} border-[#2922b3] ${border} border-solid ${width} ${height} px-[41px] ${
          focus && "focus:border-[#2922b3] focus:border-[2px]"
        } outline-none text-[12px] ${borderRadius}`}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
      />
      <img
        className="absolute top-[30%] left-[16px]"
        src={SearchIcon}
        alt="search-icon"
      />
      <div className={`absolute ${btnTop}  ${btnRight}`}>
        {onClick && (
          <Button
            backgroundColor={"bg-[#2922b3]"}
            label="Search"
            width={"w-[115px]"}
            height={buttonHeight}
            borderRadius={"rounded-[8px]"}
            onClick={onClick}
          />
        )}
      </div>
    </div>
  );
};

export default SearchInput;
