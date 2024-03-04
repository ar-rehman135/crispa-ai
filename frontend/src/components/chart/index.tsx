import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface IChart {
  options: ApexOptions;
  series: ApexOptions["series"];
  height?: number;
  type?: string;
  isLoading?: boolean;
}

const DynamicChart = ({ options, series, height = 250, isLoading }: IChart) => {
  return (
    <div>
      <Chart options={options} series={series} type={"line"} height={height} isLoading={isLoading}/>
    </div>
  );
};

export default DynamicChart;
