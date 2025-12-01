import { createSlice } from "@reduxjs/toolkit";
import { getNotifications, getUserProfile } from "./profileActions";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: [],
    isGettingAll: false,
    isGettingAllSuccess: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.isGettingAll = true;
      })
      .addCase(getNotifications.fulfilled, (state, { payload }) => {
        state.isGettingAll = false;
        state.isGettingAllSuccess = true;
        state.data = payload;
      })
      .addCase(getNotifications.rejected, (state, { payload }) => {
        state.isGettingAll = false;
        state.isGettingAllSuccess = true;
        state.errorMessage = payload;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isGettingAll = true;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.isGettingAll = false;
        state.isGettingAllSuccess = true;
        state.data = payload;
      })
      .addCase(getUserProfile.rejected, (state, { payload }) => {
        state.isGettingAll = false;
        state.isGettingAllSuccess = true;
        state.errorMessage = payload;
      });
  },
});

export const selectProfile = (state) => state.profile;
export default profileSlice.reducer;
