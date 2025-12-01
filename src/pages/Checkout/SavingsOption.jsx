/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";
import { priceSplitter } from "../../utils/functions/priceSplitter";

const SavingsOption = ({ option }) => {
  return (
    <div
      className={`flex justify-between items-center h-[52px] w-[full] border rounded-[4px] px-4 bg-[#FFFBEB] mt-4`}
    >
      <div className="flex gap-2 items-center">
        <img src={option?.icon} alt="" className="w-[18px] h-[18px] " />
        <p
          className={`${option?.textColor} text-[12px] font-[500] font-[Gilroy-Medium] `}
        >
          {option?.name}
        </p>
      </div>
      <div>
        <p
          className={`$ text-[#000000] text-[14px] font-[500] font-[Gilroy-Medium]`}
        >
          ₦ {priceSplitter(option?.amount || 0.0)}
        </p>
      </div>
    </div>
  );
};

SavingsOption.propTypes = {
  option: PropTypes.shape({
    amount: PropTypes.number,
    icon: PropTypes.any,
    name: PropTypes.any,
    textColor: PropTypes.any
  })
};

export default SavingsOption;
