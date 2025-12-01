import { createSlice } from "@reduxjs/toolkit";
import {
  getAllProducts,
  getSingleVariant,
  getTopSellingItems,
} from "./ProductsActions";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    singleVaraint: {},
    topSellingItems: null,
    isCreating: false,
    isCreatingSuccess: false,
    isGettingAll: false,
    isGettingAllSuccess: false,
    isGetting: false,
    isGettingSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isGettingAll = true;
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.isGettingAll = false;
        state.isGettingAllSuccess = true;
        state.data = payload;
      })
      .addCase(getAllProducts.rejected, (state, { payload }) => {
        state.isGettingAll = false;
        state.isGettingAllSuccess = false;
        state.errorMessage = payload;
      })
      .addCase(getSingleVariant.pending, (state) => {
        state.isGetting = true;
      })
      .addCase(getSingleVariant.fulfilled, (state, { payload }) => {
        state.isGetting = false;
        state.isGettingSuccess = true;
        state.singleVaraint = payload;
      })
      .addCase(getSingleVariant.rejected, (state, { payload }) => {
        state.isGetting = false;
        state.isGettingSuccess = false;
        state.errorMessage = payload;
      })
      .addCase(getTopSellingItems.pending, (state) => {
        state.isGettingAll = true;
      })
      .addCase(getTopSellingItems.fulfilled, (state, { payload }) => {
        state.isGettingAll = false;
        state.isGettingAllSuccess = true;
        state.topSellingItems = payload;
      })
      .addCase(getTopSellingItems.rejected, (state, { payload }) => {
        state.isGettingAll = false
        state.isGettingAllSuccess = false
        state.errorMessage = payload
      });
  },
});

export const selectProducts = (state) => state.products;

export default productsSlice.reducer;
