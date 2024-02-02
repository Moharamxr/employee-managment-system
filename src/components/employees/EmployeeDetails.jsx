import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../services/employee.service";

const EmployeeDetails = () => {
  const { id } = useParams();

  const [enableEdit, setEnableEdit] = useState(false);

  const [name, setName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [ssn, setSsn] = useState("");
  const [phone, setPhone] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [totalSalary, setTotalSalary] = useState("");

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

  const navigate = useNavigate();
  const toggleUpdate = () => {
    setEnableEdit(!enableEdit);
    getEmployeeByID(id);
  };
  const getEmployeeByID = async (id) => {
    try {
      const data = await getEmployeeById(id);

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
    } catch (error) {}
  };

  useEffect(() => {
    getEmployeeByID(id);
  }, [id]);

  const handleUpdateEmp = async () => {
    const newData = {
      id: id,
      name: name,
      jobRole: jobRole,
      ssn: ssn,
      phone: phone,
      workAddress: workAddress,
    };
    console.log(newData);

    if (
      id !== "" &&
      name !== "" &&
      jobRole !== "" &&
      ssn !== "" &&
      ssn.length === 14 &&
      phone !== "" &&
      phone.length === 11 &&
      workAddress !== ""
    ) {
      setIsLoading(true);

      try {
        await updateEmployee(newData);
        toggleUpdate();
        setIsLoading(false);
      } catch (error) {
        setError("تأكد من صحة البيانات, حاول مجدداً");
        setIsLoading(false);
        const timeout = setTimeout(() => {
          setError("");
        }, 3000);

        return () => clearTimeout(timeout);
      }
    } else {
      setError("تأكد من صحة البيانات, حاول مجدداً");
      console.log("else");
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  };

  const handleDeleteEmp = async () => {
    const decision = window.confirm("هل متأكد أنك تريد حذف هذا الموظف؟");

    if (decision) {
      alert("لقد تم حذف الموظف");
      await deleteEmployee(id);
      navigate("/");
    }
  };

  return (
    <Container>
      <Row className="centered">
        <Col sm={6}>
          <Card className="text-end border-0">
            <ListGroup variant="flush">
              <ListGroup.Item className="text-end">
                <h5 className="text-center">بيانات الموظف</h5>
                {error && <p className="text-center text-danger">{error}</p>}
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <input
                    autoComplete="off"
                    className="form-control w-50 border-0 form-control w-50  text-end"
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
                    autoComplete="off"
                    className="border-0 form-control w-50  text-end"
                    style={{
                      backgroundColor: `${enableEdit ? "gainsboro" : "white "}`,
                    }}
                    type="text"
                    disabled={!enableEdit}
                    id="empName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <label htmlFor="empName">أسم الموظف</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  {enableEdit ? (
                    <Form.Select
                      size="sm"
                      className="w-50 float-start me-5 text-end bg-body-secondary"
                      name="empJob"
                      id="empJob"
                      value={jobRole}
                      onChange={(e) => setJobRole(e.target.value)}
                    >
                      <option value="">اختر وظيفة</option>

                      <option value="ضابط أول">ضابط أول</option>
                      <option value="قبطان">ظابط تانى</option>
                      <option value="ريس بحرى">ريس بحرى</option>
                      <option value="بحرى">بحرى</option>
                      <option value="ميكانيكى">ميكانيكى</option>
                      <option value="مساعد ميكانيكى">مساعد ميكانيكى</option>
                      <option value="طباخ">طباخ</option>
                      <option value="صيانات">صيانات</option>
                      <option value="ربان">ربان</option>
                      <option value="مندوب">مندوب</option>
                      <option value="فنى كهرباء">فنى كهرباء</option>
                      <option value="مهندس"> مهندس</option>
                      <option value="مساعد مهندس">مساعد مهندس</option>
                    </Form.Select>
                  ) : (
                    <input
                      autoComplete="off"
                      className="border-0 form-control w-50  text-end"
                      style={{
                        backgroundColor: "white ",
                      }}
                      type="text"
                      disabled
                      id="empJob"
                      value={jobRole}
                    />
                  )}
                  <label htmlFor="empJob"> الوظيفة</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  {enableEdit ? (
                    <Form.Select
                      size="sm"
                      className="w-50 float-start me-5 text-end bg-body-secondary"
                      name="workAddress"
                      id="workAddress"
                      value={workAddress}
                      onChange={(e) => setWorkAddress(e.target.value)}
                    >
                      <option value="">اختر مكان العمل</option>
                      <option value="SeaBreeze 1">SeaBreeze 1</option>
                      <option value="SeaBreeze 7">SeaBreeze 7</option>
                      <option value="SeaBreeze 9">SeaBreeze 9</option>
                      <option value="SeaBreeze 18">SeaBreeze 18</option>
                      <option value="SeaBreeze 22">SeaBreeze 22</option>
                      <option value="SeaBreeze 39">SeaBreeze 39</option>
                      <option value="SeaBreeze 55">SeaBreeze 55</option>
                      <option value="NAPHT">NAPHT</option>
                      <option value="NAPHT 7">NAPHT 7</option>
                    </Form.Select>
                  ) : (
                    <input
                      autoComplete="off"
                      className="border-0 form-control w-50  text-end"
                      style={{
                        backgroundColor: "white ",
                      }}
                      type="text"
                      disabled
                      id="workAddress"
                      value={workAddress}
                    />
                  )}
                  <label htmlFor="workAddress">مكان العمل</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <input
                    autoComplete="off"
                    className="border-0 form-control w-50  text-end"
                    style={{
                      backgroundColor: `${enableEdit ? "gainsboro" : "white "}`,
                    }}
                    type="number"
                    disabled={!enableEdit}
                    id="empNaID"
                    value={ssn}
                    onChange={(e) => setSsn(e.target.value)}
                  />

                  <label htmlFor="empNaID">رقم البطاقة</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <input
                    autoComplete="off"
                    className="border-0 form-control w-50  text-end"
                    style={{
                      backgroundColor: `${enableEdit ? "gainsboro" : "white "}`,
                    }}
                    type="number"
                    disabled={!enableEdit}
                    id="empPhone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />

                  <label htmlFor="empPhone">رقم الهاتف</label>
                </div>
              </ListGroup.Item>
              {/* <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <input
                  autoComplete="off"
                    className="border-0 form-control w-50  text-end"
                    style={{
                      backgroundColor: "white ",
                    }}
                    type="number"
                    disabled
                    id="baseSalary"
                    value={baseSalary}
                  />

                  <label htmlFor="baseSalary">الراتب الأساسى</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <input
                  autoComplete="off"
                    className="form-control w-50 border-0 text-end"
                    style={{ backgroundColor: "white" }}
                    type="text"
                    disabled
                    id="salary"
                    value={totalSalary}
                  />

                  <label htmlFor="salary">صافى اجمالى الراتب</label>
                </div>
              </ListGroup.Item> */}
            </ListGroup>
          </Card>
          <button
            className={`btn btn-${"danger"} float-end ms-1`}
            onClick={handleDeleteEmp}
          >
            حذف الموظف
          </button>
          <button
            className={`btn btn-${
              enableEdit ? "secondary" : "primary"
            } float-end`}
            onClick={toggleUpdate}
          >
            {!enableEdit ? "تحديث البيانات" : "إلغاء"}{" "}
          </button>
          {enableEdit && (
            <button
              className="btn btn-success float-start"
              onClick={handleUpdateEmp}
            >
              {isLoading ? "جارى تحديث البيانات" : "تأكيد التحديث"}{" "}
            </button>
          )}
        </Col>
      </Row>

      {/* <Row className="centered my-5">
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
                      <td></td>
                      <td>{item.amount}</td>
                      <td>{item.date.slice(0, 10)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>{totalLoans}</td>
                    <td></td>
                    <td></td>
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
                      <td></td>
                      <td>{item.amount}</td>
                      <td>{item.date.slice(0, 10)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>{totalCompensations}</td>
                    <td></td>
                    <td></td>
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
                      <td></td>
                      <td>{item.amount}</td>
                      <td>{item.date.slice(0, 10)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>{totalBonuses}</td>
                    <td></td>
                    <td></td>
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
                      <td></td>
                      <td>{item.amount}</td>
                      <td>{item.date.slice(0, 10)}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>{totalDeductions}</td>
                    <td>{}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </Tab>
          </Tabs>
        </Col>
      </Row> */}
    </Container>
  );
};

export default EmployeeDetails;
