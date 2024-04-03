import { CircularProgress, Fab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getAllUsers } from "../../services/users.service";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AddUser from "./AddUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const getUsers = async () => {
    setIsPageLoading(true);
    try {
      const data = await getAllUsers();
    setIsPageLoading(false);
    setUsers(data.users);
    } catch (error) {
      setIsPageLoading(false);
      localStorage.setItem("isLoggedIn", false);
      localStorage.setItem("token", "");
      navigate("/login");
    }
    
  };
  useEffect(() => {
    getUsers();
  }, []);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    getUsers();
  };
  return (
    <Container>
      <Row>
        <Col>
          <table className="table my-custom-table text-center">
            <thead>
              <tr>
                <th scope="col">رقم الهاتف</th>
                <th scope="col">رقم البطاقة</th>
                <th scope="col">البريد الاكترونى</th>
                <th scope="col">الوظيفة</th>
                <th scope="col">أسم المستخدم</th>
                <th scope="col">كود المستخدم#</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr
                  key={item._id}
                  onClick={() => navigate(`details/${item._id}`)}
                >
                  <td>{item.phone}</td>
                  <td>{item.ssn}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>{item.username}</td>
                  <th scope="row">{index + 1}</th>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="centered">
            {isPageLoading && <CircularProgress />}
          </div>
        </Col>
      </Row>
      <Fab
        aria-label="Add"
        color="primary"
        onClick={openModal}
        style={{ position: "absolute", top: 90, right: 16 }}
      >
        <AddIcon />
      </Fab>
      <AddUser isOpen={isOpen} onClose={closeModal} />
    </Container>
  );
};

export default Users;
