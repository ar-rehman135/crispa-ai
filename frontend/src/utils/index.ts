export function transformStockData(data: any) {
  const metaData = data["Meta Data"];
  const timeSeries = data["Time Series (Daily)"];

  const transformedData: any = {
    symbol: metaData["2. Symbol"],
    timeZone: metaData["5. Time Zone"],
    data: [],
  };

  let previousPrice: number | null = null;

  for (const date in timeSeries) {
    const dailyData = timeSeries[date];
    const formattedDate = new Date(date).toISOString().split("T")[0];
    const price = parseFloat(dailyData["4. close"]);

    if (previousPrice === null) {
      previousPrice = price;
    }

    const newDataPoint = {
      date: formattedDate,
      open: parseFloat(dailyData["1. open"]),
      high: parseFloat(dailyData["2. high"]),
      low: parseFloat(dailyData["3. low"]),
      close: price,
      volume: parseInt(dailyData["5. volume"]),
      difference: price - previousPrice,
      movement:
        price > previousPrice ? "Up" : price < previousPrice ? "Down" : "Flat",
    };

    previousPrice = price;
    transformedData.data.push(newDataPoint);
  }

  return transformedData;
}
