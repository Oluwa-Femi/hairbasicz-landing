import React from "react";

const ProductManagementCard = ({
  Title,
  Total,
  Icon,
  TotalColor,
  BackgroundColor,
}) => {
  return (
    <div>
      <div
        className={`p-6 ${BackgroundColor} flex w-[355px] justify-between rounded-[8px]`}
      >
        <div className="flex flex-col gap-[4px]">
          <p className="text-[14px]">{Title}</p>
          <div className={`text-[24px] ${TotalColor} font-bold`}>{Total}</div>
        </div>
        <img alt="icon" src={Icon} />
      </div>
    </div>
  );
};

export default ProductManagementCard;
