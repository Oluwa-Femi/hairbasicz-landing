/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import DeleteIcon from "../../assets/deleteicon.png";
import Counter from "../Counter/Counter";
import OrderSummary from "../OrderSummary/OrderSummary";
import { priceSplitter } from "../../utils/functions/priceSplitter";
import { useDispatch } from "react-redux";
import {
  getCart,
  removeProductFromCart,
  userInstorage,
} from "../../store/Cart/cartActions";
import { assignRemoveCart } from "../../utils/functions/CreateNewArray";
import { Spinner } from "@chakra-ui/react";

const ShoppingCart = (props) => {
  const {
    carts,
    handleRequestOrder,
    checkbox,
    setCheckbox,
    selectedCheckList,
    deliveryLocations,
    userAddress,
    locations,
    disabled,
    setSelectedCheckList,
    totalMonthlyPayment,
    savingsBalances,
    collateralPercentage,
    lockedAmount,
    errorMsg,
  } = props;
  const dispatch = useDispatch();

  const [, setCount] = useState(1);

  const handleCheckbox = (e, item) => {
    if (e.target.checked) {
      setSelectedCheckList((prev) => [...prev, item]);
    } else {
      const newSelectedCheckList = selectedCheckList.filter(
        (checklist) => checklist.id !== item.id
      );
      setSelectedCheckList(newSelectedCheckList);
    }
  };

  const ItemDetails = userInstorage()
    ? carts?.isEditingSuccess
      ? carts?.editedData?.data?.cart || []
      : carts?.data?.cart || []
    : carts?.data?.cart || [];

  const cartItems = carts?.data?.cart?.length;
  const selectedProducts =
    selectedCheckList?.length > 0 ? selectedCheckList : ItemDetails ?? [];

  const totalAmount = selectedProducts.reduce((accumulator, object) => {
    return (
      accumulator +
      (object.discount_amount || object.amount) * object.cart_quantity
    );
  }, 0);

  const totalOrderAmount = selectedProducts.reduce((accumulator, object) => {
    return (
      accumulator +
      (object.discount_amount || object.variant_amount) * object.quantity
    );
  }, 0);

  const totalNoDiscount = selectedProducts.reduce((accumulator, object) => {
    return (
      accumulator +
      (object.amount || object.variant_amount) *
        (object.cart_quantity || object.quantity)
    );
  }, 0);

  const totalDiscountAmount = selectedProducts.reduce((accumulator, object) => {
    return (
      accumulator +
      object.discount_amount * (object.cart_quantity || object.quantity)
    );
  }, 0);

  const totalUpfront = selectedProducts.reduce((accumulator, object) => {
    return (
      accumulator +
      (object?.discount_amount !== null
        ? (userInstorage() &&
            1 * (object?.discount_amount * object?.quantity)) ||
          1 * (object?.discount_amount * object?.cart_quantity) ||
          1 * (object?.variant_amount * object?.quantity)
        : 1 * (object?.variant_amount * object?.quantity) ||
          1 * (object?.amount * object?.cart_quantity))
    );
  }, 0);

  const handleRemoveFromCart = (id) => {
    const cartItems = assignRemoveCart(ItemDetails, id);

    const payload = {
      cartItems: cartItems,
    };

    dispatch(removeProductFromCart(userInstorage() ? payload : id)).then(
      function () {
        dispatch(getCart());
      }
    );
  };
  const checkedIsInList = (item) => {
    return ItemDetails.some((listItem) => listItem.id === item.id);
  };

  return (
    <div className="md:px-[128px] lg:px-[128px] xl:px-[128px] 2xl:px-[128px] flex flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-between mt-5 lg:gap-4">
      <div className="lg:w-[818px] xl:w-[818px] rounded-[10px] min-h-[490px] overflow-y-scroll py-[17px] bg-white  border-[1px] border-solid border-[#D8DCE2] 2xl:w-[1100px]">
        <header className="text-[16px] font-[Gilroy-Medium] px-[24px] pb-[16px] border-b-solid border-b-[1px] border-b-[rgb(235,238,242)]">
          Item Details
        </header>
        {carts?.isGetting ? (
          <div className="ml-8 mt-8">
            <Spinner size="lg" />
          </div>
        ) : cartItems === 0 || ItemDetails?.length === 0 ? (
          <div className="flex justify-center mt-[60px]">No Products Added</div>
        ) : (
          ItemDetails?.length > 0 &&
          ItemDetails?.map((item, index) => (
            <div
              key={index}
              className="border-b-[#EBEEF2] border-b-[1px] border-solid pb-[16px]"
            >
              <div className="px-[24px] pt-[16px] flex xsm:flex-col sm:flex-col md:flex-col lg:flex-col sm:items-left md:items-left lg:items-left xsm:items-stretch justify-between">
                <div className="flex gap-[16px]">
                  <Checkbox
                    checked={() => checkedIsInList(item)}
                    onChange={(e) => handleCheckbox(e, item, index)}
                  />

                  <div>
                    <img
                      className="w-[96px] h-[96px]"
                      src={
                        userInstorage()
                          ? item?.variant_images?.[0]
                          : item?.images?.[0]
                      }
                      alt="product_image"
                    />
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-[16px] font-[Gilroy-Medium]">
                      {item?.variant_name || item?.name}
                    </p>
                    <p className="text-[#868A90] text-[14px]">
                      {userInstorage()
                        ? item?.variant_characteristic_value
                        : item?.characteristic_value}
                    </p>
                  </div>
                </div>
                <div className="text-right flex flex-col gap-[10px] xsm:text-left xsm:ml-[10%]">
                  {item?.discount_amount !== null ? (
                    <p className="text-[16px] font-[Gilroy-Medium] xsm:mt-3">
                      ₦{" "}
                      {priceSplitter(
                        item?.discount_amount * item?.cart_quantity ||
                          (item?.discount_amount || item?.variant_amount) *
                            item?.quantity
                      ) || 0.0}
                    </p>
                  ) : (
                    <p className="text-[16px] font-[Gilroy-Medium]">
                      ₦{" "}
                      {priceSplitter(
                        item?.variant_amount * item?.quantity ||
                          item?.amount * item?.cart_quantity
                      ) || 0.0}
                    </p>
                  )}
                  {/* <p className="text-[#868A90] text-[14px]">
                    First installment (25%): ₦{" "}
                    {priceSplitter(
                      0.25 * (item?.discount_amount * item?.cart_quantity) ||
                        0.25 *
                          ((item?.discount_amount || item?.variant_amount) *
                            item?.quantity) ||
                        0.25 * (item?.variant_amount * item?.quantity) ||
                        0.25 * (item?.amount * item?.cart_quantity)
                    ) || 0.0}
                  </p> */}
                  {/* {item?.discount_amount !== null ? (
                    <p className="text-[14px] xsm:w-fit sm:w-fit p-[10px] border-solid border-[1px] border-[#EBEEF2] rounded-[4px] text-center bg-[#F8F9FB]">
                      Price per month: ₦{" "}
                      {priceSplitter(
                        (userInstorage() &&
                          (item?.discount_amount * item?.quantity -
                            0.25 * (item?.discount_amount * item?.quantity)) /
                            5) ||
                          (item?.discount_amount * item?.cart_quantity -
                            0.25 *
                              (item?.discount_amount * item?.cart_quantity)) /
                            5 ||
                          (item?.variant_amount * item?.quantity -
                            0.25 * (item?.variant_amount * item?.quantity)) /
                            5
                      ) || 0.0}
                    </p>
                  ) : (
                    <p className="text-[14px] xsm:w-fit sm:w-fit p-[10px] border-solid border-[1px] border-[#EBEEF2] rounded-[4px] text-center bg-[#F8F9FB]">
                      Price per month: ₦{" "}
                      {priceSplitter(
                        (item?.variant_amount * item?.quantity -
                          0.25 * (item?.variant_amount * item?.quantity)) /
                          5 ||
                          (item?.amount * item?.cart_quantity -
                            0.25 * (item?.amount * item?.cart_quantity)) /
                            5
                      ) || 0.0}
                    </p>
                  )} */}
                </div>
              </div>
              <div className="flex justify-between pr-[24px] pl-[64px] mt-[12px]">
                <div
                  className="cursor-pointer flex items-center gap-[4px]"
                  onClick={() =>
                    handleRemoveFromCart(
                      userInstorage() ? item?.reference : index
                    )
                  }
                >
                  <img
                    className="w-[18px] h-[18px]"
                    src={DeleteIcon}
                    alt="delete-icon"
                  />
                  <span className="text-[#EF4444] text-[14px]">
                    Remove item
                  </span>
                </div>
                {/* )} */}
                <div>
                  <Counter
                    id={userInstorage() ? item?.reference : item.id}
                    count={
                      userInstorage() ? item?.quantity : item?.cart_quantity
                    }
                    setCount={setCount}
                    carts={ItemDetails}
                    userInstorage={userInstorage}
                    shoppingCartPage={true}
                    isEditing={carts?.isEditing}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="hidden sm:block lg:block xl:block 2xl:block">
        <OrderSummary
          label="Request order"
          onClick={() => handleRequestOrder()}
          isloading={deliveryLocations?.isCreatingOrder}
          disabled={disabled}
          itemCount={cartItems}
          subTotal={userInstorage() ? totalOrderAmount : totalAmount}
          monthlyPayment={totalMonthlyPayment}
          discount={
            userInstorage()
              ? totalNoDiscount - totalDiscountAmount
              : totalNoDiscount - totalAmount
          }
          total={totalUpfront}
          checkbox={checkbox}
          setCheckbox={setCheckbox}
          userAddress={userAddress}
          locations={locations}
          savingsBalances={savingsBalances}
          collateralPercentage={collateralPercentage}
          lockedAmount={lockedAmount}
          errorMsg={errorMsg}
          cart
        />
      </div>
    </div>
  );
};

export default ShoppingCart;
