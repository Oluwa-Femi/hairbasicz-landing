import React from "react";
import PropTypes from "prop-types";
import { Button } from "../Button/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProductToCart, getCart } from "../../store/Cart/cartActions";
import { priceSplitter } from "../../utils/functions/priceSplitter";

const OrderProductComp = ({ orderItems, orderRef, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleReOrderClick = (orderItems) => {
    const newObj = {};
    newObj[orderItems?.product_variant_id] = orderItems?.quantity;

    const payload = {
      cartItems: newObj
    };
    dispatch(addProductToCart(payload)).then(function () {
      dispatch(getCart());
    });
    navigate("/cart");
  };
  return (
    <div className="flex justify-between py-[26px] border-b-[0.5px] border-solid border-[#D8DCE2]">
      <div className="flex gap-5">
        <div className="w-[87px] h-[87px] bg-[#F8F9FB]">
          <img
            className="w-[100%] h-full object-contain"
            src={orderItems?.product_details?.images[0]}
            alt=""
          />
        </div>
        <div>
          <p className="text-base text-black font-[700px] font-[Gilroy-Bold]">
            {orderItems?.product_details?.name || 0}
          </p>
          <p className="text-[#5F6166] text-sm font-[Gilroy-Medium] my-[12px]">
            <span className="font-[Gilroy-Bold]">Quantity:</span>{" "}
            {orderItems?.quantity || 0}
          </p>
          {orderItems?.product_details?.discount_amount !== null ? (
            <p className="text-[#5F6166] text-sm font-[Gilroy-Medium] my-[12px]">
              <span className="font-[Gilroy-Bold]">Amount: </span> ₦
              {priceSplitter(orderItems?.product_details?.discount_amount) || 0}
            </p>
          ) : (
            <p className="text-[#5F6166] text-sm font-[Gilroy-Medium] my-[12px]">
              <span className="font-[Gilroy-Bold]">Amount: </span> ₦
              {priceSplitter(orderItems?.amount) || 0}
            </p>
          )}
        </div>
      </div>
      <div>
        {(location.pathname.includes("/paid") ||
          location.pathname.includes("/delivered") ||
          location.pathname.includes("/closed")) && (
          <div className="flex gap-4">
            {!orderItems?.product_details?.exists_in_review && (
              <Button
                backgroundColor={"bg-white"}
                borderColor={"border-[#2922b3]"}
                label={"Write a review"}
                color={"text-[#2922b3]"}
                fontSize={"text-[16px]"}
                width={"w-[136px]"}
                height={"h-[36px]"}
                borderRadius={"rounded-[8px]"}
                paddingX={"px-[16px]"}
                paddingY={"px-[8px]"}
                onClick={() =>
                  navigate(
                    `/store/profile/order-history/${orderItems?.product_variant_id}/write-a-review`,
                    {
                      state: {
                        productVariantId: orderItems?.product_variant_id,
                        orderReference: orderRef,
                        index
                      }
                    }
                  )
                }
              />
            )}
            <Button
              backgroundColor={"bg-[#2922b3]"}
              borderColor={"border-[#2922b3]"}
              label={"Reorder"}
              color={"text-[#ffffff]"}
              fontSize={"text-[16px]"}
              width={"w-[115px]"}
              height={"h-[36px]"}
              borderRadius={"rounded-[8px]"}
              paddingX={"px-[16px]"}
              paddingY={"px-[8px]"}
              onClick={() => handleReOrderClick(orderItems)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

OrderProductComp.propTypes = {
  orderItems: PropTypes.any
};
export default OrderProductComp;
