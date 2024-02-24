import React, { useState } from "react";
import { ApexOptions } from "apexcharts";
import moment from "moment";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

import { useAppDispatch, useAppSelector } from "hooks/useReduxTypedHooks";
import {
  getAppDataSelector,
  setStockLoading,
  setStockName,
  setStockPriceData,
} from "store/app";
import LineChart from "components/chart";
import { fetchStockPrice } from "apis/api";
import { transformStockData } from "utils";
import { IStockPriceData } from "store/app/types";

import {
  ChartContainer,
  StyledHeading,
  StyledSubHeading,
  TableHeader,
  SearchContainer,
  StartingMonth,
  SearchInput,
  DateInput,
  UpdateButton,
} from "./index.styles";

const generateXAxisCategories = (data: IStockPriceData[]) => {
  return data.map((item) => {
    const formattedDate = moment(item.date).format("MMM").charAt(0);
    return formattedDate;
  });
};

const SharePriceChart = () => {
  const [timeRange, setTimeRange] = React.useState<string>("60months");
  const dispatch = useAppDispatch();
  const { stockName, stockPriceData, stockLoading } =
    useAppSelector(getAppDataSelector);
  const [stock, setStock] = useState<string>(stockName);

  const handleStockNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStock(e.target.value);
  };

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeRange(e.target.value);
  };

  const handleUpdateButtonClick = async () => {
    dispatch(setStockLoading(true));
    try {
      const range = "60months"; // need to make dynamic
      const data = await fetchStockPrice(stockName, range);
      if (data && data["Information"]) {
        toast.warn(data["Information"]);
      }
      const transformedData = transformStockData(data);
      dispatch(setStockName(stockName));
      dispatch(setStockPriceData(transformedData));
      dispatch(setStockLoading(false));
    } catch (error) {
      dispatch(setStockLoading(false));
    }
  };

  const options: ApexOptions = {
    chart: {
      type: "line",
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 5,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.1,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      offsetX: -15,
      fontWeight: "bold",
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    grid: {
      borderColor: "#f2f6f7",
    },
    colors: ["#5343BF"],

    yaxis: {
      labels: {
        formatter: function (y: number) {
          return y.toFixed(0) + "";
        },
      },
    },
    xaxis: {
      type: "category",
      categories: generateXAxisCategories(stockPriceData.data),
      axisBorder: {
        show: true,
        color: "rgba(119, 119, 142, 0.05)",
        offsetX: 0,
        offsetY: 0,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "rgba(119, 119, 142, 0.05)",
        offsetX: 0,
        offsetY: 0,
      },
      labels: {
        rotate: -90,
      },
    },
    tooltip: {
      enabled: true,
      // Define a function to render custom tooltip
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const obj = stockPriceData.data[dataPointIndex];
        let high = "";
        let low = "";
        let openingPrice = "";
        let date = "";
        if (obj) {
          high = obj["high"].toString();
          low = obj["low"].toString();
          openingPrice = obj["open"].toString();
          date = moment(obj["date"]).format("MMMM, YYYY");
        }
        return (
          '<div class="custom-tooltip">' +
          "<div>" +
          date +
          "</div>" +
          "<div class='flex' style='margin-top: 0.5rem'>" +
          "<div class='flex'>" +
          "<div class='blue-dot'>" +
          "</div>" +
          "Opening Price " +
          "</div>" +
          openingPrice +
          "</div>" +
          "<div class='flex'>" +
          "<div class='flex'>" +
          "<div class='dark-blue-dot'>" +
          "</div>" +
          "High " +
          "</div>" +
          high +
          "</div>" +
          "<div class='flex'>" +
          "<div class='flex'>" +
          "<div class='pink-dot'>" +
          "</div>" +
          "Low " +
          "</div>" +
          low +
          "</div>" +
          "</div>"
        );
      },
    },
  };

  const closingPrices = stockPriceData.data.map((item) => item.close);

  // Create series for the chart
  const series = [
    {
      name: "Closing Price",
      data: closingPrices,
    },
  ];

  return (
    <ChartContainer>
      <TableHeader>
        <div>
          <StyledHeading>Share Price</StyledHeading>
          <StyledSubHeading>USD</StyledSubHeading>
        </div>
        <SearchContainer>
          <StartingMonth>Starting Month</StartingMonth>
          <DateInput
            type="date"
            onChange={handleTimeRangeChange}
            value={timeRange}
          />
          <SearchInput
            placeholder="Enter a stock symbol"
            name="stockName"
            onChange={handleStockNameChange}
            value={stock}
          />
          <UpdateButton
            variant="contained"
            color="primary"
            onClick={handleUpdateButtonClick}
            disabled={stockLoading}
          >
            {stockLoading ? <CircularProgress size={20} /> : "Update"}
          </UpdateButton>
        </SearchContainer>
      </TableHeader>
      <div id="statistics2">
        <LineChart series={series} options={options} />
      </div>
    </ChartContainer>
  );
};

export default SharePriceChart;
