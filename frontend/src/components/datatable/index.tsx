import { Card, Col, Row, Table } from "react-bootstrap";

import "./index.css";

interface IDataTables {
  columns: string[];
  data: any[];
}

const DataTable = ({ columns, data }: IDataTables) => {

  return (
    <div className="table-container">
      <Row className="row-sm">
        <Col xl={12}>
          <Card>
            <Card.Body>
              <div className="table-responsive">
                <Table className="table table-bordered table-striped mg-b-0 text-md-nowrap table-width">
                  <thead>
                    <tr>
                      {columns.map((column) => (
                        <th key={column}>{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {data.map((list: any, index: any) => (
                      <tr key={list.id}>
                        <th scope="row">{list.id}</th>
                        <td>{list.Name}</td>
                        <td>{list.Position}</td>
                        <td>{list.Salary}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};


export default DataTable;
