import React from "react";
import ProgressIcon from "../../../assets/progressIcon.svg";
import { formatDateTimezone } from "../../../utils/functions/formatDate";
import { priceSplitter } from "../../../utils/functions/priceSplitter";

const PaymentHistory = ({ singleOrderData }) => {
  return (
    <div className="my-[28px]">
      {singleOrderData?.map((repayment, index) => (
        <ul key={index} className="flex gap-5 h-[110px]">
          <img src={ProgressIcon} alt=" " />
          <li className="mt-[-5px]">
            {!repayment?.paid_on ? (
              <p className="flex text-[#868A91] font-[Gilroy-Medium] text-sm font-[500]">
                Due date: &nbsp;{" "}
                {formatDateTimezone(repayment?.due_date) || "-"}
              </p>
            ) : (
              <p className="flex text-[#868A91] font-[Gilroy-Medium] text-sm font-[500]">
                Date paid: &nbsp;{" "}
                {formatDateTimezone(repayment?.paid_on) || "-"}
              </p>
            )}
            {!repayment?.amount_paid ? (
              <p className="text-[#868A91] font-[Gilroy-Medium] text-base">
                Amount: ₦{priceSplitter(repayment?.amount || "-") || "-"}
              </p>
            ) : (
              <p className="text-[#868A91] font-[Gilroy-Medium] text-base">
                Amount paid: ₦
                {priceSplitter(repayment?.amount_paid || "-") || "-"}
              </p>
            )}
            {repayment?.transaction_reference && (
              <p className="text-[#868A91] font-[Gilroy-Medium] text-base">
                Transaction reference: {repayment?.transaction_reference || "-"}
              </p>
            )}
            {repayment?.payment_channel && (
              <p className="text-[#868A91] font-[Gilroy-Medium] text-base">
                Transaction reference: {repayment?.payment_channel || "-"}
              </p>
            )}
          </li>
        </ul>
      ))}
    </div>
  );
};

export default PaymentHistory;
