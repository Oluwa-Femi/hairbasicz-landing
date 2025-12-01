import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { priceSplitter } from "../../utils/functions/priceSplitter";
import CheckoutOrders from "./CheckoutOrders";
import Header from "../../components/Header/Header";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import {
  checkout,
  getSingleOrderDetails,
} from "../../store/MyOrders/myordersActions";
import { selectMyorders } from "../../store/MyOrders/myordersSlice";
import { usePaystackPayment } from "react-paystack";
import Storage from "../../utils/services/storage";
import responseHandler from "../../utils/notifications/responseHandler";
import { Button } from "../../components/Button/Button";

const Checkout = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleOrderDetails({ reference: params?.reference }));
  }, [dispatch, params?.reference]);

  const userEmail = JSON.parse(Storage.get("user-email"));

  const orders = useSelector(selectMyorders);

  const orderItems = orders?.data;

  const firstInstallment = 0.25 * orderItems?.total_amount;

  const config = {
    reference: params?.reference,
    email: userEmail,
    amount: firstInstallment * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey:
      process.env.VITE_REACT_APP_PAYSMOSMO_ECOMMERCE_PAYSTACK_PUBLIC_KEY,
  };

  const onSuccess = (reference) => {
    // setTransRef(reference?.trxref);
    const payload = {
      transaction_reference: reference?.trxref,
    };
    const payloadValues = {
      reference: params?.reference,
      payload,
      navigate,
    };
    dispatch(checkout(payloadValues)).then(function () {
      dispatch(getSingleOrderDetails({ reference: params?.reference }));
    });
  };

  const onClose = () => {
    responseHandler({
      status: "error",
      message: "Payment unsuccessful, please try again.",
    });
  };

  const initializePayment = usePaystackPayment(config);

  const totalNoDiscount = orderItems?.order_items?.reduce(
    (accumulator, object) => {
      return accumulator + object.amount * object.quantity;
    },
    0
  );

  const totalDiscountAmount = orderItems?.order_items?.reduce(
    (accumulator, object) => {
      return (
        accumulator +
        (object?.product_details?.discount_amount || object.amount) *
          object.quantity
      );
    },
    0
  );

  return (
    <div className=" w-screen h-full min-h-screen xsm:pb-24 sm:pb-24">
      <Header showCheckout />
      <div></div>

      <div className="lg:px-[128px] xl:px-[128px] 2xl:px-[128px]">
        <div className="flex xsm:flex-col-reverse sm:flex-col-reverse xsm:gap-4 sm:gap-4 flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-between mt-6">
          <div className="lg:w-[818px] xl:w-[818px] 2xl:w-[1100px]">
            <CheckoutOrders
              ReviewItem={orderItems}
              isGetting={orders?.isGetting}
            />
          </div>
          <OrderSummary
            label={"Proceed to payment"}
            onClick={() => {
              initializePayment(onSuccess, onClose);
            }}
            isloading={orders?.isCheckingOut}
            disabled={orders?.isCheckingOut}
            itemCount={2}
            subTotal={orderItems?.products_cost}
            discount={totalNoDiscount - totalDiscountAmount}
            total={firstInstallment}
            shippingFee={`₦ ${priceSplitter(orderItems?.shipping_fee || 0.0)}`}
          />
        </div>
        <p className="xsm:px-5 sm:px-5 py-[40px] text-[#868A90] text-sm">
          Copyright ©2024 Hairbasicz. All rights reserved. User Agreement,
          Privacy policy, Terms of use, and cookies{" "}
        </p>

        <div className="grid place-items-center lg:hidden xl:hidden 2xl:hidden">
          <Button
            width={"w-[90%]"}
            height={"h-[49px]"}
            borderRadius={"rounded-[8px]"}
            label={"Proceed to payment"}
            fontSize={"text-[16px]"}
            backgroundColor={"bg-[#2922b3]"}
            onClick={() => {
              initializePayment(onSuccess, onClose);
            }}
            isloading={orders?.isCheckingOut}
            disabled={orders?.isCheckingOut}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
