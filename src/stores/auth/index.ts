import { createSlice } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import { AuthThunk } from "../services/auth";

export interface IAuth {
  isLoading: boolean;
  status: "pending" | "success" | "error";
  isAuthenticated: boolean;
  user: any;
}

export const initialStateAuth: IAuth = {
  isLoading: false,
  status: "success",
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialStateAuth,
  reducers: {
    signOut(state) {
      state.isAuthenticated = false;
      state.status = "success";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AuthThunk.pending, (state) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(AuthThunk?.fulfilled.type, (state, action: any) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.status = "success";
      state.user = action.payload?.user;
    });
    builder.addCase(AuthThunk?.rejected.type, (state) => {
      redirect("/signin");
      // localStorage.removeItem("access_token");
      state = {
        ...state,
        isLoading: false,
        status: "error",
      };
    });
  },
});

export const AUTH_ACTIONS = authSlice.actions;

export default authSlice;
