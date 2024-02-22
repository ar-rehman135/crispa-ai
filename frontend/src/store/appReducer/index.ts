import {createSlice, PayloadAction} from '@reduxjs/toolkit';


export interface IApp {
  stockName: string;
  timeRange: string;
}

const initialState: IApp = {
  stockName: 'MSFT',
  timeRange: ''
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setStockName: (state, action: PayloadAction<string>) => {
      state.stockName = action.payload;
    },
    setTimeRange: (state, action: PayloadAction<string>) => {
      state.timeRange = action.payload;
    },
  },
});

export const {setStockName, setTimeRange} = appSlice.actions;

export default appSlice.reducer;
