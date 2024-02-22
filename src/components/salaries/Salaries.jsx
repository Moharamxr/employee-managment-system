import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { getAllUnPaidEmployees } from "../../services/employee.service";
import { CircularProgress } from "@mui/material";

const Salaries = () => {
  const [employees, setEmployees] = useState([]);
  const [totalSalaries, setTotalSalaries] = useState();
  const [totalEmployeesLoans, setTotalEmployeesLoans] = useState();

  const [error, setError] = useState("");

  const [isPageLoading, setIsPageLoading] = useState(false);

  const [all, setAll] = useState(false);

  const getData = useCallback(async (flag) => {
    setIsPageLoading(true);
    try {
      const data = await getAllUnPaidEmployees(flag);
      setEmployees(data.employees);
      setTotalSalaries(data.totalSalaries);
      setTotalEmployeesLoans(data.totalEmployeesLoans);

      setError("");
      setIsPageLoading(false);
    } catch (error) {
      setIsPageLoading(false);
      setError("Error while loading");
    }
    setIsPageLoading(false);
  }, []);

  useEffect(() => {
    getData(all);
  }, [getData, all]);

  return (
    <Container>
      <Row>
        <Col>
          {error && <p className="text-danger text-center">{error}</p>}
          <h2 className="text-center mt-3">
            {!all
              ? "الموظفون الذين لم يقبضوا مستحقات الورديات"
              : "جميع الموظفين الذين لديهم مستحقات لم تحصل من رواتب او اخرى"}{" "}
          </h2>
          {!isPageLoading && totalSalaries !== undefined && (
            <>
              <p className="text-end fs-5">
                <b>إجمالى الرواتب المستحقة</b>: {totalSalaries.toFixed(2)}
              </p>
              <p className="text-end fs-5">
                <b>إجمالى السلف </b>: {totalEmployeesLoans.toFixed(2)}
              </p>
              <p className="text-end fs-5">
                <b>عدد الموظفين الذين لم يأخذوا مستحقاتهم</b>:{" "}
                {employees.length}
              </p>
            </>
          )}

          {!isPageLoading && (
            <button
              className="btn btn-primary float-start"
              onClick={() => setAll(!all)}
            >
              تبديل
            </button>
          )}
          <table className="table my-custom-table text-center">
            <thead>
              <tr>
                <th scope="col">الاسم المحول إليه</th>
                <th scope="col">الرقم المحول إليه</th>
                <th scope="col">طريقة القبض</th>
                <th scope="col"> إجمالى الراتب المستحق</th>
                <th scope="col">الراتب المرحل </th>
                <th scope="col">سلف</th>
                <th scope="col">التكلفة</th>
                <th scope="col">الراتب اليومى</th>
                <th scope="col">الراتب الاساسى</th>
                <th scope="col">ايام العمل</th>
                <th scope="col">مكان العمل</th>
                <th scope="col">الوظيفة</th>
                <th scope="col">أسم الموظف</th>
                <th scope="col">كود الموظف#</th>
              </tr>
            </thead>
            <tbody>
              {!isPageLoading &&
                Array.isArray(employees) &&
                employees.map((item) => (
                  <tr key={item.id}>
                    {item.paymentMethod==='bank' && (
                      <>
                        <td>{item.paymentMethod}</td>
                        <td>{item.paymentMethod}</td>
                      </>
                    )}
                    {item.paymentMethod==='payroll' && (
                      <>
                        <td>---</td>
                        <td>{item.paymentMethod}</td>
                      </>
                    )}
                    {item.paymentMethod==='postal' && (
                      <>
                        <td>{item.paymentMethod}</td>
                        <td>{item.paymentMethod}</td>
                      </>
                    )}
                    {item.paymentMethod==='wallet' && (
                      <>
                        <td>---</td>
                        <td>{item.paymentMethod}</td>
                      </>
                    )}
                    {item.paymentMethod==='cash' && (
                      <>
                        <td>---</td>
                        <td>---</td>
                      </>
                    )}
                    <td>{item.paymentMethod}</td>
                    <td>{item.delayedSalary.toFixed(2)}</td>
                    <td>{item.totalSalary.toFixed(2)}</td>
                    <td>{item.totalLoans.toFixed(2)}</td>
                    <td>{item.cost.toFixed(2)}</td>
                    <td>{item.dailySalary.toFixed(2)}</td>
                    <td>{item.baseSalary.toFixed(2)}</td>
                    <td>{item.daysWorked}</td>
                    <td>{item.workAddress}</td>
                    <td>{item.jobRole}</td>
                    <td>{item.name}</td>
                    <th scope="row">{item.id}</th>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="centered">
            {isPageLoading && <CircularProgress />}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Salaries;
