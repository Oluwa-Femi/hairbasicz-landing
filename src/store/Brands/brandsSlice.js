import { createSlice } from "@reduxjs/toolkit";
import { getAllBrands, getPopularBrands } from "./brandsActions";

export const brandsSlice = createSlice({
  name: "brands",
  initialState: {
    data: [],
    popularBrands: [],
    isGettingAll: false,
    isGettingAllSuccess: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.isGettingAll = true;
      })
      .addCase(getAllBrands.fulfilled, (state, { payload }) => {
        state.isGettingAll = false;
        state.isGettingAllSuccess = true;
        state.data = payload;
      })
      .addCase(getAllBrands.rejected, (state, { payload }) => {
        state.isGettingAll = false;
        state.isGettingAllSuccess = true;
        state.errorMessage = payload;
      })
      .addCase(getPopularBrands.pending, (state) => {
        state.isGettingAll = true;
      })
      .addCase(getPopularBrands.fulfilled, (state, { payload }) => {
        state.isGettingAll = false;
        state.isGettingAllSuccess = true;
        state.popularBrands = payload;
      })
      .addCase(getPopularBrands.rejected, (state, { payload }) => {
        state.isGettingAll = false;
        state.isGettingAllSuccess = true;
        state.errorMessage = payload;
      });
  }
});

export const selectBrands = (state) => state.brands;
export default brandsSlice.reducer;
