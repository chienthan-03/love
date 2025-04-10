import { configureStore } from "@reduxjs/toolkit";
import formsSlice from "./slice/forms";
import settingsSlice from "./slice/settings";

const rootReducer = {
  settings: settingsSlice.reducer,
  forms: formsSlice.reducer,
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

// --- Define types
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
