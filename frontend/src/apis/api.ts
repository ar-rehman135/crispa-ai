import axios from "axios";

export const fetchFunction = async () => {
  const { data } = await axios.get(
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&range=60month&apikey=NQFYOQ94IOYKV7IL"
  );
  return data;
};
