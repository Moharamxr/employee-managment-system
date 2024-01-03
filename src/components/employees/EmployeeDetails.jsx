import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
import {
  getEmployeeById,
  updateEmployee,
} from "../../services/employee.service";

const EmployeeDetails = () => {
  const { id } = useParams();

  const data = [
    { id: 1, first: "Mark", last: "Otto", handle: "012121124242" },
    { id: 2, first: "Jacob", last: "Thornton", handle: "@fat" },
    { id: 3, first: "Larry the Bird", last: "dada", handle: "@twitter" },
  ];

  const [enableEdit, setEnableEdit] = useState(false);

 const [name, setName] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [ssn, setSsn] = useState(0);
  const [phone, setPhone] = useState(0);
  const [workAddress, setWorkAddress] = useState('');
  const [baseSalary, setBaseSalary] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
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
    } catch (error) {
      
    }
   
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
      baseSalary: baseSalary,
    };
    console.log(newData);
    if (
      id !== "" &&
      name !== "" &&
      jobRole !== "" &&
      ssn !== "" &&
      phone !== "" &&
      workAddress !== "" &&
      baseSalary !== ""
    ) {
      setError("");
      setIsLoading(true);
      try {
        await updateEmployee(newData);
        
        setIsLoading(false);
      } catch (error) {
        setError("حدث خطأ أثناء تحديث الموظف.");
        setIsLoading(false);
        const timeout = setTimeout(() => {
          setError("");
        }, 3000);

        return () => clearTimeout(timeout);
      }
      setIsLoading(false);
    } else {
      setError("حدث خطأ أثناء تحديث الموظف.");
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
                      <option value="قبطان">قبطان</option>
                      <option value="ضابط أول">ضابط أول</option>
                      <option value="مساعد">مساعد</option>
                    </Form.Select>
                  ) : (
                    <input
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
                      onChange={(e) => setWorkAddress(e.target.value)} // Handle the onChange event
                    >
                      <option value="">اختر مكان العمل</option>
                      <option value="سى بريز 9">سى بريز 9</option>
                      <option value="سى بريز 3">سى بريز 3 </option>
                      <option value="سى بريز 1">سى بريز 1</option>
                    </Form.Select>
                  ) : (
                    <input
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
                    className="border-0 form-control w-50  text-end"
                    style={{
                      backgroundColor: `${enableEdit ? "gainsboro" : "white "}`,
                    }}
                    type="number"
                    disabled={!enableEdit}
                    id="empNaID"
                    value={ssn}
                  />

                  <label htmlFor="empNaID">رقم البطاقة</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <input
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
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <input
                    className="border-0 form-control w-50  text-end"
                    style={{
                      backgroundColor: `${enableEdit ? "gainsboro" : "white "}`,
                    }}
                    type="text"
                    disabled={!enableEdit}
                    id="baseSalary"
                    value={baseSalary}
                  />

                  <label htmlFor="baseSalary">الراتب الأساسى</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <input
                    className="form-control w-50 border-0 text-end"
                    style={{ backgroundColor: "white" }}
                    type="text"
                    disabled
                    id="salary"
                    value={totalSalary}
                  />

                  <label htmlFor="salary">صافى اجمالى الراتب</label>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
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

      <Row className="centered my-5">
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
};

export default EmployeeDetails;
