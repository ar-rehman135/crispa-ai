export function transformStockData(data: any) {
  const metaData = data["Meta Data"];
  const timeSeries = data["Time Series (Daily)"];

  const transformedData: any = {
    symbol: metaData["2. Symbol"],
    timeZone: metaData["5. Time Zone"],
    data: [],
  };

  const monthlyData: any = {}; // Object to store monthly data

  const currentDate = new Date();
  const sixYearsAgo = new Date(currentDate.getFullYear() - 6, currentDate.getMonth(), currentDate.getDate());

  for (const date in timeSeries) {
    const dataDate = new Date(date);

    if (dataDate < sixYearsAgo) {
      continue; // Skip data points older than six years
    }

    const dailyData = timeSeries[date];
    const yearMonth = dataDate.getFullYear() + '-' + (dataDate.getMonth() + 1); // Generate a key like "YYYY-MM"

    if (!monthlyData[yearMonth]) {
      // Initialize the monthly data if it doesn't exist
      monthlyData[yearMonth] = {
        open: parseFloat(dailyData["1. open"]),
        high: parseFloat(dailyData["2. high"]),
        low: parseFloat(dailyData["3. low"]),
        close: parseFloat(dailyData["4. close"]),
        volume: parseInt(dailyData["5. volume"]),
        start_date: date,
        end_date: date,
      };
    } else {
      // Update the monthly data if it already exists
      monthlyData[yearMonth].high = Math.max(monthlyData[yearMonth].high, parseFloat(dailyData["2. high"]));
      monthlyData[yearMonth].low = Math.min(monthlyData[yearMonth].low, parseFloat(dailyData["3. low"]));
      monthlyData[yearMonth].close = parseFloat(dailyData["4. close"]);
      monthlyData[yearMonth].volume += parseInt(dailyData["5. volume"]);
      monthlyData[yearMonth].end_date = date;
    }
  }

  // Convert monthly data object to an array, and reverse the order
  const months = Object.keys(monthlyData);
  for (let i = months.length - 1; i >= 0; i--) {
    const month = months[i];
    const { close } = monthlyData[month];
    const previousClose = transformedData.data.length > 0 ? transformedData.data[transformedData.data.length - 1].close : null;

    let movement: string;
    if (previousClose === null) {
      movement = "Flat"; // If there is no previous close, consider movement as "Flat"
    } else {
      movement = close > previousClose ? "Up" : close < previousClose ? "Down" : "Flat";
    }

    transformedData.data.push({
      ...monthlyData[month],
      date: month + '-01', // Add the first day of the month to retain complete date
      movement: movement
    });
  }

  return transformedData;
}
