import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  getAllUnPaidEmployees,
  
} from "../../services/employee.service";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Salaries = () => {
  const [employees, setEmployees] = useState([]);
  const [totalSalaries, setTotalSalaries] = useState();
  const [totalEmployeesLoans, setTotalEmployeesLoans] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [workAddress, setWorkAddress] = useState("");
  const [error, setError] = useState("");

  const [isPageLoading, setIsPageLoading] = useState(false);

  const [all, setAll] = useState(false);

  const navigate = useNavigate();
  const getData = useCallback(async (flag, workAddress, paymentMethod) => {
    setIsPageLoading(true);
    try {
      const data = await getAllUnPaidEmployees(
        flag,
        workAddress,
        paymentMethod
      );
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

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleWorkAddressChange = (e) => {
    setWorkAddress(e.target.value);
  };
  const handlePrint = async (e) => {
    navigate("/salaries");
  };
  useEffect(() => {
    getData(all, workAddress, paymentMethod);
  }, [all, workAddress, paymentMethod]);
  const path = process.env.REACT_APP_BACKEND_URL;
  return (
    <Container>
      <Row>
        <Col>
          {error && <p className="text-danger text-center">{error}</p>}
          <h2 className="text-center mt-3">
            {!all
              ? "موظفون لم يقبضوا مستحقات الورديات"
              : "جميع الموظفين الذين لديهم مستحقات لم تحصل من رواتب او اخرى"}{" "}
          </h2>
          <button
            className="btn btn-primary float-start"
            onClick={() => setAll(!all)}
          >
            تبديل
          </button>

          <>
            <div>
              <p className="text-end fs-5">
                <b>إجمالى الرواتب المستحقة</b>:{" "}
                {totalSalaries !== undefined && totalSalaries.toFixed(2)}
              </p>
            </div>

            <p className="text-end fs-5">
              <b>إجمالى السلف </b>:{" "}
              {totalSalaries !== undefined && totalEmployeesLoans.toFixed(0)}
            </p>
            <div className="d-flex justify-content-between align-content-center">
              <a
                href={`${path}/files/xlsx?all=${all}&workAddress=${workAddress}&paymentMethod=${paymentMethod}`}
                className="btn bg-black text-light"
                onClick={handlePrint}
              >
                أطبع
              </a>

              <p className="text-end fs-5">
                <b>عدد الموظفين الذين لم يأخذوا مستحقاتهم</b>:{" "}
                {employees !== undefined && employees.length}
              </p>
            </div>
          </>

          <table className="table my-custom-table text-center">
            <thead>
              <tr>
                <th scope="col">الاسم المحول إليه</th>
                <th scope="col">الرقم المحول إليه</th>
                <th scope="col" className="bg-   ">
                  <select
                    size=""
                    className="form-control fw-bold text-center"
                    style={{
                      width: "fit-content",
                    }}
                    name="paymentMethod"
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <option value="">طريقة الدفع</option>
                    <option value="cash">كاش</option>
                    <option value="bank">تحويل بنكى</option>
                    <option value="payroll">payroll</option>
                    <option value="wallet">محفظة إلكترونية</option>
                    <option value="postal">بريد</option>
                  </select>
                </th>
                <th scope="col"> إجمالى الراتب المستحق</th>
                <th scope="col">الراتب المرحل </th>
                <th scope="col">سلف</th>
                <th scope="col">التكلفة</th>
                <th scope="col">الراتب اليومى</th>
                <th scope="col">الراتب الاساسى</th>
                <th scope="col">ايام العمل</th>
                <th scope="col">
                  <select
                    className="form-control fw-bold text-center"
                    style={{
                      width: "fit-content",
                    }}
                    name="workAddress"
                    id="workAddress"
                    value={workAddress}
                    onChange={handleWorkAddressChange}
                  >
                    <option value="">المركب</option>
                    <option value="SeaBreeze 1">SeaBreeze 1</option>
                    <option value="SeaBreeze 9">SeaBreeze 9</option>
                    <option value="SeaBreeze 18">SeaBreeze 18</option>
                    <option value="SeaBreeze 22">SeaBreeze 22</option>
                    <option value="SeaBreeze 39">SeaBreeze 39</option>
                    <option value="SeaBreeze 44">SeaBreeze 44</option>
                    <option value="SeaBreeze 55">SeaBreeze 55</option>
                    <option value="NAPHT">NAPHT</option>
                    <option value="NAPHT 7">NAPHT 7</option>
                  </select>
                </th>
                <th scope="col">الوظيفة</th>
                <th scope="col">أسم الموظف</th>
                <th scope="col">كود الموظف#</th>
              </tr>
            </thead>
            <tbody>
              {!isPageLoading &&
                Array.isArray(employees) &&
                employees.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => navigate(`/accounting/${item.id}`)}
                  >
                    {item.paymentMethod === "bank" && (
                      <>
                        <td>{item.paymentMethodDetails.bankName}</td>
                        <td>{item.paymentMethodDetails.accountNumber}</td>
                      </>
                    )}
                    {item.paymentMethod === "payroll" && (
                      <>
                        <td>---</td>
                        <td>{item.paymentMethodDetails.accountNumber}</td>
                      </>
                    )}
                    {item.paymentMethod === "postal" && (
                      <>
                        <td>{item.paymentMethodDetails.name}</td>
                        <td>{item.paymentMethodDetails.ssn}</td>
                      </>
                    )}
                    {item.paymentMethod === "wallet" && (
                      <>
                        <td>{item.paymentMethodDetails.walletName}</td>
                        <td>{item.paymentMethodDetails.phoneNumber}</td>
                      </>
                    )}
                    {item.paymentMethod === "cash" && (
                      <>
                        <td>---</td>
                        <td>---</td>
                      </>
                    )}
                    <td>
                      {(item.paymentMethod === "bank" && "تحويل بنكى") ||
                        (item.paymentMethod === "payroll" && "payroll") ||
                        (item.paymentMethod === "postal" && "بريد") ||
                        (item.paymentMethod === "wallet" &&
                          "محفظة إلكترونية") ||
                        (item.paymentMethod === "cash" && "كاش ")}
                    </td>
                    <td>{item.delayedSalary.toFixed(0)}</td>
                    <td>{item.totalSalary.toFixed(0)}</td>
                    <td>{item.totalLoans.toFixed(0)}</td>
                    <td>{item.cost.toFixed(0)}</td>
                    <td>{item.dailySalary.toFixed(0)}</td>
                    <td>{item.baseSalary.toFixed(0)}</td>
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
