import { useQuery } from "react-query";
import { toast } from "react-toastify";

import { fetchStockPrice } from "services/api";

interface useStockPriceOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  enabledOnMount?: boolean;
  stockName: string;
}

export const useStockPrice = (options: useStockPriceOptions) => {
  const { stockName, onError, onSuccess, enabledOnMount = false } = options;

  const { isLoading, error, refetch } = useQuery(
    ["stockPrice", stockName],
    () => fetchStockPrice(stockName),
    {
      enabled: enabledOnMount,
      onSuccess: (data) => {
        if (onSuccess) onSuccess(data);
      },
      onError: (error) => {
        if (onError) onError(error);
      },
    }
  );

  const fetchStockData = async () => {
    try {
      await refetch();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Error fetching stock price"
      );
    }
  };

  return { isLoading, error, fetchStockData };
};
