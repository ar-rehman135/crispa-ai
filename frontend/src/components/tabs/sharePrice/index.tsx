import { useAppDispatch, useAppSelector } from "hooks/useReduxTypedHooks";
import { transformStockData } from "utils";
import { toast } from "react-toastify";

import { useStockPrice } from "hooks/useStockPrice";
import { getAppDataSelector, setStockPriceData } from "store/app";

import SharePriceChart from "./chart";
import SharePriceTable from "./table";

export default function SharePrice() {
  const dispatch = useAppDispatch();
  const { stockName } = useAppSelector(getAppDataSelector);

  const onSuccess = (data: any) => {
    if (data["Meta Data"]) {
      // number of months of data to show on graph
      const numberOfMonths = 60;
      const transformedData = transformStockData(data, numberOfMonths);
      dispatch(setStockPriceData(transformedData));
    } else if (data["Error Message"]) {
      toast.error(data["Error Message"]);
    }
  };

  const onError = (error: Error | any) => {
    toast.error(
      error instanceof Error
        ? error.message
        : "Error fetching entry list table data"
    );
  };

  const { isLoading } = useStockPrice({
    stockName,
    onSuccess,
    onError,
    enabledOnMount: true,
  });

  return (
    <>
      <SharePriceChart isLoading={isLoading} />
      <SharePriceTable isLoading={isLoading} />
    </>
  );
}
