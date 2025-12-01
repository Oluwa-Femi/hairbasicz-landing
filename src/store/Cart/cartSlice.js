import { createSlice } from "@reduxjs/toolkit";
import {
  addProductToCart,
  editCart,
  getCart,
  getSavingsBalances,
  removeProductFromCart
} from "./cartActions";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    editedData: [],
    savings: {},
    isGetting: false,
    isGettingSuccess: false,
    isAdding: false,
    isAddingSuccess: false,
    isRemoving: false,
    isRemovingSuccess: false,
    isEditing: false,
    isEditingSuccess: false,
    isGettingBalances: false,
    isGettingBalancesSuccess: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductToCart.pending, (state) => {
        state.isAdding = true;
      })
      .addCase(addProductToCart.fulfilled, (state, { payload }) => {
        state.isAdding = false;
        state.isAddingSuccess = true;
        state.data = payload;
      })
      .addCase(addProductToCart.rejected, (state, { payload }) => {
        state.isAdding = false;
        state.isAddingSuccess = false;
        state.errorMessage = payload;
      })
      .addCase(getCart.pending, (state) => {
        state.isGetting = true;
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        state.isGetting = false;
        state.isGettingSuccess = true;
        state.data = payload?.data;
      })
      .addCase(getCart.rejected, (state, { payload }) => {
        state.isGetting = false;
        state.isGettingSuccess = false;
        state.errorMessage = payload;
      })
      .addCase(removeProductFromCart.pending, (state) => {
        state.isRemoving = true;
      })
      .addCase(removeProductFromCart.fulfilled, (state, { payload }) => {
        state.isRemoving = false;
        state.isRemovingSuccess = true;
        state.data = payload;
      })
      .addCase(removeProductFromCart.rejected, (state, { payload }) => {
        state.isRemoving = false;
        state.isRemovingSuccess = true;
        state.errorMessage = payload;
      })
      .addCase(editCart.pending, (state) => {
        state.isEditing = true;
      })
      .addCase(editCart.fulfilled, (state, { payload }) => {
        state.isEditing = false;
        state.isEditingSuccess = true;
        state.editedData = payload;
      })
      .addCase(editCart.rejected, (state, { payload }) => {
        state.isEditing = false;
        state.isEditingSuccess = true;
        state.errorMessage = payload;
      })
      .addCase(getSavingsBalances.pending, (state) => {
        state.isGettingBalances = true;
      })
      .addCase(getSavingsBalances.fulfilled, (state, { payload }) => {
        state.isGettingBalances = false;
        state.isGettingBalancesSuccess = true;
        state.savings = payload?.data;
      })
      .addCase(getSavingsBalances.rejected, (state, { payload }) => {
        state.isGettingBalances = false;
        state.isGettingBalancesSuccess = false;
        state.errorMessage = payload;
      });
  }
});

export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
