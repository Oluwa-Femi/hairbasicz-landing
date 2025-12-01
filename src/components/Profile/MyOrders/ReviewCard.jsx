import React from "react";
import { priceSplitter } from "../../../utils/functions/priceSplitter";

const ReviewCard = ({ order }) => {
  const amount = "₦" + priceSplitter(order?.amount || 0.0);

  return (
    <div className="py-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img
          className="max-w-[87px] max-h-[87px]"
          src={order?.product_details?.images[0]}
          alt=""
        />
        <div className="flex flex-col space-y-3">
          <h2 className="text-[16px] font-[Gilroy-SemiBold] ">
            {order?.product_details?.name}
          </h2>
          <p className="text-[14px] text-[#5F6166]">
            Quantity: {order?.quantity}
          </p>
          <div className="text-[12px] text-[#868A90] bg-[#F8F9FB] w-fit px-2 rounded-[24px] border-solid border-[1px] border-[#868A90] py-[1px]">
            Closed order
          </div>
        </div>
      </div>
      {order?.product_details?.discount_amount !== null ? (
        <div className="flex flex-col gap-4">
          <h3 className="text-[18px] font-[Gilroy-Medium]">
            ₦ {priceSplitter(order?.product_details?.discount_amount)}
          </h3>
          <p className="text-[#868A90] text-[14px]">
            First instalment (25%): ₦{" "}
            {priceSplitter(0.25 * order?.product_details?.discount_amount)}
          </p>
          {/* <div className="text-[14px] px-2 bg-[#F8F9FB] w-fit border-solid border-[1px] py-1 rounded-[4px] border-[#EBEEF2]">
            Price per month: ₦{" "}
            {priceSplitter(
              (order?.product_details?.discount_amount -
                0.25 * order?.product_details?.discount_amount) /
                5
            )}
          </div> */}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h3 className="text-[18px] font-[Gilroy-Medium]">{amount}</h3>
          {/* <p className="text-[#868A90] text-[14px]">
            First instalment (25%): ₦ {priceSplitter(0.25 * order?.amount)}
          </p>
          <div className="text-[14px] px-2 bg-[#F8F9FB] w-fit border-solid border-[1px] py-1 rounded-[4px] border-[#EBEEF2]">
            Price per month: ₦{" "}
            {priceSplitter((order?.amount - 0.25 * order?.amount) / 5)}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
