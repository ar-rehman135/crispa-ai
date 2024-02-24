import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface IChart {
  options: ApexOptions;
  series: ApexOptions["series"];
  type?: string;
}

const DynamicChart = ({ options, series, type }: IChart) => {
  return (
    <div>
      <Chart options={options} series={series} type={"line"} height={350} />
    </div>
  );
};

export default DynamicChart;
