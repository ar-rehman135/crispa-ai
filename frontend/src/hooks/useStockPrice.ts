// api.ts

import { useEffect, useState } from "react";

import { transformStockData } from "utils";
import { fetchStockPrice } from "apis/api";
import { setStockLoading, setStockName, setStockPriceData } from "store/app";
import { useAppDispatch } from "./useReduxTypedHooks";
import { toast } from "react-toastify";

export const useStockPrice = (stockName: string, range: string = "60month") => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getStockPrice = async () => {
      dispatch(setStockLoading(true));
      try {
        const data = await fetchStockPrice(stockName, range);
        if (data && data["Information"]) {
          toast.warn(data["Information"]);
        }
        const transformedData = transformStockData(data);
        dispatch(setStockName(stockName));
        dispatch(setStockPriceData(transformedData));
        dispatch(setStockLoading(false));
      } catch (error) {
        setError("Error fetching stock price");
        dispatch(setStockLoading(false));
      }
    };

    if (stockName) {
      getStockPrice();
    }
  }, [stockName, dispatch, range]);

  return { error };
};
