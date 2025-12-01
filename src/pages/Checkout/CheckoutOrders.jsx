import React from "react";
import TickIcon from "../../assets/tickicon.svg";
import { priceSplitter } from "../../utils/functions/priceSplitter";
import { Spinner } from "@chakra-ui/react";

function CheckoutOrders(props) {
  const { ReviewItem, isGetting } = props;
  const itemAmount = (item) => {
    if (item?.product_details?.discount_amount !== null) {
      return item?.product_details?.discount_amount;
    } else {
      return item?.amount;
    }
  };

  return (
    <div className="bg-white rounded-[10px]  py-[17px] border-[1px] border-solid border-[#D8DCE2] lg:min-h-[575px] xl:min-h-[575px] 2xl:min -h-[575px] max-h-[915px] overflow-y-scroll">
      <header className="flex justify-between text-[16px] font-[Gilroy-Medium] px-[24px] pb-[16px] border-b-solid border-b-[1px] border-b-[rgb(235,238,242)]">
        <span className="flex items-center gap-[8px]">
          <img alt="icon" src={TickIcon} />
          <p className="text-[16px] font-[Gilroy-Medium]">
            Review Items in cart{" "}
          </p>
        </span>
        {/* <span className="flex items-center gap-[8px]">
          <p className="text-[#2922b3] text-sm font-[Gilroy-Medium]">
            Modify cart
          </p>
          <img src={ArrowRight} alt="" />
        </span> */}
      </header>
      {isGetting ? (
        <div className="ml-8 mt-8">
          <Spinner size="lg" />
        </div>
      ) : (
        ReviewItem?.order_items?.map((item, index) => (
          <div
            key={index}
            className="border-b-[#EBEEF2] border-b-[1px] border-solid pb-[16px]"
          >
            <div className="px-[24px] pt-[16px] flex xsm:flex-col sm:items-center justify-between">
              <div className="flex gap-[16px] items-start">
                <div>
                  <img
                    className="w-[96px] h-[96px]"
                    src={item?.product_details?.images[0]}
                    alt="Elepaq-Generator"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[16px] font-[Gilroy-Medium] xsm:mt-5 sm:mt-5">
                    {item?.product_details?.name}
                  </p>
                  <p className="text-[#868A90] text-[14px]">
                    {item.description}{" "}
                  </p>
                  {/* <div
                    className={`text-[14px] text-[#22C55E]
                px-[8px] py-[4px] border-solid border-[1px] w-fit rounded-[4px]`}
                  >
                    {"Quantity: " + item.quantity}
                  </div> */}
                </div>
              </div>
              <div className="xsm:text-left sm:textleft lg:text-right xl:text-right flex flex-col gap-[10px] xsm:w-full sm:w-full xsm:ml-0 sm:ml-0 ml-[10%]">
                <p className="text-[16px] font-[Gilroy-Medium]">
                  ₦ {priceSplitter(itemAmount(item)) || 0.0}
                </p>
                {/* <p className="text-[#868A90] text-[14px]">
                  First installment (25%): ₦{" "}
                  {priceSplitter(0.25 * itemAmount(item)) || 0.0}
                </p>
                <p className="text-[14px] p-[10px] border-solid border-[1px] border-[#EBEEF2] rounded-[4px] text-center bg-[#F8F9FB] xsm:w-fit sm:w-fit">
                  Price per month: ₦
                  {priceSplitter(
                    (itemAmount(item) - 0.25 * itemAmount(item)) / 5
                  ) || 0.0}
                </p> */}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CheckoutOrders;
