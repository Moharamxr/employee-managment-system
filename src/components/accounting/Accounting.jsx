import { Card, Container, ListGroup, Tab, Tabs } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

function Accounting() {
  const [enableEdit, setEnableEdit] = useState(false);
  const data = [
    { id: 1, first: "احمد", last: "قبطان", handle: "012121124242" },
    { id: 2, first: "محمد", last: "ضابط اول", handle: "011124242" },
    { id: 3, first: "خالد", last: "مساعد", handle: "010121124242" },
  ];
  const [baseSalary, setBaseSalary] = useState(2000);
  const handleUpdate = () => {
    setEnableEdit(!enableEdit);
  };
  return (
    <Container>
      <Row className="centered">
        <Col sm={6}>
          <Row>
            <Col>
              <div className="input-group my-4 centered">
                <button
                  type="button"
                  className="btn btn-primary "
                  style={{ height: "38px" }}
                  data-mdb-ripple-init
                >
                  <SearchIcon />
                </button>
                <div className="form-outline  " data-mdb-input-init>
                  <input
                    type="search"
                    id="form1"
                    className="form-control text-end"
                    placeholder="ابحث بكود الموظف"
                    style={{ width: "300px" }}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Card className="text-end border-0 ">
            <ListGroup variant="flush">
              <ListGroup.Item className="text-end">
                <h5 className="text-center">حسابات الموظف</h5>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <input
                    className="border-0 me-5 text-center"
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
                <div className="d-flex justify-content-between align-items-center me-5">
                  <input
                    className="border-0 me-5 text-center"
                    style={{ backgroundColor: "white" }}
                    type="text"
                    disabled
                    id="empID"
                    value={"225155"}
                  />

                  <label htmlFor="empName">أسم الموظف</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <input
                    className="border-0 me-5 text-center"
                    style={{ backgroundColor: "white" }}
                    type="text"
                    disabled
                    id="empID"
                    value={"225155"}
                  />

                  <label htmlFor="empJob"> الوظيفة</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <input
                    className="border-0 me-5 text-center"
                    style={{ backgroundColor: "white" }}
                    type="text"
                    disabled
                    id="empID"
                    value={"225155"}
                  />

                  <label htmlFor="empPlace">مكان العمل</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <input
                    className="border-0 me-5 text-center"
                    style={{ backgroundColor: "white" }}
                    type="number"
                    disabled
                    id="empID"
                    value={"225155"}
                  />

                  <label htmlFor="empNaID">رقم البطاقة</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <input
                    className="border-0 me-5 text-center"
                    style={{ backgroundColor: "white" }}
                    type="number"
                    disabled
                    id="empID"
                    value={"225155"}
                  />

                  <label htmlFor="empPhone">رقم الهاتف</label>
                </div>
              </ListGroup.Item>

              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <div className="d-flex me-5">
                    {enableEdit&&<button
                      type="button"
                      className="btn btn-primary fs-6 p-1 "
                      style={{ height: "38px" }}
                      data-mdb-ripple-init
                      onClick={handleUpdate}
                    >
تأكيد                    </button>}
                    <input
                      className="form-control text-center "
                      style={{
                        backgroundColor: `${
                          enableEdit ? "lightgrey" : "white "
                        }`,
                        width: "138px",
                      }}
                      type="number"
                      id="baseSalary"
                      disabled={!enableEdit}
                      onChange={(e) => setBaseSalary(e.target.value)}
                      value={baseSalary}
                    />
                    <button
                      type="button"
                      className={`btn btn-${
                        enableEdit ? "secondary" : "primary"
                      } fs-6 p-1 `}
                      style={{ height: "38px" }}
                      data-mdb-ripple-init
                      onClick={handleUpdate}
                    >
                      {enableEdit ? "إلغاء" : "تحديث"}
                    </button>
                  </div>

                  <label htmlFor="baseSalary">الراتب الأساسى</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <div className="d-flex me-5">
                    
                    <input
                      className="form-control text-center  "
                      style={{ backgroundColor: "white", width: "138px" }}
                      type="number"
                      id="loans"
                    /><button
                      type="button"
                      className="btn btn-primary "
                      style={{ height: "38px" }}
                      data-mdb-ripple-init
                    >
                      <AddIcon />
                    </button>
                  </div>

                  <label htmlFor="loans">سلف</label>
                </div>
              </ListGroup.Item>

              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <div className="d-flex me-5">
                    
                    <input
                      className="form-control text-center  "
                      style={{ backgroundColor: "white", width: "138px" }}
                      type="number"
                      id="deductions"
                    /><button
                      type="button"
                      className="btn btn-primary "
                      style={{ height: "38px" }}
                      data-mdb-ripple-init
                    >
                      <AddIcon />
                    </button>
                  </div>

                  <label htmlFor="deductions">استقطاعات</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <div className="d-flex me-5">
                    
                    <input
                      className="form-control text-center  "
                      style={{ backgroundColor: "white", width: "138px" }}
                      type="number"
                      id="exchanges"
                    /><button
                      type="button"
                      className="btn btn-primary "
                      style={{ height: "38px" }}
                      data-mdb-ripple-init
                    >
                      <AddIcon />
                    </button>
                  </div>

                  <label htmlFor="exchanges">بدلات</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <div className="d-flex me-5">
                    
                    <input
                      className="form-control text-center  "
                      style={{ backgroundColor: "white", width: "138px" }}
                      type="number"
                      id="bonus"
                    /><button
                      type="button"
                      className="btn btn-primary "
                      style={{ height: "38px" }}
                      data-mdb-ripple-init
                    >
                      <AddIcon />
                    </button>
                  </div>

                  <label htmlFor="bonus">مكافئات</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <input
                    className="border-0 me-5 text-center"
                    style={{ backgroundColor: "white" }}
                    type="text"
                    disabled
                    id="salary"
                    value={"225155"}
                  />

                  <label htmlFor="salary">صافى اجمالى الراتب</label>
                </div>
                <hr />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className="centered mb-5">
        <Col sm={6}>
          <Tabs
            defaultActiveKey="Loans"
            id="fill-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="Loans" title="سلف">
              <table className="table text-end ">
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
              <table className="table text-end">
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
            <Tab eventKey="bonus" title="مكافئات">
              <table className="table text-end">
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
              <table className="table text-end">
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
}

export default Accounting;
