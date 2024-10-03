import { createSlice } from "@reduxjs/toolkit";

export interface IUI {
  collapsed: boolean;
  theme: "dark" | "light";
}

export const initialStateUI: IUI = {
  collapsed: true,
  theme: "light",
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialStateUI,
  reducers: {
    changeCollepsed(state, action) {
      state.collapsed = action.payload;
    },
  },
});

export const UI_ACTIONS = uiSlice.actions;

export default uiSlice;
