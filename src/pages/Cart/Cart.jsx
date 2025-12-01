/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ProductsYouMayLike from "../../components/Product/ProductsYouMayLike";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import Footer from "../../components/Footer/Footer";
import ArrowRight from "../../assets/arrowright.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  // getCart,
  getSavingsBalances,
  userInstorage,
} from "../../store/Cart/cartActions";
import { selectCart } from "../../store/Cart/cartSlice";
import DeliveryLocations from "../../components/ShoppingCart/DeliveryLocations";
import {
  assignCartsData,
  assignLocalCartData,
  assignLocationsOptions,
} from "../../utils/functions/CreateNewArray";
import {
  createOrder,
  getAllDeliveryLocation,
  getShippingAddress,
} from "../../store/MyOrders/myordersActions";
import { selectMyorders } from "../../store/MyOrders/myordersSlice";
import RequestSuccessModal from "../../components/ShoppingCart/RequestSuccessModal";
import Storage from "../../utils/services/storage";
import responseHandler from "../../utils/notifications/responseHandler";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { getBanners } from "../../store/Promotions/promotionsActions";
import { selectPromotions } from "../../store/Promotions/promotionsSlice";
import imageLoader from "../../assets/loader.png";

const Cart = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const localStorageCart = JSON.parse(Storage.get("localCart"));
  const deliveryLocations = useSelector(selectMyorders);
  const dropdownList = assignLocationsOptions(
    deliveryLocations?.locations?.delivery_location
  );
  const shippingAdresses = deliveryLocations?.shippingAddress;
  const address1 =
    shippingAdresses?.address1 &&
    `${shippingAdresses?.address1?.street_address}, ${shippingAdresses?.address1?.city}, ${shippingAdresses?.address1?.local_government}, ${shippingAdresses?.address1?.state}.`;
  const address2 =
    shippingAdresses?.address2 &&
    `${shippingAdresses?.address2?.street_address}, ${shippingAdresses?.address2?.city}, ${shippingAdresses?.address2?.local_government}, ${shippingAdresses?.address2?.state}.`;

  const [locations, setLocations] = useState("Select");
  const [userAddress, setUserAddress] = useState(null);
  const [checkbox, setCheckbox] = useState(false);
  const [selectedCheckList, setSelectedCheckList] = useState([]);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userInstorage() && localStorageCart) {
      const cartItems = assignLocalCartData(
        localStorageCart?.carts?.data?.cart
      );
      const payload = {
        cartItems: cartItems,
      };
      dispatch(addProductToCart(payload)).then(function () {
        Storage.remove("localCart");
        // dispatch(getCart());
      });
    }
  }, []);

  useEffect(() => {
    // dispatch(getCart());
    dispatch(
      getAllDeliveryLocation({
        limit: Number.MAX_SAFE_INTEGER,
        page: 1,
      })
    );
    userInstorage() && dispatch(getShippingAddress());
    userInstorage() && dispatch(getSavingsBalances());
    dispatch(getBanners());
    if (
      shippingAdresses?.address1?.is_primary_address === "true" ||
      shippingAdresses?.address1?.is_primary_address
    ) {
      setUserAddress(address1);
    } else {
      setUserAddress(address2);
    }
  }, []);

  const carts = useSelector(selectCart);
  const banners = useSelector(selectPromotions);

  const productsYouMayAlsoLike = carts?.data?.productsYouMayAlsoLike;
  const footerBanner = banners?.data?.data?.footer_banner;
  const savingsBalances = carts?.savings?.savingsBalance;
  const collateralPercentage = carts?.data?.cart?.[0]?.collateral_percentage;

  const handleGoToStore = () => {
    window.open("https://paystack.shop/hairbasicz-nigeria", "_blank", "noopener,noreferrer");
  };

  const handleRequestOrder = () => {
    if (userInstorage()) {
      if (
        shippingAdresses?.address1 === null &&
        shippingAdresses?.address2 === null
      ) {
        responseHandler({
          message: "Please add a delivery address",
          status: "error",
        });
        navigate("/store/profile/delivery-address");
      } else {
        // eslint-disable-next-line no-unused-vars
        const { is_primary_address = false, ...addressRest } =
          userAddress === address1
            ? shippingAdresses?.address1
            : shippingAdresses?.address2;

        const payload1 = {
          orderItems:
            selectedCheckList?.length > 0
              ? assignCartsData(selectedCheckList)
              : assignCartsData(carts?.data?.cart),
          delivery_location: locations,
          collateral_amount: Number(lockedAmount),
          collateral_account_type: "regular-savings",
          delivery_address: addressRest,
        };

        const payload2 = {
          orderItems:
            selectedCheckList?.length > 0
              ? assignCartsData(selectedCheckList)
              : assignCartsData(carts?.data?.cart),
          delivery_location: locations,
          delivery_address: addressRest,
        };

        const payload = checkbox ? payload1 : payload2;

        const payloadValues = {
          setOpenSuccessModal,
          payload,
          navigate,
        };
        dispatch(createOrder(payloadValues));
      }
    } else {
      responseHandler({
        message: "Please login or signup to proceed with your request",
        status: "error",
      });
      navigate("/login");
      Storage.set("pageBeforeLogin", JSON.stringify(location.pathname));
    }
  };

  const orderRef = JSON.parse(Storage.get("orderRef"));

  const ItemDetails = carts?.data?.cart ?? [];

  const selectedProducts =
    selectedCheckList?.length > 0 ? selectedCheckList : ItemDetails;

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
      (object?.variant_upfront_amount * object?.quantity ||
        object?.upfront_amount * object?.cart_quantity)
    );
  }, 0);

  const subTotal = userInstorage() ? totalOrderAmount : totalAmount;

  const cartItems = carts?.data?.cart?.length;

  const lockedAmount = (collateralPercentage / 100) * subTotal;
  const errorMsg = savingsBalances?.regular_savings_balance < lockedAmount;
  const disabled = userInstorage()
    ? deliveryLocations?.isCreatingOrder ||
      (checkbox && errorMsg) ||
      locations === "Select" ||
      cartItems < 1
    : deliveryLocations?.isCreatingOrder || (checkbox && errorMsg);

  const totalMonthlyPayment = selectedProducts.reduce((accumulator, object) => {
    return (
      accumulator +
      (object?.discount_amount !== null
        ? (userInstorage() &&
            (object?.discount_amount * object?.quantity -
              0.25 * (object?.discount_amount * object?.quantity)) /
              5) ||
          (object?.discount_amount * object?.cart_quantity -
            0.25 * (object?.discount_amount * object?.cart_quantity)) /
            5 ||
          (object?.variant_amount * object?.quantity -
            0.25 * (object?.variant_amount * object?.quantity)) /
            5
        : (object?.variant_amount * object?.quantity -
            0.25 * (object?.variant_amount * object?.quantity)) /
            5 ||
          (object?.amount * object?.cart_quantity -
            0.25 * (object?.amount * object?.cart_quantity)) /
            5)
    );
  }, 0);

  const handleLoading = () => {
    setIsLoading(false);
  };

  return (
    <div className="w-screen bg-[#F7F7F8]">
      <Header
        showSearchInput
        showBtnAndCart
        // showAllCategories
        showLogInButton
        top
      />
      <div className="px-[128px] py-[16px] bg-white hidden xl:block 2xl:block">
        <div className="flex items-center gap-2">
          <p
            className="text-[14px] text-[#9DA1A8] cursor-pointer"
            onClick={handleGoToStore}
          >
            Store
          </p>
          <img alt="icon" src={ArrowRight}></img>
          {location.pathname === "/cart" && (
            <p className="text-[14px] font-[Gilroy-Bold]">Shopping Cart</p>
          )}
        </div>
        {location.pathname === "/cart" && (
          <div className="mt-[32px] flex items-center justify-between">
            <p className="text-[24px] font-[Gilroy-Bold]">Shopping Cart</p>
          </div>
        )}
      </div>
      <RequestSuccessModal
        isOpen={openSuccessModal}
        onClick={() => {
          navigate(`/store/profile/order-history/${orderRef}/ongoing`);
        }}
      />
      <ShoppingCart
        carts={carts}
        handleRequestOrder={handleRequestOrder}
        checkbox={checkbox}
        setCheckbox={setCheckbox}
        setSelectedCheckList={setSelectedCheckList}
        selectedCheckList={selectedCheckList}
        deliveryLocations={deliveryLocations}
        disabled={disabled}
        userAddress={userAddress}
        locations={locations}
        totalMonthlyPayment={totalMonthlyPayment}
        savingsBalances={savingsBalances}
        collateralPercentage={collateralPercentage}
        lockedAmount={lockedAmount}
        errorMsg={errorMsg}
      />
      <DeliveryLocations
        locations={locations}
        setLocations={setLocations}
        dropdownList={dropdownList}
        shippingAdresses={shippingAdresses}
        userAddress={userAddress}
        setUserAddress={setUserAddress}
        address1={address1}
        address2={address2}
      />
      <div className="md:px-[128px] lg:px-[128px] xl:px-[128px] 2xl:px-[128px] xsm:hidden lg:block xl:block">
        {productsYouMayAlsoLike?.length > 0 && (
          <ProductsYouMayLike productYouMayLike={productsYouMayAlsoLike} />
        )}
        <div className="mt-[32px] pb-[58px] xsm:hidden md:hidden xl:block">
          {footerBanner !== null && (
            <div className="w-full">
              <div className="w-full">
                <img
                  src={isLoading ? imageLoader : footerBanner}
                  alt="banner"
                  className="w-[100%] rounded-lg"
                  onLoad={() => handleLoading()}
                />
              </div>
            </div>
          )}{" "}
        </div>
      </div>
      <div className="xsm:block sm:block md:block lg:hidden xl:hidden 2xl:hidden md:px-[128px] md:mt-6">
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
      <Footer />
    </div>
  );
};

export default Cart;
