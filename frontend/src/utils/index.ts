import { COLORS } from "colors";
import moment from "moment";

export function transformStockData(data: any, months: number = 60) {
  const metaData = data["Meta Data"];
  const timeSeries = data["Time Series (Daily)"];

  const transformedData: any = {
    symbol: metaData["2. Symbol"],
    timeZone: metaData["5. Time Zone"],
    data: [],
  };

  const monthlyData: any = {}; // Object to store monthly data

  const currentDate = new Date();
  const cutoffDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - months,
    1
  );

  for (const date in timeSeries) {
    const dataDate = new Date(date);

    if (dataDate < cutoffDate) {
      continue; // Skip data points older than the cutoff date
    }

    const dailyData = timeSeries[date];
    const yearMonth = dataDate.getFullYear() + "-" + (dataDate.getMonth() + 1); // Generate a key like "YYYY-MM"

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
      monthlyData[yearMonth].high = Math.max(
        monthlyData[yearMonth].high,
        parseFloat(dailyData["2. high"])
      );
      monthlyData[yearMonth].low = Math.min(
        monthlyData[yearMonth].low,
        parseFloat(dailyData["3. low"])
      );
      monthlyData[yearMonth].close = parseFloat(dailyData["4. close"]);
      monthlyData[yearMonth].volume += parseInt(dailyData["5. volume"]);
      monthlyData[yearMonth].end_date = date;
    }
  }

  // Convert monthly data object to an array, and reverse the order
  const monthsArray = Object.keys(monthlyData);
  const lastMonths = monthsArray.slice(-months); // Get the latest 'months' entries
  for (let i = lastMonths.length - 1; i >= 0; i--) {
    const month = lastMonths[i];
    const { close } = monthlyData[month];
    const previousClose =
      transformedData.data.length > 0
        ? transformedData.data[transformedData.data.length - 1].close
        : null;

    let movement: string;
    if (previousClose === null) {
      movement = "Flat"; // If there is no previous close, consider movement as "Flat"
    } else {
      movement =
        close > previousClose ? "Up" : close < previousClose ? "Down" : "Flat";
    }

    transformedData.data.push({
      ...monthlyData[month],
      date: month + "-01", // Add the first day of the month to retain complete date
      movement: movement,
    });
  }

  return transformedData;
}

export const calculateMonthsDifference = (date: string) => {
  const currentDate = moment(); // Current date
  const givenDate = moment(date); // Given date

  return currentDate.diff(givenDate, "months"); // Calculate the difference in months
};

export const calculateMonthsBack = (months: number) => {
  return moment().subtract(months, "months").format("YYYY-MM-DD");
};

// Object containing colors for different chip values
const chipColors = {
  BOOKED: {
    backgroundColor: COLORS.primary?.[200],
    textColor: COLORS.primary?.[600],
  },
  DRAFT: {
    backgroundColor: COLORS.secondary?.[600],
    textColor: COLORS.secondary?.[200],
  },
  OVERDUE: {
    backgroundColor: COLORS.success?.[400],
    textColor: COLORS.warning?.[100],
  },
  VOIDED: {
    backgroundColor: COLORS.success?.[300],
    textColor: COLORS.success?.[200],
  },
  UP: {
    backgroundColor: COLORS.primary?.[200],
    textColor: COLORS.primary?.[600],
  },
  FLAT: {
    backgroundColor: COLORS.secondary?.[600],
    textColor: COLORS.secondary?.[200],
  },
  DOWN: {
    backgroundColor: COLORS.success?.[400],
    textColor: COLORS.warning?.[100],
  },
  DEFAULT: {
    backgroundColor: COLORS.common?.white,
    textColor: COLORS.common?.black,
  },
};

// Function to get chip colors based on the chip value
export const getChipColors = (value: string) =>
  chipColors[value] || chipColors.DEFAULT;

// Function to capitalize the first letter
export const capitalizeFirstLetter = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);
