import SharePriceChart from "./chart";
import SharePriceTable from "./table";

export default function SharePrice() {
  // const { error } = useStockPrice(stockName);

  return (
    <>
      <SharePriceChart />
      <SharePriceTable />
    </>
  );
}
