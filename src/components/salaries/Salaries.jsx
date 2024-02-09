import React, { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import {
  getAllEmployees,
} from "../../services/employee.service";
import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import { gState } from "../../context/Context";


const Salaries = () => {
  const [employees, setEmployees] = useState([]);
  
  const [error, setError] = useState("");
  const [empIDs, setEmpIDs] = useState([]);

  const { setData } = useContext(gState);

  const [isPageLoading, setIsPageLoading] = useState(false);
  const navigate = useNavigate();

  const getData = useCallback(async () => {
    setIsPageLoading(true);
    try {
      const data = await getAllEmployees();
      setEmployees(data.employees);
      
      const employeeIds = data.employees.map((employee) => employee.id);
      setEmpIDs(employeeIds);

      await setData((prevState) => {
        return {
          ...prevState,
          empIDs: employeeIds,
        };
      });

      setError('');
      setIsPageLoading(false);
    } catch (error) {
      setIsPageLoading(false);
      setError(error.response.data.error);
    }
    setIsPageLoading(false);
  }, [navigate]);

  useEffect(() => {
    getData();
  }, [getData]);


  return (
    <Container>
      <Row>
        <Col>
          {error && <p className="text-danger text-center">{error}</p>}
          <table className="table my-custom-table text-center">
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
              {Array.isArray(employees) && employees.map((item) => (
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
          <div className="centered"> {isPageLoading && <CircularProgress />}</div>
        </Col>
      </Row>

      
    </Container>
  );
};

export default Salaries;