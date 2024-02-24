import { useAppSelector } from "hooks/useReduxTypedHooks";
import { getAppDataSelector } from "store/app";
import { useStockPrice } from "hooks/useStockPrice";

import SharePriceChart from "./chart";
import SharePriceTable from "./table";

export default function SharePrice() {
  const { stockName } = useAppSelector(getAppDataSelector);
  // const { error } = useStockPrice(stockName);

  return (
    <>
      <SharePriceChart />
      <SharePriceTable />
    </>
  );
}
