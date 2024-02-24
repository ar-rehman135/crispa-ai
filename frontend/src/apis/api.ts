import axios from "axios";

const API_KEY = "NQFYOQ94IOYKV7IL";

export const fetchStockPrice = async (stockName: string) => {
  const response = await axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockName}&apikey=${API_KEY}&outputsize=full`
  );
  return response.data;
};
