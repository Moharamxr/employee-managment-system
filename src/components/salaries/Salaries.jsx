import React, { useCallback, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import {
  getAllEmployees, getAllUnPaidEmployees,
} from "../../services/employee.service";
import { CircularProgress } from "@mui/material";
import { useContext } from "react";
import { gState } from "../../context/Context";


const Salaries = () => {
  const [employees, setEmployees] = useState([]);
  const [totalSalaries, setTotalSalaries] = useState();

  const [error, setError] = useState("");
  const [empIDs, setEmpIDs] = useState([]);

  const { setData } = useContext(gState);

  const [isPageLoading, setIsPageLoading] = useState(false);
  const navigate = useNavigate();

  const [all, setAll] = useState(false);

  const getData = useCallback(async (flag) => {
    setIsPageLoading(true);
    try {
      const data = await getAllUnPaidEmployees(flag);
      setEmployees(data.employees);
      setTotalSalaries(data.totalSalaries);
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
      setError('Error while loading');

    }
    setIsPageLoading(false);
  }, [navigate]);

  useEffect(() => {
    getData(all);
  }, [getData, all]);


  return (
    <Container>
      <Row>
        <Col>
          {error && <p className="text-danger text-center">{error}</p>}
          <h2 className="text-center mt-3">{!all ? 'مرتبات ورديات غير مدفوعة ' :'جميع المرتبات الغير مدفوعة' } </h2>
          {!isPageLoading && <p className="text-end fs-5"> <b>إجمالى الرواتب المتبقية</b> : {totalSalaries.toFixed(2)}</p>}
          {!isPageLoading && <button className="btn btn-primary float-start" onClick={() => setAll(!all)}>تبديل</button>}
          <table className="table my-custom-table text-center">
            <thead>
              <tr>

                <th scope="col">طريقة القبض</th>
                <th scope="col">الراتب المرحل </th>
                <th scope="col">صافى إجمالى الراتب</th>
                <th scope="col">رقم الهاتف</th>
                <th scope="col">رقم البطاقة</th>
                <th scope="col">مكان العمل</th>
                <th scope="col">الوظيفة</th>
                <th scope="col">أسم الموظف</th>
                <th scope="col">كود الموظف#</th>
              </tr>
            </thead>
            <tbody>

              {!isPageLoading && Array.isArray(employees) && employees.map((item) => (
                <tr
                  key={item.id}
                >

                  <td>{item.paymentMethod}</td>
                  <td>{item.delayedSalary.toFixed(2)}</td>
                  <td>{item.totalSalary.toFixed(2)}</td>
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