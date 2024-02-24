import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { useAppDispatch } from "./useReduxTypedHooks";
import { transformStockData } from "utils";
import { fetchStockPrice } from "apis/api";
import { setStockPriceData } from "store/app";

export const useStockPrice = (stockName: string, numberOfMonths: number = 60) => {
  const dispatch = useAppDispatch();

  const { isLoading, isError, error, refetch } = useQuery(["stockPrice", stockName], () => fetchStockPrice(stockName), {
    enabled: false, // Disable automatic data fetching on mount
    onSuccess: (data) => {
      if (data["Meta Data"]) {
        const transformedData = transformStockData(data, numberOfMonths);
        dispatch(setStockPriceData(transformedData));
      } else if (data["Error Message"]) {
        toast.error(data["Error Message"]);
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Error fetching stock price");
    }
  });

  const fetchStockData = async () => {
    try {
      await refetch();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error fetching stock price");
    }
  };

  return { isLoading, error, fetchStockData };
};
