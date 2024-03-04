import React from "react";
import { ApexOptions } from "apexcharts";
import moment from "moment";

import DynamicChart from "components/chart";
import Legend from "./legend";
import {
  ChartContainer,
  StyledHeading,
  StyledSubHeading,
} from "./index.styles";
import { COLORS } from "colors";
import { useAppSelector } from "hooks/useReduxTypedHooks";
import { getAppDataSelector } from "store/app";
import { IReportDataPoint } from "store/app/types";

const generateXAxisCategories = (data: IReportDataPoint[]) => {
  return data.map((item) => {
    const formattedDate = moment(item.accounting_date).format("MMM").charAt(0);
    return formattedDate;
  });
};

interface IReportGraph {
  isLoading: boolean;
}

const CashChart = React.memo(({ isLoading }: IReportGraph) => {
  const { reportData: data } = useAppSelector(getAppDataSelector);
  // // Series data for the chart
  const series = [
    {
      name: "Actuals",
      data: data.actual.map((item) => item.amount),
    },
    {
      name: "Scenario A",
      data: [
        ...Array(data.actual.length - 1).fill(null),
        ...data.forecast_scenario_a.map((item) => item.amount),
      ],
    },
    {
      name: "Scenario B",
      data: [
        ...Array(data.actual.length - 1).fill(null),
        ...data.forecast_scenario_b.map((item) => item.amount),
      ],
    },
  ];

  const xAxisCategories = generateXAxisCategories([
    ...data.actual,
    ...data.forecast_scenario_a,
    ...data.forecast_scenario_b,
  ]);

  const options: ApexOptions = {
    chart: {
      type: "line",
      width: "100%",
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
      show: false,
      position: "top",
      horizontalAlign: "right",
      offsetX: -5,
      offsetY: -5,
      fontWeight: "bold",
    },
    stroke: {
      curve: "straight",
      width: [3, 3, 3], // Set the stroke width for each line
      dashArray: [0, 5, 5], // Set the dashArray for dotted lines (0 for a solid line for Actuals)
    },
    grid: {
      borderColor: COLORS.grey?.[400],
    },
    colors: [
      COLORS.primary?.[100],
      COLORS.secondary?.[200],
      COLORS.primary?.[300],
    ],
    yaxis: {
      labels: {
        formatter: function (y: number) {
          if (y) {
            return y.toFixed(0) + "";
          }
          return "";
        },
      },
    },
    xaxis: {
      type: "category",
      categories: xAxisCategories,
      axisBorder: {
        show: true,
        color: COLORS.grey?.[800],
        offsetX: 0,
        offsetY: 0,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: COLORS.grey?.[800],
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
        const obj = data.actual[dataPointIndex];
        let cashBalance = "";
        let date = "";
        if (obj) {
          cashBalance = obj["amount"].toString();
          date = moment(obj["accounting_date"]).format("MMMM, YYYY");
        } else {
          return null;
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
          "Cash Balance " +
          "</div>" +
          cashBalance +
          "</div>"
        );
      },
    },
  };

  return (
    <ChartContainer>
      <div className="flex" style={{ marginRight: "5rem" }}>
        <div>
          <StyledHeading>Cash On Hand</StyledHeading>
          <StyledSubHeading>000 EUR</StyledSubHeading>
        </div>
        <Legend />
      </div>
      <DynamicChart
        series={series}
        options={options}
        height={250}
        isLoading={isLoading}
      />
    </ChartContainer>
  );
});

export default CashChart;
