import { useCallback, useEffect, useState } from "react";

import DataTable from "../../datatable";
import { mockData } from "./mockData";
import PriceChart from "./chart";

import "./index.css";

export default function SharePrice() {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Sales",
        data: [32, 15, 63, 51, 136, 62, 99, 42, 178, 76, 32, 180],
      },
    ],
    options: {
      chart: {
        height: 280,
        type: "line", // Corrected this line
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
        width: "3",
      },
      grid: {
        borderColor: "#f2f6f7",
      },
      colors: ["#5343BF"],

      yaxis: {
        title: {
          text: "Growth",
          style: {
            color: "#adb5be",
            fontSize: "14px",
            fontFamily: "poppins, sans-serif",
            fontWeight: 600,
            cssClass: "apexcharts-yaxis-label",
          },
        },
        labels: {
          formatter: function (y: number) {
            return y.toFixed(0) + "";
          },
        },
      },
      xaxis: {
        type: "number",
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ],
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
          width: 6,
          offsetX: 0,
          offsetY: 0,
        },
        labels: {
          rotate: -90,
        },
      },
    },
  });

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Add leading zero if necessary

  const formattedDate = `${currentYear}-${currentMonth}`;
  const transformData = useCallback((data: any, filterMonth: any, allData = false) => {
    const dates = Object.keys(data["Time Series (Daily)"]).reverse(); // Reverse the order to show latest date first

    // Filter data based on month if filterMonth is provided
    // const [year, month, day] = new Date().getDate

    const filteredDates =
      filterMonth && !allData
        ? dates.filter((date) => date.startsWith(filterMonth))
        : dates;

    const categories = filteredDates.map((date) => {
      const [year, month, _] = date.split("-");
      return `${year}-${month}`; // Format: YYYY-MM
    });

    const seriesData = {
      name: "Sales",
      data: filteredDates.map((date) =>
        parseFloat(data["Time Series (Daily)"][date]["4. close"])
      ),
    };

    const options = {
      ...chartData.options,
      xaxis: {
        ...chartData.options.xaxis,
        categories,
      },
    };

    return { series: [seriesData], options };
  }, [chartData.options]);

  useEffect(() => {
    setChartData(transformData(mockData, formattedDate));
  }, [formattedDate, transformData]);

  const data = [
    {
      id: "1",
      Name: "Joan Powell",
      Position: "Associate Developer",
      Salary: "$450,870",
    },
    {
      id: "2",
      Name: "Gavin Gibson",
      Position: "Account manager",
      Salary: "$230,540",
    },
    {
      id: "3",
      Name: "Julian Kerr",
      Position: "Senior Javascript Developer",
      Salary: "$55,300",
    },
    {
      id: "4",
      Name: "Cedric Kelly",
      Position: "Accountant",
      Salary: "$234,100",
    },
    {
      id: "5",
      Name: "Samantha May",
      Position: "Junior Technical Author",
      Salary: "$43,198",
    },
  ];

  const columns = [
    "DATE",
    "OPEN",
    "HIGH",
    "LOW",
    "CLOSE",
    "VOLUME",
    "MOVEMENT",
  ];


  return (
    <>
      <PriceChart  chartData={chartData} />
      <DataTable columns={columns} data={data} />
    </>
  );
}
