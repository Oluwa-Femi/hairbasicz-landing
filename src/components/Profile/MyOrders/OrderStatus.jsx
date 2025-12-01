import React from "react";

function OrderStatus(props) {
  const { status } = props;

  const statusType = (status) => {
    switch (status) {
      case "approved":
        return "border-[#469F00] bg-[#F4FFEB] text-[#469F00]"; // Approved Status
      case "declined":
        return "border-[#EF4444] bg-[#FEF2F2] text-[#EF4444]"; //Declined status
      case "closed":
        return "border-[#868A91] bg-[#F8F9FB] text-[#868A91]"; //Closed status
      case "ongoing":
        return "border-[#F59E0B] bg-[#FFFBEB] text-[#F59E0B]"; //Ongoing
      case "delivered":
        return "border-[#8764B8] bg-[#F1E8FF] text-[#8764B8]"; //Delevered status
      case "paid":
        return "border-[#0078D4] bg-[#E0EFFB] text-[#0078D4]"; // Paid Status
    }
  };

  return (
    <div
      className={`border-solid border-[1px] py-[3px] px-[12px] ${statusType(
        status,
      )}  rounded-[24px] w-[73px]  flex justify-center items-center  capitalize text-[12px] font-[Gilroy-Medium] font-[500]`}
    >
      {status}
    </div>
  );
}

export default OrderStatus;
