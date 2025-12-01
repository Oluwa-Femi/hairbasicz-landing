import React, { useEffect } from "react";
import OrderProductComp from "../../../components/AccountInformation/OrderProductComp";
import { getSingleOrderDetails } from "../../../store/MyOrders/myordersActions";
import { selectMyorders } from "../../../store/MyOrders/myordersSlice";
import { calculateSubTotal } from "../../../utils/functions/calculateTotal";
import { priceSplitter } from "../../../utils/functions/priceSplitter";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../utils/functions/formatDate";
import { getUserProfile } from "../../../store/Profile/profileActions";
import { selectProfile } from "../../../store/Profile/profileSlice";
import { Spinner } from "@chakra-ui/spinner";

const OrderDetails = () => {
  let params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleOrderDetails({ reference: params?.reference }));
  }, []);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);
  const userProfile = useSelector(selectProfile);
  const userProfileData = userProfile?.data?.data;
  const orders = useSelector(selectMyorders);
  const singleOrderData = orders?.data;

  return (
    <div className="px-[24px]">
      {orders?.isGetting ? (
        <div className="ml-8 mt-8">
          <Spinner size="xl" />
        </div>
      ) : (
        <>
          {singleOrderData?.order_items?.map((orderItems, index) => (
            <OrderProductComp
              key={index}
              index={index}
              orderItems={orderItems}
              orderRef={singleOrderData?.order_items[index]?.order_id}
            />
          ))}
          <div className="flex justify-between">
            <div></div>
            <div className="flex justify-between w-[50%] p-[16px]">
              <div>
                <p className="text-[14px] text-[#868A91] font-[Gilroy-Medium]">
                  Subtotal
                </p>
                <p className="text-[14px] text-[#868A91] font-[Gilroy-Medium] my-[10px]">
                  Shipping
                </p>
                <p className="text-[14px] text-[#2F3133] font-[600] font-[Gilroy-Medium]">
                  Total
                </p>
              </div>
              <div>
                <p className="text-[14px] text-[#868A91] font-[Gilroy-Medium]">
                  ₦{" "}
                  {priceSplitter(
                    calculateSubTotal(singleOrderData?.order_items)
                  ) || 0}
                </p>
                <p className="text-[14px] text-[#868A91] font-[Gilroy-Medium] my-[10px]">
                  ₦ {priceSplitter(singleOrderData?.shipping_fee) || 0}
                </p>
                <p className="text-[14px] text-[#2F3133] font-[600] font-[Gilroy-Medium]">
                  ₦{" "}
                  {priceSplitter(
                    calculateSubTotal(singleOrderData?.order_items) +
                      singleOrderData?.shipping_fee
                  ) || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-between gap-5 py-[24px] border-y-[0.5px] border-solid border-[#D8DCE2]">
            <div className="py-[12px] px-[24px] w-[50%] border-[1px] rounded border-solid border-[#EBEEF2]">
              <p className="text-base text-black font-[Gilroy-Medium] mb-[8px]">
                Delivery address:
              </p>
              <p className="text-sm text-[#868A91] font-[400px] font-[Gilroy-Regular]">
                {`${userProfileData?.first_name || "-"} ${
                  userProfileData?.last_name || "-"
                }`}
              </p>
              <p className="text-sm text-[#868A91] font-[400px] font-[Gilroy-Regular] my-[8px]">
                {userProfileData?.phone_number || "-"}
              </p>
              <p className="text-sm text-[#868A91] font-[400px] font-[Gilroy-Regular]">
                {singleOrderData?.delivery_location || "-"}{" "}
              </p>
            </div>
            <div className="py-[12px] px-[24px] w-[50%] border-[1px] border-solid rounded border-[#EBEEF2]">
              <p className="text-base text-black font-[500px] font-[Gilroy-Medium] mb-[8px]">
                More details:
              </p>
              <p className="text-sm text-[#868A91] font-[400px] font-[Gilroy-Regular]">
                Order No: {singleOrderData?.tracking_number || "-"}
              </p>
              <p className="text-sm text-[#868A91] font-[400px] font-[Gilroy-Regular] my-[8px]">
                Order placed on:{" "}
                {formatDate(singleOrderData?.updated_at || "-")}
              </p>
              <p className="text-sm text-[#868A91] font-[400px] font-[Gilroy-Regular]">
                Payment method: {singleOrderData?.payment_method || "-"}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
