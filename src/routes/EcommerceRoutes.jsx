import React from "react";
import { Routes, Route } from "react-router-dom";
import AccountCreated from "../pages/AccountCreated/AccountCreated";
import CategoryView from "../pages/Category/CategoryView";
import Cart from "../pages/Cart/Cart";
import CheckEmail from "../pages/CheckEmail/CheckEmail";
import Checkout from "../pages/Checkout/Checkout";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Login from "../pages/Login/Login";
import ProductDetails from "../pages/ProductPage/ProductDetails";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Signup from "../pages/Signup/Signup";
import SignupDetails from "../pages/Signup/SignupDetails";
import VerifyAccount from "../pages/VerifyAccount/VerifyAccount";
import PasswordVerifyAccount from "../pages/PasswordVerifyAccount/VerifyAccount";
import SearchView from "../pages/Category/SearchView";
// import AccountInformation from "../pages/AccountInformation/AccountInformation";
import Profile from "../pages/AccountInformation/Profile";
import DeliveryAddress from "../pages/AccountInformation/DeliveryAddress";
import PendingRatings from "../pages/AccountInformation/PendingRatings";
import Settings from "../pages/AccountInformation/Settings";
import Messages from "../pages/AccountInformation/Messages";
import Message from "../pages/AccountInformation/Message";
import HomePage from "../pages/HomePage/HomePage";
import Contact from "../pages/Contact/Contact";
import AboutUs from "../pages/AboutUs/AboutUs";
import FAQ from "../pages/Faqs/FAQ";
import WriteReviewPage from "../pages/AccountInformation/OrderHistory/WriteReviewPage";
import SingleOrderHistory from "../pages/AccountInformation/OrderHistory/SingleOrderHistory";
import OrderHistory from "../pages/AccountInformation/OrderHistory/OrderHistory";
import Auth from "../Auth";

const EcommerceRoutes = () => {
  const myAccount = "/store/profile";
  return (
    <Routes>
      <Route path="/store" element={<HomePage />} />
  <Route path="contact-us" element={<Contact />} />
  <Route path="about-us" element={<AboutUs />} />
  <Route path="faqs" element={<FAQ />} />
      <Route path="login" element={<Login />} />
      <Route path="auth" element={<Auth />} />

      <Route path="signup" element={<Signup />} />
      <Route path="account-created" element={<AccountCreated />} />
      <Route path="check-email" element={<CheckEmail />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route
        path="forgot-password-verify-account"
        element={<PasswordVerifyAccount />}
      />
      <Route path="verify-account" element={<VerifyAccount />} />
      <Route path="onboarding" element={<SignupDetails />} />
      <Route path="category/:name/:id" element={<CategoryView />} />
      <Route path="search/:id" element={<SearchView />} />
      <Route path="top-brands/:brandName" element={<SearchView />} />
      <Route path="product/:id" element={<ProductDetails />} />
      <Route path="checkout/:reference" element={<Checkout />} />
      <Route path="cart" element={<Cart />} />
      <Route path="/store/profile" element={<Profile />} />
      <Route path={`${myAccount}/order-history`} element={<OrderHistory />} />
      <Route
        path={`${myAccount}/order-history/:reference/:status`}
        element={<SingleOrderHistory />}
      />
      <Route
        path={`${myAccount}/order-history/:reference/write-a-review`}
        element={<WriteReviewPage />}
      />
      <Route
        path={`${myAccount}/delivery-address`}
        element={<DeliveryAddress />}
      />
      <Route path="/pending-ratings" element={<PendingRatings />} />
      <Route path={`${myAccount}/message-centre`} element={<Messages />} />
      <Route
        path={`${myAccount}/message-centre/message`}
        element={<Message />}
      />
      <Route path={`${myAccount}/settings`} element={<Settings />} />
    </Routes>
  );
};

export default EcommerceRoutes;
