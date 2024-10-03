import { configureStore, Dispatch } from "@reduxjs/toolkit"
import authSlice from "./auth";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import uiSlice from "./ui";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck:false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

export const useAppDispatch = () => useDispatch<Dispatch<any>>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;