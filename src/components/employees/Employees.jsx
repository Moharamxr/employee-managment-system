import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import { Col, Container, Row } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";

const Employees = () => {
  // Sample data array
  const data = [
    { id: 1, first: "احمد", last: "قبطان", handle: "012121124242" },
    { id: 2, first: "محمد", last: "ضابط اول", handle: "011124242" },
    { id: 3, first: "خالد", last: "مساعد", handle: "010121124242" },
  ];
  const fabStyle = {
    position: "absolute",
    bottom: 16,
    right: 16,
  };
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const openModal = () => {
    setIsOpen(true);
    console.log("modal opened");
  };

  const closeModal = () => {
    setIsOpen(false);
    console.log("modal closed");
    window.location.reload();
  };

  return (
    <>
      {isLoggedIn && (
        <Container>
          <Row>
            <Col xs={12}>
              <div className="input-group my-4 d-flex justify-content-center align-content-center">
                <button
                  type="button"
                  className="btn btn-primary "
                  style={{ height: "38px" }}
                  data-mdb-ripple-init
                >
                  <SearchIcon />
                </button>
                <div className="form-outline  " data-mdb-input-init>
                  <input
                    type="search"
                    id="form1"
                    className="form-control text-end"
                    placeholder="ابحث بكود الموظف"
                    style={{ width: "300px" }}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <table className="table text-end">
                <thead>
                  <tr>
                    <th scope="col">رقم الهاتف</th>
                    <th scope="col">رقم البطاقة</th>
                    <th scope="col">مكان العمل</th>
                    <th scope="col">الوظيفة</th>
                    <th scope="col">أسم الموظف</th>
                    <th scope="col">كود الموظف#</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id} onClick={()=>navigate('/details')}>
                      <td>{item.handle}</td>
                      <td>{item.handle}</td>
                      <td>{item.handle}</td>
                      <td>{item.last}</td>
                      <td>{item.first}</td>
                      <th scope="row">{item.id}</th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>

          <Fab
            sx={fabStyle}
            aria-label="Add"
            color="primary"
            onClick={openModal}
          >
            <AddIcon />
            {/* اضافة  */}
          </Fab>
          <AddEmployee isOpen={isOpen} onClose={closeModal} />
        </Container>
      )}
    </>
  );
};

export default Employees;
