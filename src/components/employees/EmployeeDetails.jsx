import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../services/employee.service";
import { useCallback } from "react";

const EmployeeDetails = () => {
  const { id } = useParams();

  const [enableEdit, setEnableEdit] = useState(false);

  const [name, setName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [ssn, setSsn] = useState("");
  const [phone, setPhone] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [bankName, setBankName] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [payrollNumber, setPayrollNumber] = useState("");
  const [walletNumber, setWalletNumber] = useState("");
  const [postalName, setPostalName] = useState("");
  const [postalNumber, setPostalNumber] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const toggleUpdate = () => {
    setEnableEdit(!enableEdit);
    getEmployeeByID(id);
    
  };

  const getEmployeeByID = useCallback(
    async (id) => {
      try {
        const data = await getEmployeeById(id);

        setName(data.employee.name);
        setSsn(data.employee.ssn);
        setJobRole(data.employee.jobRole);
        setPhone(data.employee.phone);

        setWorkAddress(data.employee.workAddress);

        setPaymentMethod(data.employee.paymentMethod);
        if (data.employee.bankAccount) {
          setBankNumber(data.employee.bankAccount);
        }
      } catch (error) {
        navigate("/");
      }
    },
    [navigate]
  );

  useEffect(() => {
    getEmployeeByID(id);
  }, [id, getEmployeeByID]);

  const handleUpdateEmp = async () => {
    const newData = {
      id: id,
      name: name,
      jobRole: jobRole,

      phone: phone,
      workAddress: workAddress,

      paymentMethod: paymentMethod,
    };
    if (paymentMethod === "bank") {
      newData.bankName = bankName;
      newData.bankAccount = bankNumber;
    }
    if (paymentMethod === "postal") {
      newData.postalName = postalName;
      newData.postalNumber = postalNumber;
    }
    if (paymentMethod === "wallet") {
      newData.walletNumber = walletNumber;
    }
    if (paymentMethod === "payroll") {
      newData.payrollNumber = payrollNumber;
    }

    if (
      id !== "" &&
      name !== "" &&
      jobRole !== "" &&
      phone !== "" &&
      phone.length === 11 &&
      workAddress !== "" &&
      paymentMethod !== ""
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
                    className="form-control w-50 border-0 form-control w-50  text-center"
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
                    className="border-0 form-control w-50  text-center"
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
                      <option value="ضابط ثاني">ظابط تانى</option>
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
                      className="border-0 form-control w-50  text-center"
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
                      className="border-0 form-control w-50  text-center"
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
                    className="border-0 form-control w-50  text-center"
                    style={{
                      backgroundColor: "white ",
                    }}
                    type="number"
                    disabled
                    id="empNaID"
                    value={ssn}
                  />

                  <label htmlFor="empNaID">رقم البطاقة</label>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  <input
                    autoComplete="off"
                    className="border-0 form-control w-50  text-center"
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
              {paymentMethod === "bank" && (
                <>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        autoComplete="off"
                        className="border-0 form-control w-50  text-center"
                        style={{
                          backgroundColor: `${
                            enableEdit ? "gainsboro" : "white "
                          }`,
                        }}
                        type="number"
                        disabled={!enableEdit}
                        id="bankNumber"
                        value={bankNumber}
                        onChange={(e) => setBankNumber(e.target.value)}
                      />

                      <label htmlFor="bankNumber">الحساب البنكى</label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        autoComplete="off"
                        className="border-0 form-control w-50  text-center"
                        style={{
                          backgroundColor: `${
                            enableEdit ? "gainsboro" : "white "
                          }`,
                        }}
                        type="text"
                        disabled={!enableEdit}
                        id="bankName"
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                      />

                      <label htmlFor="bankName">اسم البنك</label>
                    </div>
                  </ListGroup.Item>
                </>
              )}
              {paymentMethod === "postal" && (
                <>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        autoComplete="off"
                        className="border-0 form-control w-50  text-center"
                        style={{
                          backgroundColor: `${
                            enableEdit ? "gainsboro" : "white "
                          }`,
                        }}
                        type="number"
                        disabled={!enableEdit}
                        id="postalNumber"
                        value={postalNumber}
                        onChange={(e) => setPostalNumber(e.target.value)}
                      />

                      <label htmlFor="postalNumber">رقم تحوبل البريد</label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        autoComplete="off"
                        className="border-0 form-control w-50  text-center"
                        style={{
                          backgroundColor: `${
                            enableEdit ? "gainsboro" : "white "
                          }`,
                        }}
                        type="text"
                        disabled={!enableEdit}
                        id="postalName"
                        value={postalName}
                        onChange={(e) => setPostalName(e.target.value)}
                      />

                      <label htmlFor="postalName">اسم المرسل إليه</label>
                    </div>
                  </ListGroup.Item>
                </>
              )}
              {paymentMethod === "payroll" && (
                <>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        autoComplete="off"
                        className="border-0 form-control w-50  text-center"
                        style={{
                          backgroundColor: `${
                            enableEdit ? "gainsboro" : "white "
                          }`,
                        }}
                        type="number"
                        disabled={!enableEdit}
                        id="payrollNumber"
                        value={payrollNumber}
                        onChange={(e) => setPayrollNumber(e.target.value)}
                      />

                      <label htmlFor="payrollNumber">رقم الحساب البنكى</label>
                    </div>
                  </ListGroup.Item>
                </>
              )}
              {paymentMethod === "wallet" && (
                <>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        autoComplete="off"
                        className="border-0 form-control w-50  text-center"
                        style={{
                          backgroundColor: `${
                            enableEdit ? "gainsboro" : "white "
                          }`,
                        }}
                        type="number"
                        disabled={!enableEdit}
                        id="walletNumber"
                        value={walletNumber}
                        onChange={(e) => setWalletNumber(e.target.value)}
                      />
                      <label htmlFor="walletNumber">رقم المحفظة </label>
                    </div>
                  </ListGroup.Item>
                </>
              )}
              <ListGroup.Item className="text-end">
                <div className="d-flex justify-content-between align-items-center me-5">
                  {enableEdit ? (
                    <Form.Select
                      size="sm"
                      className="w-50 float-start me-5 text-end bg-body-secondary"
                      name="paymentMethod"
                      id="paymentMethod"
                      value={paymentMethod}
                      onChange={(e) => {
                        const selectedPaymentMethod = e.target.value;
                        setPaymentMethod(selectedPaymentMethod);
                      }}
                    >
                      <option value="cash">كاش</option>
                      <option value="bank">حساب بنكى</option>
                      <option value="payroll">payroll</option>
                      <option value="wallet">فودافون كاش</option>
                      <option value="postal">بريد</option>
                    </Form.Select>
                  ) : (
                    <input
                      autoComplete="off"
                      className="border-0 form-control w-50  text-center"
                      style={{
                        backgroundColor: "white ",
                      }}
                      type="text"
                      disabled
                      id="paymentMethod"
                      value={paymentMethod}
                    />
                  )}
                  <label htmlFor="paymentMethod"> طريقة القبض</label>
                </div>
              </ListGroup.Item>
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
    </Container>
  );
};

export default EmployeeDetails;
