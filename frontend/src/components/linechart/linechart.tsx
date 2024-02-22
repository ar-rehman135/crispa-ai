import { Card } from "react-bootstrap";
import "./linechart.css";
import * as Dashboard2data from "./data";
import { Input, Button } from "@mui/material";

const Echart = () => (
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
          <Input type="date" className="date-input" placeholder="Enter a stock symbol"></Input>
          <Input type="text" className="search-input" placeholder="Enter a stock symbol"></Input>
          <Button className="update-button">Update</Button>
        </div>
      </div>
      <Card.Body>
        <div id="statistics2">
          <Dashboard2data.Statistics2 />
        </div>
      </Card.Body>
    </Card>
  </div>
);

Echart.propTypes = {};

Echart.defaultProps = {};

export default Echart;
