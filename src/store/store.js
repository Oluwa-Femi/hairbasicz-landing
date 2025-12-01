import { configureStore } from "@reduxjs/toolkit";
import brandsSlice from "./Brands/brandsSlice";
import categoriesSlice from "./Categories/categoriesSlice";
import passwordSlice from "./Password/passwordSlice";
import productsSlice from "./Products/productsSlice";
import authSlice from "./User/authSlice";
import cartSlice from "./Cart/cartSlice";
import promotionsSlice from "./Promotions/promotionsSlice";
import profileSlice from "./Profile/profileSlice";
import myordersSlice from "./MyOrders/myordersSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    password: passwordSlice,
    categories: categoriesSlice,
    brands: brandsSlice,
    products: productsSlice,
    cart: cartSlice,
    promotions: promotionsSlice,
    profile: profileSlice,
    myorders: myordersSlice,
  },
});
