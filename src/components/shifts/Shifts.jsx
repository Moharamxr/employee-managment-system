import { Card, Container, ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { getEmployeeById } from "../../services/employee.service";

function Shifts() {
  const [enableEdit, setEnableEdit] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [ssn, setSsn] = useState(0);
  const [phone, setPhone] = useState(0);
  const [workAddress, setWorkAddress] = useState("");
  const [baseSalary, setBaseSalary] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

 
  const toggleUpdate = () => {
    setEnableEdit(!enableEdit);
    getEmployeeByID(searchId);

  };
  const getEmployeeByID = async (id) => {
    try {
      const data = await getEmployeeById(id);
      setId(data.employee.id);
      setName(data.employee.name);
      setSsn(data.employee.ssn);
      setJobRole(data.employee.jobRole);
      setPhone(data.employee.phone);
      setBaseSalary(data.employee.baseSalary);
      setWorkAddress(data.employee.workAddress);
      setTotalSalary(data.employee.totalSalary);
    } catch (error) {}
  };

  const handleSearch = async () => {
    if (searchId === "") {
      return;
    }
    try {
      console.log("Search ID:", searchId);
      setSearchLoading(true);
      getEmployeeByID(searchId);

      setSearchError(false);
      setSearchLoading(false);
    } catch (error) {
      setSearchError(true);
      setSearchLoading(false);

      const timeout = setTimeout(() => {
        setSearchError(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  };

  return (
    <Container>
      <Row className="centered">
        <Col sm={6}>
          <Row>
           <Col>
              {searchError && (
                <p className="text-danger text-center">
                  كود غير صحيح حاول مجدداً
                </p>
              )}
              <div className="input-group my-4 centered">
                <button
                  type="button"
                  className="btn btn-primary "
                  style={{ height: "38px" }}
                  data-mdb-ripple-init
                  onClick={handleSearch}
                >
                  {searchLoading ? "جارى البحث" : <SearchIcon />}
                </button>
                <div className="form-outline">
                  <input
                    type="number"
                    id="form1"
                    className="form-control text-center"
                    placeholder="ابحث بكود الموظف"
                    style={{ width: "300px" }}
                    onChange={(e) => setSearchId(e.target.value)}
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
                    value={id}
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
                    value={name}
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
                    value={jobRole}
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
                    value={workAddress}
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
                    value={ssn}
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
                    value={phone}
                  />

                  <label htmlFor="empPhone">رقم الهاتف</label>
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