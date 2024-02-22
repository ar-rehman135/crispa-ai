import { Card, Col, Row, Table } from "react-bootstrap";

import "./stocktable.css";

const DefaultTables = () => {
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
                      <th>ID</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Salary</th>
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "center" }}>
                    {data.map((list: any, index: any) => (
                      <tr key={index}>
                        <th scope="row">{list.id}</th>
                        <td>{list.Name}</td>
                        <td>{list.Position}</td>
                        <td>{list.Salary}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              {/*<!-- bd --> */}
            </Card.Body>
            {/*<!-- bd --> */}
          </Card>
          {/*<!-- bd --> */}
        </Col>
      </Row>
    </div>
  );
};

DefaultTables.propTypes = {};

DefaultTables.defaultProps = {};

export default DefaultTables;
