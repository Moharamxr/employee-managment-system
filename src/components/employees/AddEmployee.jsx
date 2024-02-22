import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { addEmployee } from "../../services/employee.service";

const AddEmployee = ({ isOpen, onClose, empIDs }) => {
  const [name, setName] = useState("");
  const [newID, setNewID] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [ssn, setSsn] = useState("");
  const [phone, setPhone] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [bankName, setBankName] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [payrollNumber, setPayrollNumber] = useState("");
  const [walletNumber, setWalletNumber] = useState("");
  const [postalName, setPostalName] = useState("");
  const [postalNumber, setPostalNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setError("");
    setNewID("");
    setName("");
    setJobRole("");
    setSsn("");
    setPhone("");
    setWorkAddress("");
    setBaseSalary("");
  };

  const handleAddEmp = async () => {
    const newData = {
      id: newID,
      name: name,
      jobRole: jobRole,
      ssn: ssn,
      phone: phone,
      workAddress: workAddress,
      baseSalary: baseSalary,
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
    console.log("isEmp", !empIDs.includes(parseInt(newID, 10)));
    if (
      !empIDs.includes(parseInt(newID, 10)) &&
      newID.length >= 3 &&
      name !== "" &&
      jobRole !== "" &&
      ssn !== "" &&
      ssn.length === 14 &&
      phone !== "" &&
      phone.length === 11 &&
      workAddress !== "" &&
      baseSalary !== ""
    ) {
      setError("");
      setIsLoading(true);
      try {
        await addEmployee(newData);
        reset();
        onClose();
        setIsLoading(false);
      } catch (error) {
        setError("حدث خطأ أثناء إضافة الموظف.");
        setIsLoading(false);
        const timeout = setTimeout(() => {
          setError("");
        }, 3000);

        return () => clearTimeout(timeout);
      }
      setIsLoading(false);
    } else {
      setError("تأكد من صحة البيانات الموظف مجداا");
      console.log("else");
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timeout);
    }
    reset();
  };

  return (
    <>
      {isOpen && (
        <div
          className="modal-backdrop show z-6 w-100 h-100"
          style={{ zIndex: 1210 }}
        ></div>
      )}
      <div
        key="createPostModal"
        className={`modal  fade${isOpen ? " show d-block" : ""}`}
        tabIndex="-1"
        style={{ display: isOpen ? "block" : "none", zIndex: 12500 }}
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ direction: "rtl", textAlign: "right" }}
            >
              <h5 className="modal-title" id="exampleModalLabel">
                أضافة موظف جديد
              </h5>
            </div>

            <div className="modal-body">
              {error && <p className="text-center text-danger">{error}</p>}
              <div className="mb-3">
                <Row>
                  <Col sm={6}>
                    <div className="form-group text-end">
                      <label htmlFor="name">أسم الموظف</label>
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        name="textMessage"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="form-group text-end">
                      <label htmlFor="setNewID">كود الموظف</label>
                      <input
                        autoComplete="off"
                        type="number"
                        className="form-control"
                        name="setNewID"
                        id="setNewID"
                        value={newID}
                        onChange={(e) => setNewID(e.target.value)}
                        required
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <div className="form-group text-end">
                      <label htmlFor="workAddress">مكان العمل</label>
                      <Form.Select
                        className="form-control"
                        name="workAddress"
                        id="workAddress"
                        value={workAddress} // Set the value from the state
                        onChange={(e) => setWorkAddress(e.target.value)} // Handle the onChange event
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
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="form-group text-end">
                      <label htmlFor="job">الوظيفة</label>
                      <Form.Select
                        className="form-control"
                        name="job"
                        id="job"
                        value={jobRole} // Set the value from the state
                        onChange={(e) => setJobRole(e.target.value)} // Handle the onChange event
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
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col sm={6}>
                    <div className="form-group text-end">
                      <label htmlFor="naID">رقم البطاقة</label>
                      <input
                        autoComplete="off"
                        type="number"
                        className="form-control"
                        name="textMessage"
                        id="naID"
                        onChange={(e) => setSsn(e.target.value)}
                        value={ssn}
                      />
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="form-group text-end">
                      <label htmlFor="phone">رقم الهاتف</label>
                      <input
                        autoComplete="off"
                        type="number"
                        className="form-control"
                        name="textMessage"
                        id="phone"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <div className="form-group text-end">
                      <label htmlFor="job">طريقة صرف الراتب</label>
                      <Form.Select
                        className="form-control"
                        name="job"
                        id="job"
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
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="form-group text-end">
                      <label htmlFor="salary">الراتب الأساسى</label>
                      <input
                        autoComplete="off"
                        type="number"
                        className="form-control"
                        name="textMessage"
                        id="salary"
                        value={baseSalary}
                        onChange={(e) => setBaseSalary(e.target.value)}
                        required
                      />
                    </div>
                  </Col>
                </Row>
                {paymentMethod === "bank" && (
                  <Row>
                    <Col sm={6}>
                      <div className="form-group text-end">
                        <label htmlFor="bankNumber">رقم الحساب البنكى</label>
                        <input
                          autoComplete="off"
                          type="text"
                          className="form-control"
                          name="textMessage"
                          id="bankNumber"
                          value={bankNumber}
                          onChange={(e) => setBankNumber(e.target.value)}
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="form-group text-end">
                        <label htmlFor="bankName">اسم البنك</label>
                        <input
                          autoComplete="off"
                          type="text"
                          className="form-control"
                          name="textMessage"
                          id="bankName"
                          value={bankName}
                          onChange={(e) => setBankName(e.target.value)}
                        />
                      </div>
                    </Col>
                  </Row>
                )}
                {paymentMethod === "payroll" && (
                  <Row>
                    <Col >
                      <div className="form-group text-end">
                        <label htmlFor="payrollNumber">رقم الحساب البنكى</label>
                        <input
                          autoComplete="off"
                          type="text"
                          className="form-control"
                          name="textMessage"
                          id="payrollNumber"
                          value={payrollNumber}
                          onChange={(e) => setPayrollNumber(e.target.value)}
                        />
                      </div>
                    </Col>
                  </Row>
                )}
                {paymentMethod === "postal" && (
                  <Row>
                    <Col sm={6}>
                      <div className="form-group text-end">
                        <label htmlFor="postalNumber">رقم تحوبل البريد</label>
                        <input
                          autoComplete="off"
                          type="text"
                          className="form-control"
                          name="textMessage"
                          id="postalNumber"
                          value={postalNumber}
                          onChange={(e) => setPostalNumber(e.target.value)}
                        />
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="form-group text-end">
                        <label htmlFor="postalName">اسم المرسل إليه</label>
                        <input
                          autoComplete="off"
                          type="text"
                          className="form-control"
                          name="textMessage"
                          id="postalName"
                          value={postalName}
                          onChange={(e) => setPostalName(e.target.value)}
                        />
                      </div>
                    </Col>
                  </Row>
                )}
                {paymentMethod === "wallet" && (
                  <Row>
                    <Col >
                      <div className="form-group text-end">
                        <label htmlFor="walletNumber">رقم المحفظة </label>
                        <input
                          autoComplete="off"
                          type="text"
                          className="form-control"
                          name="textMessage"
                          id="walletNumber"
                          value={walletNumber}
                          onChange={(e) => setWalletNumber(e.target.value)}
                        />
                      </div>
                    </Col>
                    
                  </Row>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary text-light"
                onClick={handleAddEmp}
              >
                {!isLoading ? "أضافة" : "...جارى أضافة موظف جديد"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  onClose();
                  reset();
                }}
              >
                أغلاق
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
