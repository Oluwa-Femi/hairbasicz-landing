import { Button } from "../Button/Button";
import PropTypes from "prop-types";
import VisaCard from "../../assets/visa.png";
import Mastercard from "../../assets/mastercard.png";
import Skrill from "../../assets/skrill.png";
import Verve from "../../assets/verve.png";
import { priceSplitter } from "../../utils/functions/priceSplitter";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const OrderSummary = ({
  itemCount,
  subTotal,
  // amount,
  // discount,
  total,
  label,
  onClick,
  isloading,
  disabled,
  checkbox,
  setCheckbox,
  shippingFee,
  userAddress,
  locations,
  errorMsg,
  cart,
}) => {
  useEffect(() => {
    cart && setCheckbox(false);
  }, [subTotal]);

  const location = useLocation();
  return (
    <div>
      <div className="py-[14px] bg-white xl:min-w-[342px]  rounded-[10px] md:border-[1px] lg:border-[1px] xl:border-[1px] 2xl:border-[1px] border-solid border-[#D8DCE2]">
        <div className="border-b-[1px] border-solid border-[#EBEEF2]  pb-[10px]">
          <div className="flex justify-between px-[24px] ">
            <span className="text-[16px] font-[Gilroy-Medium]">
              Order summary
            </span>
            {!shippingFee && (
              <span className="text-[16px] font-[Gilroy-Medium]">
                {itemCount || 0} Items
              </span>
            )}
          </div>
        </div>
        {/* Have to come back to shipping fee responsiveness  */}
        {shippingFee && (
          <div className="pb-[16px] border-b-[1px] border-solid border-[#EBEEF2]">
            <div className="px-[24px] flex justify-between mt-[16px]">
              <span className="text-[#5F6166] text-[14px] font-[Gilroy-Regular]">
                Delivery charges:
              </span>
              <span className="text-[14px] font-[Gilroy-Regular]">
                {shippingFee}
              </span>
            </div>
          </div>
        )}
        <div className="pb-[16px] border-b-[1px] border-solid border-[#EBEEF2] ">
          <div className="px-[24px] mt-[16px] flex flex-col gap-[10px]">
            <div className="flex justify-between">
              <span className="text-[#5F6166] text-[14px] font-[Gilroy-Regular]">
                Total Order:
              </span>
              <span className="text-[14px] font-[Gilroy-Regular]">
                ₦ {priceSplitter(subTotal || 0.0)}
              </span>
            </div>
            {/* <div className="flex justify-between">
              <span className="text-[#5F6166] text-[14px] font-[Gilroy-Regular]">
                Monthly Payment:
              </span>
              <span className="text-[14px] font-[Gilroy-Regular]">
                ₦ {priceSplitter(amount || 0.0)}
              </span>
            </div> */}
            {/* <div className="flex justify-between">
              <span className="text-[#5F6166] text-[14px] font-[Gilroy-Regular]">
                Discount:
              </span>
              <span className="text-[14px] font-[Gilroy-Regular]">
                ₦ {priceSplitter(discount || 0.0)}
              </span>
            </div> */}
          </div>
        </div>
        <div className="px-[24px] pb-[16px] border-b-[1px] border-solid border-[#EBEEF2]">
          <div className=" justify-between  mt-[16px] flex md:flex lg:flex xl:flex 2xl:flex">
            <span className="text-[14px] text-black font-[Gilroy-Bold]">
              Total:
            </span>
            <span className="text-[14px] text-black font-[Gilroy-Bold]">
              ₦ {priceSplitter(total || 0.0)}
            </span>
          </div>

          {(location.pathname == "/cart" ||
            location.pathname.includes("/checkout")) && (
            <div className="text-center mt-[16px] pb-[16px]  border-b-[1px] border-solid border-[#EBEEF2] hidden lg:block xl:block 2xl:block">
              <Button
                width={"w-[294px]"}
                height={"h-[49px]"}
                borderRadius={"rounded-[8px]"}
                label={label}
                fontSize={"text-[16px]"}
                backgroundColor={"bg-[#2922b3]"}
                onClick={onClick}
                isloading={isloading}
                disabled={disabled || (checkbox && errorMsg)}
              />
              {(locations === "Select" || userAddress === null) && (
                <p className=" text-[12px] text-red-600">
                  Choose a delivery location and address
                </p>
              )}
            </div>
          )}
          <div>
            <div className="px-[24px] mt-[20px] hidden lg:flex xl:flex 2xl:flex items-center justify-between ">
              <span className="text-[#5F6166] text-[12px]">
                We accept these:
              </span>
              <img src={VisaCard} alt="visa-card" />
              <img src={Mastercard} alt="master-card" />
              <img src={Skrill} alt="skrill" />
              <img src={Verve} alt="verve" />
            </div>
            <div className="px-[24px] mt-[8px]">
              <p className="text-[12px] text-[#9DA1A8] hidden md:block">
                🔒 Transactions are 100% safe & secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  tax: PropTypes.number,
  discount: PropTypes.number,
  subTotal: PropTypes.number,
  total: PropTypes.number,
  itemCount: PropTypes.number,
  label: PropTypes.string,
  onClick: PropTypes.func,
  isloading: PropTypes.bool,
  cart: PropTypes.bool,
};

export default OrderSummary;
