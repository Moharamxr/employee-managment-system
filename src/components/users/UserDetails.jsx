import React, { useEffect, useState } from "react";
import { Card, Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import { CircularProgress } from "@mui/material";
import {
  deleteUser,
  getUserById,
  updateUserInfo,
  updateUserPassword,
} from "../../services/users.service";

const UserDetails = () => {
  const { id } = useParams();

  const [enableEdit, setEnableEdit] = useState(false);

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [ssn, setSsn] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const isAdmin = localStorage.getItem("role") === "admin";
  const navigate = useNavigate();

  const getUserInfo = useCallback(async () => {
    setIsPageLoading(true);
    try {
      const data = await getUserById(id);
      setUsername(data.user.username);
      setRole(data.user.role);
      setSsn(data.user.ssn);
      setPhone(data.user.phone);
      setEmail(data.user.email);
      setIsPageLoading(false);
    } catch (error) {
      setError("Error while loading");
      setIsPageLoading(false);
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timeout);
      
    }
  }, [id]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const toggleUpdate = () => {
    setEnableEdit(!enableEdit);
    getUserInfo();
  };
  const handleUpdate = async () => {
    const newData = {
      username: username,
      role: role,
      phone: phone,
      email: email,
      id: id,
    };
    setIsLoading(true);
    if (username === "" || phone === "" || email === "") {
      setError("من فضلك املأ جميع البيانات");
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timeout);
    
    } else {
      try {
        await updateUserInfo(newData);
        setIsLoading(false);
        setEnableEdit(false);
        setIsSuccess(true);
        const timeout = setTimeout(() => {
          setIsSuccess(false);
        }, 3000);

        return () => clearTimeout(timeout);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setIsSuccess(false);
        setError("حدث خطأ أثناء تحديث البيانات");
        const timeout = setTimeout(() => {
          setError("");
        }, 3000);

        return () => clearTimeout(timeout);
      }
    }
  };
  const handleUpdatePassword = async () => {
    const newData = {
      password: password,
      id: id,
    };
    try {
      await updateUserPassword(newData);
      setEnableEdit(false);
      setPassword("");
      setIsSuccess(true);
      const timeout = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      return () => clearTimeout(timeout);
    } catch (error) {
      console.log(error);
      setError("(تحتوى على حرف و رقم على الاقل)كلمة المرور يجب ان تكون اكثر من 8 حروف");
      setIsSuccess(false);
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  };

  const handleDeleteUser = async () => {  
    const decision = window.confirm("هل متأكد أنك تريد حذف هذا الموظف؟");
    if (decision) {
      alert("لقد تم حذف الموظف");
      await deleteUser(id);
      navigate("/users");
    }else{
      alert("لم يتم حذف الموظف");
    }
  };
  return (
    <Container>
      <Row className="centered">
        {!isPageLoading ? (
          <Col sm={7}>
            <Card className="text-end border-0">
              <ListGroup variant="flush">
                <ListGroup.Item className="text-end">
                  <h5 className="text-center">بيانات المستخدم</h5>
                  {error && <p className="text-center text-danger">{error}</p>}
                  {isSuccess && <p className="text-center text-success">{"تم التحديث بنجاح"}</p>}
                </ListGroup.Item>
                <ListGroup.Item className="text-end">
                  <div className="d-flex justify-content-between align-items-center me-5">
                    <input
                      autoComplete="off"
                      className="border-0 form-control text-center w-50"
                      style={{
                        backgroundColor: `${
                          enableEdit ? "gainsboro" : "white "
                        }`,
                      }}
                      type="text"
                      disabled={!enableEdit}
                      id="empName"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />

                    <label htmlFor="empName">أسم المستخدم</label>
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
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                      >
                        <option value="secretary">secretary</option>
                        <option value="admin">admin</option>
                        <option value="accountant">accountant</option>
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
                        value={role}
                      />
                    )}
                    <label htmlFor="empJob"> الوظيفة</label>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="text-end">
                  <div className="d-flex justify-content-between align-items-center me-5">
                    <input
                      autoComplete="off"
                      className="border-0 form-control text-center w-50"
                      style={{
                        backgroundColor: `${
                          enableEdit ? "gainsboro" : "white "
                        }`,
                      }}
                      type="email"
                      disabled={!enableEdit}
                      id="empName"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="empName">البريد الالكترونى</label>
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
                        backgroundColor: `${
                          enableEdit ? "gainsboro" : "white "
                        }`,
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
                    <div className="d-flex justify-content-between align-items-center">
                      <button className="btn btn-primary" onClick={handleUpdatePassword}>تحديث</button>
                      <input
                        autoComplete="off"
                        className="border-0 form-control   text-center"
                        style={{
                          backgroundColor: "gainsboro",
                          width: "17.5rem",
                        }}
                        type="text"
                        id="empPhone"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>

                    <label htmlFor="empPhone">كلمة المرور</label>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            {isAdmin && (
              <button className={`btn btn-${"danger"} float-end ms-1`}onClick={handleDeleteUser}>
                حذف المستخدم
              </button>
            )}
            <button
              className={`btn btn-${
                enableEdit ? "secondary" : "primary"
              } float-end`}
              onClick={toggleUpdate}
            >
              {!enableEdit ? "تحديث البيانات" : "إلغاء"}
            </button>
            {enableEdit && (
              <button
                className="btn btn-success float-start"
                onClick={handleUpdate}
              >
                {isLoading ? "جارى تحديث البيانات" : "تأكيد التحديث"}
              </button>
            )}
          </Col>
        ) : (
          <CircularProgress />
        )}
      </Row>
    </Container>
  );
};

export default UserDetails;
