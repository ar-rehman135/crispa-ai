import { ALPHA_VANTAGE_API_KEY, API_BASE_URL } from "./constants";
import { getErrorMessage, getRequest } from "./requests";

export const fetchStockPrice = async (stockName: string) => {
  try {
    const response = await getRequest(`https://www.alphavantage.co/query`, {
      function: "TIME_SERIES_DAILY",
      symbol: stockName,
      apikey: ALPHA_VANTAGE_API_KEY,
      outputsize: "full",
    });
    return response.data;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};

export const fetchEntryLists = async () => {
  try {
    const url = `${API_BASE_URL}all_data/`;
    const response = await getRequest(url);
    return response.data;
  } catch (err: any) {
    throw new Error(getErrorMessage(err));
  }
};
