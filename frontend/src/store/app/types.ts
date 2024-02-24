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
export interface IAppState {
  stockName: string;
  stockPriceData: IStockPrice;
  stockLoading: boolean;
}
