import { Card, Container, ListGroup, Tab, Tabs } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import {
  getEmployeeById,
  updateEmployee,
} from "../../services/employee.service";
import { addDeductions, addLoan } from "../../services/financials.service";
import { Navigate } from "react-router-dom";
import ResetSalary from "./ResetSalary";

function Accounting() {
  const [enableEdit, setEnableEdit] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [ssn, setSsn] = useState("");
  const [phone, setPhone] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [totalSalary, setTotalSalary] = useState("");
  const [delayedSalary, setDelayedSalary] = useState("");

  const [bonuses, setBonuses] = useState([]);
  const [totalBonuses, setTotalBonuses] = useState("");

  const [loans, setLoans] = useState([]);
  const [totalLoans, setTotalLoans] = useState("");

  const [deductions, setDeductions] = useState([]);
  const [totalDeductions, setTotalDeductions] = useState("");

  const [compensations, setCompensations] = useState([]);
  const [totalCompensations, setTotalCompensations] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false);

  const toggleUpdate = () => {
    setEnableEdit(!enableEdit);
    getEmployeeByID(searchId);
  };
  const getEmployeeByID = async (id) => {
    try {
      const data = await getEmployeeById(id);
      setShow(true);
      setId(data.employee.id);
      setName(data.employee.name);
      setSsn(data.employee.ssn);
      setJobRole(data.employee.jobRole);
      setPhone(data.employee.phone);
      setBaseSalary(data.employee.baseSalary);
      setWorkAddress(data.employee.workAddress);
      setTotalSalary(data.employee.totalSalary);
      setDelayedSalary(data.employee.delayedSalary);

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
      setShow(false);
      const timeout = setTimeout(() => {
        setSearchError(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  };

  const handleSearch = async () => {
    if (searchId && searchId > 0) {
      try {
        console.log("Search ID:", searchId);
        setSearchLoading(true);
        getEmployeeByID(searchId);

        setSearchError(false);
        setSearchLoading(false);
      } catch (error) {
        setSearchError(true);
        setSearchLoading(false);
        setShow(false);

        const timeout = setTimeout(() => {
          setSearchError(false);
        }, 3000);

        return () => clearTimeout(timeout);
      }
    } else {
      setSearchError(true);
      setSearchLoading(false);

      setShow(false);

      const timeout = setTimeout(() => {
        setSearchError(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
    setSearchLoading(false);
  };

  const handleUpdateBaseSalary = async () => {
    const newData = {
      id: id,
      name: name,
      jobRole: jobRole,
      ssn: ssn,
      phone: phone,
      workAddress: workAddress,
      baseSalary: baseSalary,
    };
    console.log(newData);
    if (baseSalary !== "") {
      setError("");
      setIsLoading(true);
      try {
        await updateEmployee(newData);
        toggleUpdate();

        setIsLoading(false);
      } catch (error) {
        setError(
          error.response.data.error || "حدث خطأ أثناء تحديث الراتب الاساسى."
        );

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

  const [isLLoading, setIsLLoading] = useState(false);
  const [isDLoading, setIsDLoading] = useState(false);
  const [isCLoading, setIsCLoading] = useState(false);
  const [isBLoading, setIsBLoading] = useState(false);
  const [loan, setLoan] = useState("");
  const handleAddLoans = async () => {
    const newData = {
      id: id,
      type: "loan",
      amount: loan,
    };
    if (loan && loan > 0) {
      setIsLLoading(true);
      try {
        await addLoan(newData);
        getEmployeeByID(searchId);
        setLoan("");
        setIsLLoading(false);
      } catch (error) {
        console.log("errorLoan");
        setIsLLoading(false);
      }
    } else {
      console.log("wrongLoan");
    }
    setIsLLoading(false);
  };
  const [deduction, setDeduction] = useState("");
  const handleAddDeduction = async () => {
    console.log(deduction);
    const newData = {
      id: id,
      type: "deduction",
      amount: deduction,
    };
    if (deduction && deduction > 0) {
      setIsDLoading(true);
      try {
        await addDeductions(newData);
        getEmployeeByID(searchId);
        setDeduction("");
        setIsDLoading(false);
      } catch (error) {
        console.log("error setDeduction");
        setIsDLoading(false);
      }
    } else {
      console.log("wrong setDeduction");
    }
    setIsDLoading(false);
  };
  const [compensation, setCompensation] = useState("");
  const handleAddCompensation = async () => {
    const newData = {
      id: id,
      type: "compensation",
      amount: compensation,
    };
    if (compensation && compensation > 0) {
      setIsCLoading(true);
      try {
        await addLoan(newData);
        getEmployeeByID(searchId);
        setCompensation("");
        setIsCLoading(false);
      } catch (error) {
        console.log("error setCompensation");
        setIsCLoading(false);
      }
    } else {
      console.log("wrong setCompensation");
    }
    setIsCLoading(false);
  };
  const [bonus, setBonus] = useState("");
  const handleAddBonus = async () => {
    const newData = {
      id: id,
      type: "bonus",
      amount: bonus,
    };
    if (bonus && bonus > 0) {
      setIsBLoading(true);
      try {
        await addLoan(newData);
        getEmployeeByID(searchId);
        setBonus("");
        setIsBLoading(false);
      } catch (error) {
        console.log("error setBonus");
        setIsBLoading(false);
      }
    } else {
      console.log("wrong setBonus");
    }
    setIsBLoading(false);
  };
  const isAccountant = localStorage.getItem("role") === "accountant";
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    getEmployeeByID(searchId);
  };

  return isAccountant ? (
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
                    autoComplete="off"
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Card className="text-end border-0 ">
            <ListGroup variant="flush">
              {show && (
                <>
                  <ListGroup.Item className="text-end">
                    <h5 className="text-center">حسابات الموظف</h5>

                    {error && (
                      <p className="text-center text-danger">{error}</p>
                    )}
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

                  {enableEdit ? (
                    <>
                      <ListGroup.Item className="text-end">
                        <div className="d-flex justify-content-between align-items-center me-5">
                          <div className="d-flex me-5">
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
                              className="btn btn-primary fs-6 p-1 "
                              style={{ height: "38px" }}
                              data-mdb-ripple-init
                              onClick={handleUpdateBaseSalary}
                              disabled={isLoading}
                            >
                              {isLoading ? "..." : "تأكيد"}
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
                              style={{
                                backgroundColor: "lightgrey",
                                width: "138px",
                              }}
                              type="number"
                              id="loans"
                              onChange={(e) => setLoan(e.target.value)}
                              value={loan}
                            />
                            <button
                              type="button"
                              className="btn btn-primary "
                              style={{ height: "38px" }}
                              data-mdb-ripple-init
                              onClick={handleAddLoans}
                              disabled={isLLoading}
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
                              style={{
                                backgroundColor: "lightgrey",
                                width: "138px",
                              }}
                              type="number"
                              id="deductions"
                              onChange={(e) => setDeduction(e.target.value)}
                              value={deduction}
                            />
                            <button
                              type="button"
                              className="btn btn-primary "
                              style={{ height: "38px" }}
                              data-mdb-ripple-
                              onClick={handleAddDeduction}
                              disabled={isDLoading}
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
                              style={{
                                backgroundColor: "lightgrey",
                                width: "138px",
                              }}
                              type="number"
                              id="Compensation"
                              onChange={(e) => setCompensation(e.target.value)}
                              value={compensation}
                            />
                            <button
                              type="button"
                              className="btn btn-primary "
                              style={{ height: "38px" }}
                              data-mdb-ripple-init
                              onClick={handleAddCompensation}
                              disabled={isCLoading}
                            >
                              <AddIcon />
                            </button>
                          </div>

                          <label htmlFor="Compensation">بدلات</label>
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="text-end">
                        <div className="d-flex justify-content-between align-items-center me-5">
                          <div className="d-flex me-5">
                            <input
                              className="form-control text-center"
                              style={{
                                backgroundColor: "lightgrey",
                                width: "138px",
                              }}
                              type="number"
                              id="bonus"
                              onChange={(e) => setBonus(e.target.value)}
                              value={bonus}
                            />
                            <button
                              type="button"
                              className="btn btn-primary "
                              style={{ height: "38px" }}
                              data-mdb-ripple-init
                              onClick={handleAddBonus}
                              disabled={isBLoading}
                            >
                              <AddIcon />
                            </button>
                          </div>

                          <label htmlFor="bonus">مكافئات</label>
                        </div>
                      </ListGroup.Item>
                    </>
                  ) : (
                    <>
                      <ListGroup.Item className="text-end">
                        <div className="d-flex justify-content-between align-items-center me-5">
                          <div className="d-flex me-5">
                            <input
                              className="form-control border-0   text-center"
                              style={{
                                backgroundColor: "white",
                                width: "138px",
                              }}
                              type="number"
                              id="baseSalary"
                              disabled
                              value={baseSalary}
                            />
                          </div>

                          <label htmlFor="baseSalary">الراتب الأساسى</label>
                        </div>
                      </ListGroup.Item>

                      <ListGroup.Item className="text-end">
                        <div className="d-flex justify-content-between align-items-center me-5">
                          <div className="d-flex me-5">
                            <input
                              className="form-control border-0   text-center"
                              style={{
                                backgroundColor: "white",
                                width: "138px",
                              }}
                              type="number"
                              id="loans"
                              disabled
                              value={totalLoans}
                            />
                          </div>

                          <label htmlFor="loans">سلف</label>
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="text-end">
                        <div className="d-flex justify-content-between align-items-center me-5">
                          <div className="d-flex me-5">
                            <input
                              className="form-control border-0   text-center  "
                              style={{
                                backgroundColor: "white",
                                width: "138px",
                              }}
                              type="number"
                              id="deductions"
                              disabled
                              value={totalDeductions}
                            />
                          </div>

                          <label htmlFor="deductions">استقطاعات</label>
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="text-end">
                        <div className="d-flex justify-content-between align-items-center me-5">
                          <div className="d-flex me-5">
                            <input
                              className="form-control border-0   text-center  "
                              style={{
                                backgroundColor: "white",
                                width: "138px",
                              }}
                              type="number"
                              id="Compensation"
                              disabled
                              value={totalCompensations}
                            />
                          </div>

                          <label htmlFor="Compensation">بدلات</label>
                        </div>
                      </ListGroup.Item>
                      <ListGroup.Item className="text-end">
                        <div className="d-flex justify-content-between align-items-center me-5">
                          <div className="d-flex me-5">
                            <input
                              className="form-control border-0   text-center"
                              style={{
                                backgroundColor: "white",
                                width: "138px",
                              }}
                              type="number"
                              id="bonus"
                              value={totalBonuses}
                              disabled
                            />
                          </div>

                          <label htmlFor="bonus">مكافئات</label>
                        </div>
                      </ListGroup.Item>
                    </>
                  )}

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
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        className="border-0 me-5 text-center"
                        style={{ backgroundColor: "white" }}
                        type="number"
                        disabled
                        id="delayedSalary"
                        value={delayedSalary}
                      />

                      <label htmlFor="delayedSalary"> الراتب المرحل</label>
                    </div>
                  </ListGroup.Item>
                  <div className="d-flex justify-content-between mt-2">
                    <button className="btn btn-primary " style={{width:'300px'}} onClick={openModal}>
                      تصفية حساب الشهر
                    </button>
                    <button
                    style={{width:'300px'}}
                      className={`btn btn-${
                        enableEdit ? "secondary" : "primary"
                      } fs-6 p-1 `}
                      onClick={toggleUpdate}
                    >
                      {!enableEdit ? "تحديث حسابات الموظف" : "ألغاء التحديث"}
                    </button>
                  </div>
                  <hr />
                </>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {show && (
        <>
          <Row className="centered my-5">
            <h4 className="text-center">حسابات سابقة</h4>
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
                        <th scope="col">القيمة</th>
                        <th scope="col">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loans.map((item) => (
                        <tr key={item._id}>
                          <td>{item.amount}</td>
                          <td>{item.date.slice(0, 10)}</td>
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
                      {compensations.map((item) => (
                        <tr key={item._id}>
                          <td>{item.amount}</td>
                          <td>{item.date.slice(0, 10)}</td>
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
                      {bonuses.map((item) => (
                        <tr key={item._id}>
                          <td>{item.amount}</td>
                          <td>{item.date.slice(0, 10)}</td>
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
                      {deductions.map((item) => (
                        <tr key={item._id}>
                          <td>{item.amount}</td>
                          <td>{item.date.slice(0, 10)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </>
      )}
      <ResetSalary
        isOpen={isOpen}
        onClose={closeModal}
        id={id}
        name={name}
        loan={totalLoans}
        compensation={totalCompensations}
        deduction={totalDeductions}
        bonus={totalBonuses}
        baseSalary={baseSalary}
        totalSalary={totalSalary}
      />
    </Container>
  ) : (
    <Navigate to={"/"} />
  );
}
export default Accounting;
