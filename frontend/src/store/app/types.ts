export interface IStockPriceData {
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  date: string;
  movement: string;
}
export interface IStockPrice {
  data: IStockPriceData[];
  symbol: string;
  timeZone: string;
}

export interface IEntryListData {
  id: string;
  description: string;
  date: string;
  account: string;
  amount: number;
  type: string;
  currency: string;
  convertedCurrency: string;
  defaultType: string;
  status: string;
  reconciled: boolean;
}

export interface IAppState {
  stockName: string;
  stockPriceData: IStockPrice;
  entryListData:IEntryListData[],
  stockLoading: boolean;
  monthRange: number;
}
