import { Divider } from "@mui/material";
import React from "react";
import {
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
// import SearchIcon from "@mui/icons-material/Search";

const EmployeeDetails = () => {
  const data = [
    { id: 1, first: "Mark", last: "Otto", handle: "012121124242" },
    { id: 2, first: "Jacob", last: "Thornton", handle: "@fat" },
    { id: 3, first: "Larry the Bird", last: "fghr", handle: "@twitter" },
  ];
  return (
    <Container >
        <Row className="d-flex justify-content-center">
        <Col sm={7}>
          <Card className="text-end border-0">    
            <ListGroup variant="flush">
              <ListGroup.Item className="text-end">
                <h5 className="text-center">بيانات الموظف</h5>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-around">
                  <input
                    className="border-0  text-end"
                    style={{ backgroundColor: "white" }}
                    type="text"
                    disabled
                    id="empID"
                    value={"225155"}
                  />
                  <label htmlFor="empId">كود الموظف</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-around">
                  <input
                    className="border-0 text-end"
                    style={{ backgroundColor: "white" }}
                    type="text"
                    disabled
                    id="empName"
                    value={"أحمد محمد مصطفى خالد"}
                  />
                  <label htmlFor="empName">أسم الموظف</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-around">
                  <input
                    className="border-0 text-end"
                    style={{ backgroundColor: "white" }}
                    type="text"
                    disabled
                    id="empJob"
                    value={"قبطان"}
                  />
                  <label htmlFor="empJob"> الوظيفة</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-around">
                  <input
                    className="border-0 text-end"
                    style={{ backgroundColor: "white" }}
                    type="text"
                    disabled
                    id="empPlace"
                    value={"مكان أ"}
                  />
                  <label htmlFor="empPlace">مكان العمل</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-around">
                  <input
                    className="border-0 text-end"
                    style={{ backgroundColor: "white" }}
                    type="text"
                    disabled
                    id="empNaID"
                    value={"532452"}
                  />
                  <label htmlFor="empNaID">رقم البطاقة</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-around">
                  <input
                    className="border-0 text-end"
                    style={{ backgroundColor: "white" }}
                    type="text"
                    disabled
                    id="empPhone"
                    value={"457575"}
                  />
                  <label htmlFor="empPhone">رقم الهاتف</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-around">
                  <input
                    className="border-0 text-end"
                    style={{ backgroundColor: "white" }}
                    type="text"
                    disabled
                    id="empPhone"
                    value={"2000"}
                  />
                  <label htmlFor="empPhone">الراتب الأساسى</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-around">
                  <input
                    className="border-0 text-end"
                    style={{ backgroundColor: "white" }}
                    type="text"
                    disabled
                    id="empPhone"
                    value={"3000"}
                  />
                  <label htmlFor="empPhone">صافى اجمالى الراتب</label>
                </div>
              </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
    
      <Row className="d-flex justify-content-center mt-5">
        <Col sm={6} >
          <Tabs defaultActiveKey="Loans" id="fill-tab-example" className="mb-3" justify >
            <Tab eventKey="Loans" title="سلف">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">القيمة</th>
                    <th scope="col">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.first}</td>
                      <th scope="row">{item.id}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tab>
            <Tab eventKey="Exchanges" title="بدلات">
              <Col sm={9}>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">القيمة</th>
                    <th scope="col">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.first}</td>
                      <th scope="row">{item.id}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
              </Col>
            </Tab>
            <Tab eventKey="bonus" title="مكافئات">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">القيمة</th>
                    <th scope="col">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.first}</td>
                      <th scope="row">{item.id}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tab>
            <Tab eventKey="Deductions" title="استقطاعات">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">القيمة</th>
                    <th scope="col">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.first}</td>
                      <th scope="row">{item.id}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tab>
          </Tabs>
        </Col>
        </Row>
        
    </Container>
  );
};

export default EmployeeDetails;
