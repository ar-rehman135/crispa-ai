import { ApexOptions } from "apexcharts";
import moment from "moment";
import { useAppSelector } from "hooks/useReduxTypedHooks";
import { getAppDataSelector } from "store/app";
import LineChart from "components/chart";
import { IStockPriceData } from "store/app/types";

import PriceForm from "./form";
import { ChartContainer } from "./index.styles";

import { COLORS } from "colors";

const generateXAxisCategories = (data: IStockPriceData[]) => {
  return data.map((item) => {
    const formattedDate = moment(item.date).format("MMM").charAt(0);
    return formattedDate;
  });
};

interface IPriceChart {
  isLoading: boolean;
}

const PriceChart = (_props: IPriceChart) => {
  const { stockPriceData } = useAppSelector(getAppDataSelector);

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
        color: COLORS.common?.black,
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
      borderColor: COLORS.grey?.[400],
    },
    colors: [COLORS.primary?.[100]],

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
        color: COLORS.primary?.[100],
        offsetX: 0,
        offsetY: 0,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: COLORS.primary?.[100],
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
      <PriceForm />
      <div id="statistics2">
        <LineChart series={series} options={options} />
      </div>
    </ChartContainer>
  );
};

export default PriceChart;
