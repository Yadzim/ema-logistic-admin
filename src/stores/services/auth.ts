import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";
import instance from "../../config/axios.config";
import { redirect } from "react-router-dom";

export const AuthThunk: any = createAsyncThunk(
  "signIn",
  async (
    params: { username?: string; password?: string },
    { rejectWithValue }
  ) => {
    try {
      const isHasToken = localStorage.getItem("access_token");

      const options: AxiosRequestConfig = isHasToken
        ? { url: `/services?page=1&limit=1`, method: "GET" }
        : { url: `/login`, method: "POST", data: params };

      const response = await instance(options);

      if (response?.status === 401) return redirect("/signin");

      if (!(response?.status === 201 || response?.status === 200))
        return rejectWithValue(new Error("Authorization error!"));

      if (!isHasToken) {
        localStorage.setItem("access_token", response?.data?.token);
      }

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response);
    }
  }
);
