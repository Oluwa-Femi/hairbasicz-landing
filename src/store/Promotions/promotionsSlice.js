import { createSlice } from "@reduxjs/toolkit";
import { getBanners, getProductsWithDiscount } from "./promotionsActions";

export const promotionsSlice = createSlice({
  name: "promotions",
  initialState: {
    data: null,
    discountedProducts: null,
    isGetting: false,
    isGettingSuccess: false,
    isGettingAll: false,
    isGettingAllSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBanners.pending, (state) => {
        state.isGetting = true;
      })
      .addCase(getBanners.fulfilled, (state, { payload }) => {
        state.isGetting = false;
        state.isGettingSuccess = true;
        state.data = payload;
      })
      .addCase(getBanners.rejected, (state, { payload }) => {
        state.isGetting = false;
        state.isGettingSuccess = false;
        state.errorMessage = payload;
      })
      .addCase(getProductsWithDiscount.pending, (state) => {
        state.isGettingAll = true;
      })
      .addCase(getProductsWithDiscount.fulfilled, (state, { payload }) => {
        state.isGettingAll = false;
        state.isGettingAllSuccess = true;
        state.discountedProducts = payload;
      })
      .addCase(getProductsWithDiscount.rejected, (state, { payload }) => {
        state.isGettingAll = false;
        state.isGettingAllSuccess = false;
        state.errorMessage = payload;
      });
  },
});

export const selectPromotions = (state) => state.promotions;

export default promotionsSlice.reducer;
