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

export interface IReportDataPoint {
  id: string;
  accounting_date: string;
  scenario?: string; // Optional for actual data
  account: string;
  state: string;
  description: string;
  reconciled: boolean;
  currency: string;
  amount: number;
  account_type: string;
}

export interface IReportData {
  actual: IReportDataPoint[];
  forecast_scenario_a: IReportDataPoint[];
  forecast_scenario_b: IReportDataPoint[];
}


export interface IAppState {
  stockName: string;
  stockPriceData: IStockPrice;
  entryListData: IEntryListData[];
  stockLoading: boolean;
  monthRange: number;
  reportData: IReportData;
}
