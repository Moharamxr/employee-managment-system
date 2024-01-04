import { Card, Container, ListGroup, Tab, Tabs } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { getEmployeeById, updateBaseSalary } from "../../services/employee.service";

function Accounting() {
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

  
  const [bonuses, setBonuses] = useState([]);
  const [totalBonuses, setTotalBonuses] = useState(0);

  const [loans, setLoans] = useState([]);
  const [totalLoans, setTotalLoans] = useState(0);

  const [deductions, setDeductions] = useState([]);
  const [totalDeductions, setTotalDeductions] = useState(0);

  const [compensations, setCompensations] = useState([]);
  const [totalCompensations, setTotalCompensations] = useState(0);

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

      setBonuses(data.employee.bonuses.bonusesDetails);
      setLoans(data.employee.loans.loansDetails);
      setDeductions(data.employee.deductions.deductionsDetails);
      setCompensations(data.employee.compensations.compensationsDetails);

      setTotalBonuses(data.employee.bonuses.totalBonuses);
      setTotalLoans(data.employee.loans.totalLoans);
      setTotalDeductions(data.employee.deductions.totalDeductions);
      setTotalCompensations(data.employee.compensations.totalCompensations);
    } catch (error) {
      console.error(error);
      setSearchError(true);
      setSearchLoading(false);

      const timeout = setTimeout(() => {
        setSearchError(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  };

  const handleSearch = async () => {
    if (searchId &&searchId>0) {
      
    
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
  }else{
    setSearchError(true);
      setSearchLoading(false);

      const timeout = setTimeout(() => {
        setSearchError(false);
      }, 3000);

      return () => clearTimeout(timeout);
  }
  };

  const handleUpdateBaseSalary = async () => {
    const newData = {
      baseSalary:baseSalary,
    };
    console.log(newData);
    if (
      baseSalary !== ""
    ) {
      setError("");
      setIsLoading(true);
      try {
        await updateBaseSalary(newData);
        toggleUpdate();
        
        setIsLoading(false);
      } catch (error) {
        setError(error.response.data.error || "حدث خطأ أثناء تحديث الراتب الاساسى.");
        
        setIsLoading(false);
        const timeout = setTimeout(() => {
          setError("");
        }, 3000);

        return () => clearTimeout(timeout);
      }
      setIsLoading(false);
    } else {
      setError("حدث خطأ أثناء تحديث الراتب الاساسى.");
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
                    type="search"
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
          <Card className="text-end border-0 ">
            <ListGroup variant="flush">
              <ListGroup.Item className="text-end">
                <h5 className="text-center">حسابات الموظف</h5>
                {error && <p className="text-center text-danger">{error}</p>}
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
                    {enableEdit && (
                      <button
                        type="button"
                        className="btn btn-primary fs-6 p-1 "
                        style={{ height: "38px" }}
                        data-mdb-ripple-init
                        onClick={handleUpdateBaseSalary}
                      >
                        تأكيد
                      </button>
                    )}
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
                      onClick={toggleUpdate}
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
                    />
                    <button
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
                    />
                    <button
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
                    />
                    <button
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
                    />
                    <button
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
                    value={totalSalary}
                  />

                  <label htmlFor="salary">صافى اجمالى الراتب</label>
                </div>
                <hr />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row className="centered my-5">
        <Col sm={6}>
          <Tabs
            defaultActiveKey="Loans"
            id="fill-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="Loans" title="سلف">
              <table className="table text-end">
                <thead>
                  <tr>
                    <th scope="col">الأجمالى</th>
                    <th scope="col">القيمة</th>
                    <th scope="col">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {loans.map((item) => (
                    <tr key={item._id}>
                      <td>{/* Add the corresponding date field here */}</td>
                      <td>{item.amount}</td>
                      <td>{item.date.slice(0, 10)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>{totalLoans}</td>
                    <td>{/* Add the corresponding value field here */}</td>
                    <td>{/* Add the corresponding date field here */}</td>
                  </tr>
                </tbody>
              </table>
            </Tab>
            <Tab eventKey="Exchanges" title="بدلات">
              <table className="table text-end">
                <thead>
                  <tr>
                    <th scope="col">الأجمالى</th>
                    <th scope="col">القيمة</th>
                    <th scope="col">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {compensations.map((item) => (
                    <tr key={item._id}>
                      <td>{/* Add the corresponding date field here */}</td>
                      <td>{item.amount}</td>
                      <td>{item.date.slice(0, 10)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>{totalCompensations}</td>
                    <td>{/* Add the corresponding value field here */}</td>
                    <td>{/* Add the corresponding date field here */}</td>
                  </tr>
                </tbody>
              </table>
            </Tab>
            <Tab eventKey="bonus" title="مكافئات">
              <table className="table text-end">
                <thead>
                  <tr>
                    <th scope="col">الأجمالى</th>
                    <th scope="col">القيمة</th>
                    <th scope="col">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {bonuses.map((item) => (
                    <tr key={item._id}>
                      <td>{/* Add the corresponding date field here */}</td>
                      <td>{item.amount}</td>
                      <td>{item.date.slice(0, 10)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>{totalBonuses}</td>
                    <td>{/* Add the corresponding value field here */}</td>
                    <td>{/* Add the corresponding date field here */}</td>
                  </tr>
                </tbody>
              </table>
            </Tab>
            <Tab eventKey="Deductions" title="استقطاعات">
              <table className="table text-end">
                <thead>
                  <tr>
                    <th scope="col">الأجمالى</th>
                    <th scope="col">القيمة</th>
                    <th scope="col">التاريخ</th>
                  </tr>
                </thead>
                <tbody>
                  {deductions.map((item) => (
                    <tr key={item._id}>
                      <td>{/* Add the corresponding date field here */}</td>
                      <td>{item.amount}</td>
                      <td>{item.date.slice(0, 10)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>{totalDeductions}</td>
                    <td>{/* Add the corresponding value field here */}</td>
                    <td>{/* Add the corresponding date field here */}</td>
                  </tr>
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
