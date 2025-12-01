/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { priceSplitter } from "../../../utils/functions/priceSplitter";
import OrderStatus from "./OrderStatus";

function Order(props) {
  const { myorder, onClick, handleReOrderClick } = props;
  return (
    <div className="flex justify-between border-solid border-b-[1px] border-[#EBEEF2] py-5">
      <div className="flex gap-5">
        <div className="w-[111px] h-[111px] bg-[#F8F9FB]">
          <img
            src={myorder?.order_items[0]?.product_details?.images[0]}
            className="w-full h-full"
            alt="product_icon"
          />
        </div>
        <div className="grid ">
          <div className="text-black text-[16px] font-[Gilroy-SemiBold] font-[700]">
            {myorder?.order_items[0]?.product_details?.name}{" "}
            {myorder?.order_items?.length > 1 &&
              `and  ${myorder?.order_items?.length - 1}  others`}
          </div>
          <div className="text-[#5F6166] text-[14px] font-[Gilroy-Medium] font-[500]">
            Order No: {myorder?.tracking_number}
          </div>
          <div className="text-[#868A91] text-[14px] font-[Gilroy-Regular] font-[400]">
            Quantity: {myorder?.order_items[0]?.quantity}
          </div>
          <OrderStatus status={myorder?.status} />
        </div>
      </div>

      <div className="grid  justify-items-end content-between">
        <div className="flex gap-5">
          {(myorder?.status === "declined" || myorder?.status === "closed") && (
            <div
              onClick={handleReOrderClick}
              className="bg-white border-[#2922b3] border-solid border-[1px] rounded-[8px] py-[6px] px-[16px] cursor-pointer text-[#2922b3] text-[16px] font-[Gilroy-Medium] font-[500]"
            >
              Reorder
            </div>
          )}
          <div
            onClick={onClick}
            className="bg-[#2922b3] rounded-[8px] py-[6px] px-[16px] cursor-pointer text-white text-[16px] font-[Gilroy-Medium] font-[500]"
          >
            See details
          </div>
        </div>
        <p className="text-[14px] py-[6px] px-[10px] border-solid border-[1px] border-[#EBEEF2] rounded-[4px] text-center bg-[#F8F9FB] font-[400] font-[Gilroy-Regular]">
          Amount: ₦{priceSplitter(myorder?.amount)}
        </p>
      </div>
    </div>
  );
}

export default Order;
