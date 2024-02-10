import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getEmpLoans } from '../../services/loans.service';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { CircularProgress } from '@mui/material';
import AddLoan from './AddLoan';

const LoanDetails = () => {
  const { id } = useParams();
  const [debts, setDebts] = useState([]);
  const [employee, setEmployee] = useState({});

  const [error, setError] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

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
      setIsPageLoading(true);
      const data = await getEmpLoans(id);
      setDebts(data.debts.reverse());
      setEmployee(data.employee);
      setError('');
      setIsPageLoading(false);
    } catch (error) {
      setError(true);
      setIsPageLoading(false);
      const timeout = setTimeout(() => {
        setError(false);
      }, 3000);

      return () => clearTimeout(timeout);
    } finally {
      setError(false);
      setIsPageLoading(false);
    }

  }, []);
  useEffect(() => {
    getData();
  }, []);
  return (
    <Container>
      <Row className='centered'>
        <Col md={7}>
          <Card className="text-end border-0 ">
            <ListGroup variant="flush">
              {isPageLoading && <div className="centered my-5"> <CircularProgress /></div>}
              {!isPageLoading && (
                <>
                  <ListGroup.Item className="text-end">
                    <h4 className="text-center">بيانات الموظف </h4>
                  </ListGroup.Item>

                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        className="form-control  border-0  text-center"
                        style={{ backgroundColor: "white", width: "280px" }}
                        type="text"
                        disabled
                        id="empID"
                        value={employee.id}
                      />
                      <label htmlFor="empId">كود الموظف</label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        className="form-control  border-0  text-center"
                        style={{ backgroundColor: "white", width: "280px" }}
                        type="text"
                        disabled
                        id="empID"
                        value={employee.name}
                      />

                      <label htmlFor="empName">أسم الموظف</label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        className="form-control  border-0  text-center"
                        style={{ backgroundColor: "white", width: "280px" }}
                        type="text"
                        disabled
                        id="empID"
                        value={employee.jobRole}
                      />

                      <label htmlFor="empJob"> الوظيفة</label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        className="form-control  border-0  text-center"
                        style={{ backgroundColor: "white", width: "280px" }}
                        type="text"
                        disabled
                        id="empID"
                        value={employee.workAddress}
                      />

                      <label htmlFor="empPlace">مكان العمل</label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        className="form-control  border-0  text-center"
                        style={{ backgroundColor: "white", width: "280px" }}
                        type="number"
                        disabled
                        id="empID"
                        value={employee.ssn}
                      />

                      <label htmlFor="empNaID">رقم البطاقة</label>
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        className="form-control  border-0  text-center"
                        style={{ backgroundColor: "white", width: "280px" }}
                        type="number"
                        disabled
                        id="empID"
                        value={employee.phone}
                      />
                      <label htmlFor="empPhone">رقم الهاتف</label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <div className="d-flex me-5">
                        <input
                          className="form-control border-0 text-center"
                          style={{
                            backgroundColor: "white",
                            width: "280px",
                          }}
                          type="number"
                          id="totalSalary"
                          disabled
                          value={employee.totalSalary}
                        />
                      </div>
                      <label htmlFor="totalSalary">إجمالى صافى الراتب </label>
                    </div>
                  </ListGroup.Item>
                  <Row className='centered'>
                    <button
                    className="btn btn-primary me-2 my-2 w-75 "

                    onClick={openModal}
                  >
                    إضافة دين جديد
                  </button>
                  </Row>
                  

                </>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {!isPageLoading && debts.length > 0 ?
        <Row className='centered'>
          <Col md={8}>
            <h4 className='text-center my-3'>ديون الموظف</h4>
            <table className="table my-custom-table text-center mt-2">
              <thead>
                <tr>
                  <th scope="col">حالة الدين</th>
                  <th scope="col">سبب الدين</th>
                  <th scope="col">المبلغ الباقى</th>
                  <th scope="col">المبلغ المسدد</th>
                  <th scope="col">قيمة الدين</th>
                  <th scope="col">تاريخ الدين</th>
                </tr>
              </thead>
              <tbody>
                {!isPageLoading && debts.length > 0 && debts.map((item) => (
                  <tr
                    key={item._id}
                    onClick={() => navigate(`/loans/pay/${item._id}`)}
                  >
                    <td>{item.status !== "paid" ? 'جارى' : 'مسدد'}</td>
                    <td>{item.reason}</td>
                    <td>{item.remainingAmount}</td>
                    <td>{item.paidAmount}</td>
                    <td>{item.amount}</td>
                    <th scope="row">{item.date.slice(0, 10)}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row> : !isPageLoading && <p className="text-center my-3">لا يوجد ديون سابقة لهذا الموظف</p>}
      <AddLoan
        onClose={closeModal}
        isOpen={isOpen} />
    </Container>
  )
}

export default LoanDetails