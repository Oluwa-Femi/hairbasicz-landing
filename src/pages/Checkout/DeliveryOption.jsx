import React from "react";
import PropTypes from "prop-types";
import { Checkbox } from "../../components/Checkbox/Checkbox";
import { priceSplitter } from "../../utils/functions/priceSplitter";

const DeliveryOption = ({ deliveryOption, estimatedTime, amount }) => {
  return (
    <div className="flex px-[16px] py-[14px]">
      <div className="pt-[5px] pr-[5px]">
        <Checkbox width={"w-[16px]"} height={"h-[16px]"} />
      </div>
      <div>
        <p className="text-sm font-semibold font-[Gilroy-Bold]">
          {deliveryOption}{" "}
        </p>
        <p className="text-sm">{estimatedTime}</p>
        <p className="text-[#5F6166] text-sm font-[Gilroy-Medium]">
          ₦ {priceSplitter(amount)}
        </p>
      </div>
    </div>
  );
};
DeliveryOption.propTypes = {
  amount: PropTypes.number,
  deliveryOption: PropTypes.string,
  estimatedTime: PropTypes.string,
};
export default DeliveryOption;
