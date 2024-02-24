import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface IChart {
  options: ApexOptions;
  series: ApexOptions["series"];
  height?: number;
  type?: string;
}

const DynamicChart = ({ options, series, height = 250 }: IChart) => {
  return (
    <div>
      <Chart options={options} series={series} type={"line"} height={height} />
    </div>
  );
};

export default DynamicChart;
