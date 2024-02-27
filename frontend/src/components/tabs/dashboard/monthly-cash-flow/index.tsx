import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import moment from "moment";

import DynamicChart from "components/chart";

import Legend from "./legend";
import {
  ChartContainer,
  StyledDivHeadingContainer,
  StyledHeading,
  StyledSelect,
  StyledSubHeading,
} from "./index.styles";
import { COLORS } from "colors";

interface CashFlowData {
  date: Date;
  net: number;
  inflow: number;
  outflow: number;
}

const generateXAxisCategories = (data: CashFlowData[]) => {
  return data.map((item) => {
    const formattedDate = moment(item.date).format("MMM").charAt(0);
    return formattedDate;
  });
};

// Function to generate random monthly cash flow data
const generateMonthlyCashFlowData = (months: number): CashFlowData[] => {
  const data: CashFlowData[] = [];
  let currentDate = moment().subtract(months, "months");
  for (let i = 0; i < months; i++) {
    // 'Inflow' is a positive value
    const inflow = Math.random() * 2000 + 1000; // For example, between 1000 and 3000
    // 'Outflow' is a negative value
    const outflow = -(Math.random() * 1000 + 500); // For example, between -500 and -1500
    // 'Net' is the algebraic sum of 'Inflow' and 'Outflow'
    const net = inflow + outflow; // Outflow is negative, so it's effectively subtracted from Inflow

    data.push({
      date: currentDate.toDate(),
      net,
      inflow,
      outflow,
    });

    currentDate.add(1, "month");
  }
  return data;
};

const MonthlyCashFlowChart = () => {
  const [cashFlowData, setCashFlowData] = useState<CashFlowData[]>([]);

  const [selectedScenario, setSelectedScenario] =
    useState<string>("Scenario A");

  useEffect(() => {
    setCashFlowData(generateMonthlyCashFlowData(24));
  }, []);

  const series = [
    {
      name: "Net",
      type: "line",
      data: cashFlowData.map((data) => data.net),
    },
    {
      name: "Inflow",
      type: "column",
      data: cashFlowData.map((data) => data.inflow),
    },
    {
      name: "Outflow",
      type: "column",
      data: cashFlowData.map((data) => data.outflow),
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "line",
      stacked: false,
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 5,
        left: 0,
        blur: 3,
        color: COLORS.BLACK,
        opacity: 0.1,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "20%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      width: [4, 0, 0], // Setting line width for 'Net' and no line for 'Inflow' and 'Outflow'
    },
    grid: {
      borderColor: COLORS.LIGHT_GREY,
    },
    colors: [COLORS.BLUE_700, COLORS.GREEN_100, COLORS.PINK_200],
    yaxis: {
      labels: {
        formatter: function (y: number) {
          return y.toFixed(0) + "";
        },
      },
    },
    xaxis: {
      type: "category",
      categories: generateXAxisCategories(cashFlowData),
      axisBorder: {
        show: true,
        color: COLORS.SILVER_100,
        offsetX: 0,
        offsetY: 0,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: COLORS.SILVER_100,
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
        const obj = cashFlowData[dataPointIndex];
        let inflow = "";
        let outflow = "";
        let net = "";
        let date = "";
        if (obj) {
          inflow = obj["inflow"].toFixed(2).toString();
          outflow = obj["outflow"].toFixed(2).toString();
          net = obj["net"].toFixed(2).toString();
          date = moment(obj["date"]).format("MMMM, YYYY");
        }
        return (
          '<div class="custom-tooltip">' +
          "<div>" +
          date +
          "</div>" +
          "<div class='flex' style='margin-top: 0.5rem'>" +
          "<div class='flex'>" +
          "<div class='green-dot'>" +
          "</div>" +
          "Cash in: " +
          "</div>" +
          inflow +
          "</div>" +
          "<div class='flex'>" +
          "<div class='flex'>" +
          "<div class='dark-blue-dot'>" +
          "</div>" +
          "Cash out: " +
          "</div>" +
          outflow +
          "</div>" +
          "<div class='flex'>" +
          "<div class='flex'>" +
          "<div class='pink-dot'>" +
          "</div>" +
          "Bet Cash flow " +
          "</div>" +
          net +
          "</div>" +
          "</div>"
        );
      },
    },
  };

  const handleScenarioChange = (event: any) => {
    setSelectedScenario(event.target.value);
  };

  return (
    <ChartContainer>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <StyledDivHeadingContainer>
          <div>
            <StyledHeading>Monthly Cash Hand</StyledHeading>
            <StyledSubHeading>000 EUR</StyledSubHeading>
          </div>
          <StyledSelect
            value={selectedScenario}
            onChange={handleScenarioChange}
          >
            <option value={"Scenario A"}>Scenario A</option>
            <option value={"Scenario B"}>Scenario B</option>
          </StyledSelect>
        </StyledDivHeadingContainer>
        <Legend />
      </div>
      <DynamicChart series={series} options={options} height={250} />
    </ChartContainer>
  );
};

export default MonthlyCashFlowChart;
