import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  getAllCategories,
  getPopularCategory,
  getSingleCategory
} from "./CategoriesActions";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    data: [],
    popularCategories: [],
    isCreating: false,
    isCreatingSuccess: false,
    isGettingAll: false,
    isGettingAllSuccess: false,
    isGetting: false,
    isGettingSuccess: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createCategory.fulfilled, (state, { payload }) => {
        state.isCreating = false;
        state.isCreatingSuccess = true;
        state.data = payload;
      })
      .addCase(createCategory.rejected, (state, { payload }) => {
        state.isCreating = false;
        state.isCreatingSuccess = false;
        state.errorMessage = payload;
      })
      .addCase(getAllCategories.pending, (state) => {
        state.isGettingAll = true;
      })
      .addCase(getAllCategories.fulfilled, (state, { payload }) => {
        state.isGettingAll = false;
        state.isGettingAllSuccess = true;
        state.data = payload;
      })
      .addCase(getAllCategories.rejected, (state, { payload }) => {
        state.isGettingAll = false;
        state.isGettingAllSuccess = true;
        state.errorMessage = payload;
      })
      .addCase(getSingleCategory.pending, (state) => {
        state.isGetting = true;
      })
      .addCase(getSingleCategory.fulfilled, (state, { payload }) => {
        state.isGetting = false;
        state.isGettingSuccess = true;
        state.data = payload;
      })
      .addCase(getSingleCategory.rejected, (state, { payload }) => {
        state.isGetting = false;
        state.isGettingSuccess = false;
        state.errorMessage = payload;
      })
      .addCase(getPopularCategory.pending, (state) => {
        state.isGetting = true;
      })
      .addCase(getPopularCategory.fulfilled, (state, { payload }) => {
        state.isGetting = false;
        state.isGettingSuccess = true;
        state.popularCategories = payload;
      })
      .addCase(getPopularCategory.rejected, (state, { payload }) => {
        state.isGetting = false;
        state.isGettingSuccess = false;
        state.errorMessage = payload;
      });
  }
});

export const selectCategories = (state) => state.categories;
export default categoriesSlice.reducer;
