import axios from "axios";

const API_KEY = "NQFYOQ94IOYKV7IL";
const ENTRY_LIST_END_POINT = "all_data/";
const BASE_URL = "http://localhost:8000/api/";

export const fetchStockPrice = async (stockName: string) => {
  const response = await axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockName}&apikey=${API_KEY}&outputsize=full`
  );
  return response.data;
};

export const fetchEntryListTableData = async () => {
  const response = await axios.get(`${BASE_URL}${ENTRY_LIST_END_POINT}`);
  return response.data;
};
