import React, { useEffect, useState } from "react";
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

interface CashBalanceData {
  date: Date;
  cashBalance: number;
}

interface ChartDataState {
  actuals: CashBalanceData[];
  scenarioA: CashBalanceData[];
  scenarioB: CashBalanceData[];
}

const generateXAxisCategories = (data: CashBalanceData[]) => {
  return data.map((item) => {
    const formattedDate = moment(item.date).format("MMM").charAt(0);
    return formattedDate;
  });
};

const generateRandomData = (
  startDate: moment.Moment,
  endDate: moment.Moment,
  initialValue: number,
  variance: number,
  isScenario: boolean = false
) => {
  const data: any[] = [];
  let currentDate = moment(startDate);
  let cashBalance = initialValue;

  while (currentDate <= endDate) {
    if (!isScenario || currentDate.isAfter(startDate)) {
      data.push({
        date: currentDate.toDate(),
        cashBalance: cashBalance,
      });
    }
    // Adjust the cash balance randomly
    cashBalance += Math.floor(Math.random() * variance) - variance / 2;
    // Move to the next month
    currentDate.add(1, "month");
  }

  return data;
};

const CashChart = React.memo(() => {
  const [data, setData] = useState<ChartDataState>({
    actuals: [],
    scenarioA: [],
    scenarioB: [],
  });

  useEffect(() => {
    const overallStartDate = moment().subtract(3, "years").startOf("month");
    const overallEndDate = moment().endOf("month");
    // Use clone to avoid mutating actualsEndDate
    const actualsEndDate = moment(overallStartDate)
      .add(1, "year")
      .endOf("month")
      .clone();

    // Generate the actuals data
    const actualsData = generateRandomData(
      overallStartDate,
      actualsEndDate,
      5000,
      1000
    );

    // Set the start date for the scenarios to be the day after the last actuals data point
    const scenarioStartDate = moment(
      actualsData[actualsData.length - 1].date
    ).add(1, "day");

    // Generate the scenario data
    const scenarioAData = generateRandomData(
      scenarioStartDate,
      overallEndDate,
      actualsData[actualsData.length - 1].cashBalance,
      500,
      true
    );
    const scenarioBData = generateRandomData(
      scenarioStartDate,
      overallEndDate,
      actualsData[actualsData.length - 1].cashBalance,
      2000,
      true
    );

    setData({
      actuals: actualsData,
      scenarioA: scenarioAData,
      scenarioB: scenarioBData,
    });
  }, []);

  // Series data for the chart
  const series = [
    {
      name: "Actuals",
      data: data.actuals
        .map((item) => item.cashBalance)
        .concat(Array(data.scenarioA.length).fill(null)),
    },
    {
      name: "Scenario A",
      data: Array(data.actuals.length)
        .fill(null)
        .concat(data.scenarioA.map((item) => item.cashBalance)),
    },
    {
      name: "Scenario B",
      data: Array(data.actuals.length)
        .fill(null)
        .concat(data.scenarioB.map((item) => item.cashBalance)),
    },
  ];

  const xAxisCategories = generateXAxisCategories([
    ...data.actuals,
    ...data.scenarioA,
    ...data.scenarioB,
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
      offsetX: -15,
      offsetY: -15,
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
    colors: [COLORS.primary?.[100], COLORS.secondary?.[200], COLORS.primary?.[300]],
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
        const obj = data.actuals[dataPointIndex];
        let cashBalance = "";
        let date = "";
        if (obj) {
          cashBalance = obj["cashBalance"].toString();
          date = moment(obj["date"]).format("MMMM, YYYY");
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
      <DynamicChart series={series} options={options} height={250} />
    </ChartContainer>
  );
});

export default CashChart;
