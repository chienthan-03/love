import { useStore } from "react-redux";
import type { Store } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export const useAppStore = (): Store<RootState> => {
  return useStore<RootState>();
};
