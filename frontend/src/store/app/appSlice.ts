import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAppState, IStockPrice } from "./types";
import { transformStockData } from "utils";
import { mockData } from "./mockData";

export const initialState: IAppState = {
  stockName: "MSFT",
  stockPriceData: transformStockData(mockData),
  stockLoading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    resetApp: () => {
      return initialState;
    },
    setStockName: (state, action: PayloadAction<string>) => {
      state.stockName = action.payload;
    },
    setStockPriceData: (state, action: PayloadAction<IStockPrice>) => {
      state.stockPriceData = action.payload;
    },
    setStockLoading: (state, action: PayloadAction<boolean>) => {
      state.stockLoading = action.payload;
    },
  },
});

export const { setStockName, setStockPriceData, setStockLoading } =
  appSlice.actions;

export default appSlice.reducer;
