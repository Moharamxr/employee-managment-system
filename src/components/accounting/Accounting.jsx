import { Card, Container, ListGroup, Tab, Tabs } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SearchIcon from "@mui/icons-material/Search";

import { useContext, useState } from "react";
import { getAllEmployeeById } from "../../services/employee.service";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ResetSalary from "./ResetSalary";
import UpdateFinancial from "./UpdateFinancial";
import { gState } from "../../context/Context";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react";

function Accounting() {
  const { id } = useParams();
  const [searchError, setSearchError] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const { setData } = useContext(gState);
  const empIDs = localStorage.getItem("empIDs");
  const [ID, setID] = useState("");
  const [name, setName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [ssn, setSsn] = useState("");
  const [phone, setPhone] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [cost, setCost] = useState("");
  const [daysWorked, setDaysWorked] = useState("");
  const [totalSalary, setTotalSalary] = useState("");
  const [delayedSalary, setDelayedSalary] = useState("");
  const [dailySalary, setDailySalary] = useState("");
  const [payments, setPayments] = useState([]);

  const [bonuses, setBonuses] = useState([]);
  const [totalBonuses, setTotalBonuses] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const [bankName, setBankName] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [payrollNumber, setPayrollNumber] = useState("");
  const [walletNumber, setWalletNumber] = useState("");
  const [walletName, setWalletName] = useState("");
  const [postalName, setPostalName] = useState("");
  const [postalNumber, setPostalNumber] = useState("");

  const [loans, setLoans] = useState([]);
  const [totalLoans, setTotalLoans] = useState("");

  const [deductions, setDeductions] = useState([]);
  const [totalDeductions, setTotalDeductions] = useState("");

  const [compensations, setCompensations] = useState([]);
  const [totalCompensations, setTotalCompensations] = useState("");

  const [isPageLoading, setIsPageLoading] = useState(false);

  const [show, setShow] = useState(false);

  const getEmployeeByID = async (id) => {
    if (id && id > 0 && empIDs.includes(parseInt(id, 10))) {
      setIsPageLoading(true);
      try {
        const data = await getAllEmployeeById(id);
        setShow(true);
        setIsPageLoading(false);
        setID(data.employee.id);
        setName(data.employee.name);
        setSsn(data.employee.ssn);
        setJobRole(data.employee.jobRole);
        setPhone(data.employee.phone);
        setBaseSalary(data.employee.baseSalary);

        setCost(data.cost);

        setPostalNumber(data.employee.paymentMethodDetails.postal.ssn);
        setPostalName(data.employee.paymentMethodDetails.postal.name);
        setBankName(data.employee.paymentMethodDetails.bank.bankName);
        setBankNumber(data.employee.paymentMethodDetails.bank.accountNumber);
        setPayrollNumber(
          data.employee.paymentMethodDetails.payroll.accountNumber
        );
        setWalletNumber(data.employee.paymentMethodDetails.wallet.phoneNumber);
        setWalletName(data.employee.paymentMethodDetails.wallet.walletName);

        setDaysWorked(data.employee.daysWorked);
        setWorkAddress(data.employee.workAddress);
        setTotalSalary(data.employee.totalSalary);
        setDelayedSalary(data.employee.delayedSalary);
        setDailySalary(data.employee.dailySalary);
        setPayments(data.employee.payments.reverse());
        setPaymentMethod(data.employee.paymentMethod);

        setBonuses(data.employee.bonuses.bonusesDetails.reverse());
        setLoans(data.employee.loans.loansDetails.reverse());
        setDeductions(data.employee.deductions.deductionsDetails.reverse());
        setCompensations(
          data.employee.compensations.compensationsDetails.reverse()
        );

        setTotalBonuses(data.employee.bonuses.totalBonuses);
        setTotalLoans(data.employee.loans.totalLoans);
        setTotalDeductions(data.employee.deductions.totalDeductions);
        setTotalCompensations(data.employee.compensations.totalCompensations);

        await setData((prevState) => {
          return {
            ...prevState,
            baseSalary: data.employee.baseSalary,
          };
        });
      } catch (error) {
        setIsPageLoading(false);
        setSearchError(true);
        setSearchLoading(false);
        setShow(false);
        const timeout = setTimeout(() => {
          setSearchError(false);
        }, 3000);

        return () => clearTimeout(timeout);
      }
      setIsPageLoading(false);
    } else {
      setIsPageLoading(false);
      setSearchError(true);
      setSearchLoading(false);
      setShow(false);
      const timeout = setTimeout(() => {
        setSearchError(false);
      }, 3000);
      setIsPageLoading(false);
      return () => clearTimeout(timeout);
    }
    setIsPageLoading(false);
  };
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchId && searchId > 0 && empIDs.includes(parseInt(searchId, 10))) {
      navigate(`/accounting/${searchId}`);
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

  const isSecretary = localStorage.getItem("role") === "secretary";

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    getEmployeeByID(id);
  };

  const [isUpdating, setIsUpdating] = useState(false);
  const enableUpdate = () => {
    setIsUpdating(true);
  };

  const disableUpdate = () => {
    setIsUpdating(false);
    getEmployeeByID(id);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    if (id && id > 0 && empIDs.includes(parseInt(id, 10))) {
      getEmployeeByID(id);
    }
  }, [id]);

  return !isSecretary ? (
    <Container>
      <Row className="centered">
        <Col sm={7} className="bg-">
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
                  disabled={searchLoading}
                >
                  {searchLoading ? "جارى البحث" : <SearchIcon />}
                </button>
                <div className="form-outline">
                  <input
                    type="number"
                    id="form1"
                    className="form-control text-center"
                    placeholder="ابحث بكود الموظف"
                    style={{ width: "auto" }}
                    onChange={(e) => setSearchId(e.target.value)}
                    autoComplete="off"
                    onKeyDown={handleKeyPress}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Card className="text-end border-0 ">
            <ListGroup variant="flush">
              <div className="centered">
                {" "}
                {isPageLoading && <CircularProgress />}
              </div>
              {show && !isPageLoading && (
                <>
                  <ListGroup.Item className="text-end">
                    <h4 className="text-center">حسابات الموظف </h4>
                  </ListGroup.Item>

                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        className="form-control  border-0  text-center"
                        style={{ backgroundColor: "white", width: "280px" }}
                        type="text"
                        disabled
                        id="empID"
                        value={ID}
                      />
                      <label htmlFor="empId">كود الموظف</label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        className="form-control  border-0  text-center"
                        style={{ backgroundColor: "white", width: "270px" }}
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
                        className="form-control  border-0  text-center"
                        style={{ backgroundColor: "white", width: "280px" }}
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
                        className="form-control  border-0  text-center"
                        style={{ backgroundColor: "white", width: "280px" }}
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
                        className="form-control  border-0  text-center"
                        style={{ backgroundColor: "white", width: "280px" }}
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
                        className="form-control  border-0  text-center"
                        style={{ backgroundColor: "white", width: "280px" }}
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
                        <input
                          className="form-control border-0   text-center"
                          style={{
                            backgroundColor: "white",
                            width: "280px",
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
                            width: "280px",
                          }}
                          type="number"
                          id="dailySalary"
                          disabled
                          value={dailySalary}
                        />
                      </div>

                      <label htmlFor="dailySalary">الراتب اليومى</label>
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <div className="d-flex me-5">
                        <input
                          className="form-control border-0   text-center"
                          style={{
                            backgroundColor: "white",
                            width: "280px",
                          }}
                          type="number"
                          id="cost"
                          disabled
                          value={cost}
                        />
                      </div>

                      <label htmlFor="cost">التكلفة</label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <div className="d-flex me-5">
                        <input
                          className="form-control border-0   text-center"
                          style={{
                            backgroundColor: "white",
                            width: "280px",
                          }}
                          type="number"
                          id="daysWorked"
                          disabled
                          value={daysWorked}
                        />
                      </div>

                      <label htmlFor="daysWorked">ايام العمل</label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        className="border-0 me-5 text-center"
                        style={{ backgroundColor: "white", width: "280px" }}
                        type="text"
                        disabled
                        id="paymentMethod"
                        value={
                          (paymentMethod === "bank" && "تحويل بنكى") ||
                          (paymentMethod === "payroll" && "payroll") ||
                          (paymentMethod === "postal" && "بريد") ||
                          (paymentMethod === "wallet" && "محفظة إلكترونية") ||
                          (paymentMethod === "cash" && "كاش ")
                        }
                      />

                      <label htmlFor="paymentMethod"> طريقة الدفع </label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <div className="d-flex me-5">
                        <input
                          className="form-control border-0   text-center"
                          style={{
                            backgroundColor: "white",
                            width: "280px",
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
                            width: "280px",
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
                            width: "280px",
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
                            width: "280px",
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
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        className="border-0 me-5 text-center"
                        style={{ backgroundColor: "white", width: "280px" }}
                        type="number"
                        disabled
                        id="delayedSalary"
                        value={delayedSalary}
                      />

                      <label htmlFor="delayedSalary"> الراتب المرحل</label>
                    </div>
                  </ListGroup.Item>
                  
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        className=" form-control border-0  text-center"
                        style={{ backgroundColor: "white", width: "280px" }}
                        type="text"
                        disabled
                        id="salary"
                        value={totalSalary}
                      />

                      <label htmlFor="salary">صافى اجمالى الراتب</label>
                    </div>
                  </ListGroup.Item>

                  <div className="d-flex justify-content-between mt-4">
                    <button
                      className="btn btn-primary me-2"
                      style={{ width: "250px" }}
                      onClick={openModal}
                    >
                      تصفية حساب الشهر
                    </button>
                    <button
                      style={{ width: "250px" }}
                      className={`btn btn-primary fs-6 p-1  `}
                      onClick={enableUpdate}
                    >
                      تحديث حسابات الموظف
                    </button>
                  </div>
                </>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {show && !isPageLoading && (
        <>
          <Row className="centered my-5">
            <h4 className="text-center">حسابات سابقة</h4>
            <Col sm={9}>
              <Tabs
                defaultActiveKey="Loans"
                id="fill-tab-example"
                className="mb-3"
                justify
              >
                <Tab eventKey="Loans" title="سلف">
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">ملاحظة</th>
                        <th scope="col">القيمة</th>
                        <th scope="col">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loans.map((item) => (
                        <tr key={item._id}>
                          <td>{item.description}</td>
                          <td>{item.amount.toFixed(2)}</td>
                          <td>{item.date.slice(0, 10)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Tab>
                <Tab eventKey="Exchanges" title="بدلات">
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">ملاحظة</th>
                        <th scope="col">القيمة</th>
                        <th scope="col">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {compensations.map((item) => (
                        <tr key={item._id}>
                          <td>{item.description}</td>
                          <td>{item.amount.toFixed(2)}</td>
                          <td>{item.date.slice(0, 10)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Tab>
                <Tab eventKey="bonus" title="مكافئات">
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">ملاحظة</th>
                        <th scope="col">القيمة</th>
                        <th scope="col">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bonuses.map((item) => (
                        <tr key={item._id}>
                          <td>{item.description}</td>
                          <td>{item.amount.toFixed(2)}</td>
                          <td>{item.date.slice(0, 10)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Tab>
                <Tab eventKey="Deductions" title="استقطاعات">
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">ملاحظة</th>
                        <th scope="col">القيمة</th>
                        <th scope="col">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {deductions.map((item) => (
                        <tr key={item._id}>
                          <td>{item.description}</td>
                          <td>{item.amount.toFixed(2)}</td>
                          <td>{item.date.slice(0, 10)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Tab>
                <Tab eventKey="payments" title="رواتب سابقة">
                  <table className="table text-center">
                    <thead>
                      <tr>
                        <th scope="col">إجمالى نقد الشهر </th>
                        <th scope="col"> طريقة الدفع </th>
                        <th scope="col">صافى أيام العمل </th>
                        <th scope="col"> أيام مخصومة </th>
                        <th scope="col"> أيام مكافئة </th>
                        <th scope="col"> أيام العمل </th>

                        <th scope="col">التاريخ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((item) => (
                        <tr key={item._id}>
                          <td>{item.payedAmount.toFixed(2)}</td>
                          <td>{item.paymentMethod}</td>
                          <td>
                            {item.daysWorked -
                              item.deductionDays +
                              item.bonusDays}
                          </td>
                          <td>{item.deductionDays}</td>
                          <td>{item.bonusDays}</td>
                          <td>{item.daysWorked}</td>
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
        paymentMethod={paymentMethod}
        bankNumber={bankNumber}
        bankName={bankName}
        postalName={postalName}
        postalNumber={postalNumber}
        walletName={walletName}
        walletNumber={walletNumber}
        payrollNumber={payrollNumber}
      />
      <UpdateFinancial
        isOpen={isUpdating}
        onClose={disableUpdate}
        id={id}
        name={name}
        baseSalary={baseSalary}
        totalSalary={totalSalary}
        jobRole={jobRole}
        ssn={ssn}
        phone={phone}
        workAddress={workAddress}
        getData={getEmployeeByID}
      />
    </Container>
  ) : (
    <Navigate to={"/"} />
  );
}
export default Accounting;
