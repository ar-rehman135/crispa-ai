import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAppState, IEntryListData, IStockPrice} from "./types";
import { transformStockData } from "utils";
import { mockData, mockDataEntryList } from "./mockData";

export const initialState: IAppState = {
  stockName: "MSFT",
  stockPriceData: transformStockData(mockData),
  entryListData: mockDataEntryList,
  stockLoading: false,
  monthRange: 60
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
    setEntryListData: (state, action: PayloadAction<IEntryListData[]>) => {
      state.entryListData = action.payload;
    },
    setStockLoading: (state, action: PayloadAction<boolean>) => {
      state.stockLoading = action.payload;
    },
    setMonthRange: (state, action: PayloadAction<number>) => {
      state.monthRange = action.payload;
    },
  },
});

export const { setStockName, setStockPriceData, setStockLoading, setMonthRange,setEntryListData } =
  appSlice.actions;

export default appSlice.reducer;
