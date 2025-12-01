import { createSlice } from "@reduxjs/toolkit";
import {
  checkout,
  createOrder,
  createReview,
  getAllDeliveryLocation,
  getAllOrders,
  getOrders,
  getShippingAddress,
  getSingleOrderDetails,
} from "./myordersActions";

export const myordersSlice = createSlice({
  name: "myorders",
  initialState: {
    data: [],
    locations: [],
    isGetting: false,
    isGettingSuccess: false,
    isCreating: false,
    isCreatingSuccess: false,
    isCreatingOrder: false,
    isCreatingOrderSuccess: false,
    isGettingDelivery: false,
    isGettingDeliverySuccess: false,
    isGettingAddress: false,
    isGettingAddressSuccess: false,
    isCheckingOut: false,
    isCheckingOutSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isGetting = true;
      })
      .addCase(getOrders.fulfilled, (state, { payload }) => {
        state.isGetting = false;
        state.isGettingSuccess = true;
        state.data = payload;
      })
      .addCase(getOrders.rejected, (state, { payload }) => {
        state.isGetting = false;
        state.isGettingSuccess = true;
        state.errorMessage = payload;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.isGetting = true;
      })
      .addCase(getAllOrders.fulfilled, (state, { payload }) => {
        state.isGetting = false;
        state.isGettingSuccess = true;
        state.allOrders = payload;
      })
      .addCase(getAllOrders.rejected, (state, { payload }) => {
        state.isGetting = false;
        state.isGettingSuccess = true;
        state.errorMessage = payload;
      })
      .addCase(getSingleOrderDetails.pending, (state) => {
        state.isGetting = true;
      })
      .addCase(getSingleOrderDetails.fulfilled, (state, { payload }) => {
        state.isGetting = false;
        state.isGettingSuccess = true;
        state.data = payload;
      })
      .addCase(getSingleOrderDetails.rejected, (state, { payload }) => {
        state.isGetting = false;
        state.isGettingSuccess = true;
        state.errorMessage = payload;
      })
      .addCase(createReview.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createReview.fulfilled, (state, { payload }) => {
        state.isCreating = false;
        state.isCreatingSuccess = true;
        state.data = payload;
      })
      .addCase(createReview.rejected, (state, { payload }) => {
        state.isCreating = false;
        state.isCreatingSuccess = true;
        state.errorMessage = payload;
      })
      .addCase(getAllDeliveryLocation.pending, (state) => {
        state.isGettingDelivery = true;
      })
      .addCase(getAllDeliveryLocation.fulfilled, (state, { payload }) => {
        state.isGettingDelivery = false;
        state.isGettingDeliverySuccess = true;
        state.locations = payload?.data;
      })
      .addCase(getAllDeliveryLocation.rejected, (state, { payload }) => {
        state.isGettingDelivery = false;
        state.isGettingDeliverySuccess = false;
        state.errorMessage = payload;
      })
      .addCase(getShippingAddress.pending, (state) => {
        state.isGettingAddress = true;
      })
      .addCase(getShippingAddress.fulfilled, (state, { payload }) => {
        state.isGettingAddress = false;
        state.isGettingAddressSuccess = true;
        state.shippingAddress = payload?.data;
      })
      .addCase(getShippingAddress.rejected, (state, { payload }) => {
        state.isGettingAddress = false;
        state.isGettingAddressSuccess = false;
        state.errorMessage = payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.isCreatingOrder = true;
      })
      .addCase(createOrder.fulfilled, (state, { payload }) => {
        state.isCreatingOrder = false;
        state.isCreatingOrderSuccess = true;
        state.data = payload;
      })
      .addCase(createOrder.rejected, (state, { payload }) => {
        state.isCreatingOrder = false;
        state.isCreatingOrderSuccess = false;
        state.errorMessage = payload;
      })
      .addCase(checkout.pending, (state) => {
        state.isCheckingOut = true;
      })
      .addCase(checkout.fulfilled, (state, { payload }) => {
        state.isCheckingOut = false;
        state.isCheckingOutSuccess = true;
        state.data = payload;
      })
      .addCase(checkout.rejected, (state, { payload }) => {
        state.isCheckingOut = false;
        state.isCheckingOutSuccess = false;
        state.errorMessage = payload;
      });
  },
});

export const selectMyorders = (state) => state.myorders;
export default myordersSlice.reducer;
