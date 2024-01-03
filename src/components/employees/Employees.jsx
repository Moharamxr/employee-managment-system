import React, { useCallback, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import { Col, Container, Row } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import {
  getAllEmployees,
  getEmployeeById,
} from "../../services/employee.service";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    getData();
  };

  const getData = useCallback(async () => {
    try {
      const data = await getAllEmployees();
      setEmployees(data.employees);
      console.log(data.employees);
      setSearchError(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/");
        return;
      }
      setSearchError(true);
    }
  }, [navigate]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSearch = async () => {
    console.log("Search ID:", searchId);
    if (searchId === "") {
      return;
    }
    try {
      setSearchLoading(true);
      await getEmployeeById(searchId);
      navigate(`details/${searchId}`);
      setSearchError(false);
      setSearchLoading(false);
    } catch (error) {
      setSearchError(true);
      setSearchLoading(false);

      const timeout = setTimeout(() => {
        setSearchError(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  };

  return (
    <Container>
      <Row>
        <Col xs={12}>
          {searchError && (
            <p className="text-danger text-center">كود غير صحيح حاول مجدداً</p>
          )}
          <div className="input-group my-4 d-flex justify-content-center align-content-center">
            <button
              type="button"
              className="btn btn-primary"
              style={{ height: "38px" }}
              data-mdb-ripple-init
              onClick={handleSearch}
            >
              {searchLoading ? "جارى البحث" : <SearchIcon />}
            </button>
            <div className="form-outline">
              <input
                type="search"
                id="form1"
                className="form-control text-end"
                placeholder="ابحث بكود الموظف"
                style={{ width: "300px" }}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <table className="table my-custom-table text-end">
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
              {employees.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => navigate(`details/${item.id}`)}
                >
                  <td>{item.phone}</td>
                  <td>{item.ssn}</td>
                  <td>{item.workAddress}</td>
                  <td>{item.jobRole}</td>
                  <td>{item.name}</td>
                  <th scope="row">{item.id}</th>
                </tr>
              ))}
            </tbody>
          </table>
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
      <AddEmployee
        isOpen={isOpen}
        onClose={closeModal}
        prevID={employees.length}
      />
    </Container>
  );
};

export default Employees;
