import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { addUser } from "../../services/users.service";

const AddUser = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [ssn, setSsn] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setUsername("");
    setPassword("");
    setRole("");
    setEmail("");
    setSsn("");
    setPhone("");
    setError("");
    setIsLoading(false);
  };

  const handleAddUser = async () => {
    const data = {
      username: username,
      password: password,
      role: role,
      email: email,
      ssn: ssn,
      phone: phone,
    };
    setIsLoading(true);

    try {
      await addUser(data);
      setIsLoading(false);
      onClose();
    } catch (error) {
      console.log(error.response.data.error);
      if (username.trim() === "") {
        setError("ادخل الأسم");
      } else if (password.length < 8) {
        setError(
          "(تحتوى على حرف و رقم على الاقل) كلمة المرور يجب ان تكون اكثر من 8 حروف"
        );
      } else if (role.trim() === "") {
        setError("ادخل الوظيفة");
      } else if (email.trim() === "") {
        setError("أدخل البريد الالكترونى بشكل صحيح");
      } else if (
        ssn.trim() === "" ||
        ssn.length !== 14 ||
        !(ssn.startsWith("3") || ssn.startsWith("2"))
      ) {
        setError("أدخل الرقم القومى بشكل صحيح (14 رقم)");
      } else if (
        phone.trim() === "" ||
        phone.length !== 11 ||
        !phone.startsWith("01")
      ) {
        setError("رقم الهاتف بشكل صحيح (11 رقم)");
      } else if (
        error.response.data.error ===
        "Password must contain at least one number and one letter"
      ) {
        setError("كلمة المرور يجب ان تحتوى على حرف و رقم على الاقل");
      } else if (error.response.data.error === "Invalid email address") {
        setError("أدخل البريد الالكترونى بشكل صحيح");
      } else {
        setError(error.response.data.error);
      }
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);
      setIsLoading(false);
      return () => clearTimeout(timeout);
    }
    setIsLoading(false);
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
          <div className="modal-content" style={{ width: "35rem" }}>
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
                      <label htmlFor="password">كلمة المرور</label>
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="form-group text-end">
                      <label htmlFor="username">أسم المستخدم</label>
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col sm={6}>
                    <div className="form-group text-end">
                      <label htmlFor="email">البريد الالكترونى</label>
                      <input
                        autoComplete="off"
                        type="text"
                        className="form-control"
                        name="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="form-group text-end">
                      <label htmlFor="role">الوظيفة</label>
                      <Form.Select
                        className="form-control"
                        name="role"
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="">اختر الوظيفة</option>
                        <option value="secretary">secretary</option>
                        <option value="admin">admin</option>
                        <option value="accountant">accountant</option>
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
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary text-light"
                onClick={handleAddUser}
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

export default AddUser;
