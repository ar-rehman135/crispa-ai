import { Button, Card } from "react-bootstrap";
import { Input } from "@mui/material";

import LineChart from "../../linechart";
import "./index.css"

interface ILineChart {
    chartData: any
}

const PriceChart = ({chartData}: ILineChart) => {
  return (
    <div className="chart-container">
      <Card className="custom-card overflow-hidden">
        <div className="table-header">
          <div>
            <Card.Header className=" border-bottom-0 d-flex">
              <h3 className="card-title s-16 share-text">Share Price</h3>
            </Card.Header>
            <Card.Header className=" border-bottom-0 d-flex">
              <h3 className="card-title currency-text">USD</h3>
            </Card.Header>
          </div>
          <div className="search-container">
            <Card.Header className="starting-month">Starting Month</Card.Header>
            <Input
              type="date"
              className="date-input"
              placeholder="Enter a stock symbol"
            ></Input>
            <Input
              type="text"
              className="search-input"
              placeholder="Enter a stock symbol"
            ></Input>
            <Button className="update-button">Update</Button>
          </div>
        </div>
        <Card.Body>
          <div id="statistics2">
            <LineChart chartData={chartData}  />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PriceChart;
