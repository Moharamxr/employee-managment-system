import React, { useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { addEmployee } from "../../services/employee.service";

const AddEmployee = ({ isOpen, onClose, prevID }) => {
  const id = prevID + 1;
  const [name, setName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [ssn, setSsn] = useState(0);
  const [phone, setPhone] = useState(0);
  const [workAddress, setWorkAddress] = useState("");
  const [baseSalary, setBaseSalary] = useState(0);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const reset = () => {
    setError("");
    setName("");
    setJobRole("");
    setSsn("");
    setPhone("");
    setWorkAddress("");
    setBaseSalary("");
  };
  
  const handleAddEmp = async () => {
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
      ssn.length === 14 &&
      phone !== "" &&
      phone.length === 11 &&
      workAddress !== "" &&
      baseSalary !== ""
    ) {
      setError("");
      setIsLoading(true);
      try {
        console.log("first")
        await addEmployee(newData);
        setError("");
        setName("");
        setJobRole("");
        setSsn("");
        setPhone("");
        setWorkAddress("");
        setBaseSalary("");
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
      setError("حدث خطأ أثناء إضافة الموظف");
      console.log("else")
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
                        type="text"
                        className="form-control"
                        name="textMessage"
                        id="name"
                        onChange={(e) => setName(e.target.value)}
                      />
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
                        <option value="قبطان">قبطان</option>
                        <option value="ضابط أول">ضابط أول</option>
                        <option value="مساعد">مساعد</option>
                      </Form.Select>
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
                        <option value="سى بريز 9">سى بريز 9</option>
                        <option value="سى بريز 3">سى بريز 3 </option>
                        <option value="سى بريز 1">سى بريز 1</option>
                      </Form.Select>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="form-group text-end">
                      <label htmlFor="salary">الراتب الأساسى</label>
                      <input
                        type="number"
                        className="form-control"
                        name="textMessage"
                        id="salary"
                        onChange={(e) => setBaseSalary(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <div className="form-group text-end">
                      <label htmlFor="naID">رقم البطاقة</label>
                      <input
                        type="number"
                        className="form-control"
                        name="textMessage"
                        id="naID"
                        onChange={(e) => setSsn(e.target.value)}
                      />
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="form-group text-end">
                      <label htmlFor="phone">رقم الهاتف</label>
                      <input
                        type="number"
                        className="form-control"
                        name="textMessage"
                        id="phone"
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>
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
                onClick={onClose}
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
