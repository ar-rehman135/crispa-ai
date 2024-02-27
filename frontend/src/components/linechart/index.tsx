import ReactApexChart from "react-apexcharts";

interface ILineChart {
  chartData: any;
}

const LineChart = ({ chartData }: ILineChart) => {
  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="line"
        height={270}
      />
    </div>
  );
};

export default LineChart;
