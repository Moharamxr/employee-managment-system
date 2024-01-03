import { Card, Container, ListGroup } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

function Shifts() {
  const [enableEdit, setEnableEdit] = useState(false);
  // const [account,setAccount] = useState({baseSalary: 0,});
  const [baseSalary,setBaseSalary] = useState(2000);
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
          <Card className="text-end border-0 mb-5">
            <ListGroup variant="flush">
              <ListGroup.Item className="text-end">
                <h5 className="text-center">شيفتات الموظف</h5>
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
              {/* <ListGroup.Item className="text-end">
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
                    <button
                      type="button"
                      className="btn btn-primary fs-6 p-1 "
                      style={{ height: "38px" }}
                      data-mdb-ripple-init
                      onClick={handleUpdate}
                    >
                      تحديث
                    </button>

                    <input
                      className="form-control text-center border-start-0 "
                      style={{
                        backgroundColor: `${
                          enableEdit ? "lightgrey" : "white "
                        }`,
                        width: "138px",
                      }}
                      type="number"
                      id="baseSalary"
                      disabled={!enableEdit}
                      onChange={(e)=>setBaseSalary(e.target.value)}
                      value={baseSalary}
                    />
                  </div>

                  <label htmlFor="baseSalary">الراتب الأساسى</label>
                </div>
              </ListGroup.Item> */}
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <div className="d-flex me-5">
                    <button
                      type="button"
                      className="btn btn-primary "
                      style={{ height: "38px" }}
                      data-mdb-ripple-init
                    >
                      <AddIcon />
                    </button>
                    <input
                      className="form-control text-center border-start-0 "
                      style={{ backgroundColor: "white", width: "138px" }}
                      type="number"
                      id="loans"
                    />
                  </div>

                  <label htmlFor="loans">تاريخ صعود الوردية</label>
                </div>
              </ListGroup.Item>

              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <div className="d-flex me-5">
                    <button
                      type="button"
                      className="btn btn-primary "
                      style={{ height: "38px" }}
                      data-mdb-ripple-init
                    >
                      <AddIcon />
                    </button>
                    <input
                      className="form-control text-center border-start-0 "
                      style={{ backgroundColor: "white", width: "138px" }}
                      type="number"
                      id="deductions"
                    />
                  </div>

                  <label htmlFor="deductions">تاريخ نزول الوردية</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <div className="d-flex me-5">
                    <button
                      type="button"
                      className="btn btn-primary "
                      style={{ height: "38px" }}
                      data-mdb-ripple-init
                    >
                      <AddIcon />
                    </button>
                    <input
                      className="form-control text-center border-start-0 "
                      style={{ backgroundColor: "white", width: "138px" }}
                      type="number"
                      id="exchanges"
                    />
                  </div>

                  <label htmlFor="exchanges">وقت صعود الشيفت</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <div className="d-flex me-5">
                    <button
                      type="button"
                      className="btn btn-primary "
                      style={{ height: "38px" }}
                      data-mdb-ripple-init
                    >
                      <AddIcon />
                    </button>
                    <input
                      className="form-control text-center border-start-0 "
                      style={{ backgroundColor: "white", width: "138px" }}
                      type="number"
                      id="bonus"
                    />
                  </div>

                  <label htmlFor="bonus">وقت نزول الشيفت</label>
                </div>
              </ListGroup.Item>
              
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Shifts;
