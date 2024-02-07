import React from 'react'
import { useParams } from 'react-router-dom';
import { getLoanById } from '../../services/loans.service';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { CircularProgress } from '@mui/material';
import PayLoan from './PayLoan';

const PaymentDetails = () => {
  const { id } = useParams();
  const [debt, setDebt] = useState({});
  const [employee, setEmployee] = useState({});


  const [error, setError] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);



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
      const data = await getLoanById(id);
      setDebt(data.debt);
      setEmployee(data.employee);

      setError(false);
      setIsPageLoading(false);
    } catch (error) {
      setError(true);
      setIsPageLoading(false);
      const timeout = setTimeout(() => {
        setError(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);


  return (
    <Container>
      <Row className='centered'>
        <Col md={6}>
          <Card className="text-end border-0 ">
            <ListGroup variant="flush">
              {isPageLoading && <div className="centered my-5"> <CircularProgress /></div>}
              {!isPageLoading && (
                <>
                  <ListGroup.Item className="text-end">
                    <h4 className="text-center">بيانات دين الموظف </h4>
                  </ListGroup.Item>

                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        className="form-control  border-0  text-center"
                        style={{ backgroundColor: "white", width: "150px" }}
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
                      {debt && debt.date && (
                        <>
                          <input
                            className="form-control border-0 text-center"
                            style={{ backgroundColor: "white", width: "150px" }}
                            type="text"
                            disabled
                            id="empID"
                            value={debt.date.slice(0, 10)}
                          />
                          <label htmlFor="empJob"> تاريخ الدين</label>
                        </>
                      )}
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        className="form-control  border-0  text-center"
                        style={{ backgroundColor: "white", width: "150px" }}
                        type="text"
                        disabled
                        id="empID"
                        value={debt.amount}
                      />

                      <label htmlFor="empPlace">قيمة الدين</label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        className="form-control  border-0  text-center"
                        style={{ backgroundColor: "white", width: "150px" }}
                        type="number"
                        disabled
                        id="empID"
                        value={debt.paidAmount}
                      />

                      <label htmlFor="empNaID">المبلغ المسدد</label>
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        className="form-control  border-0  text-center"
                        style={{ backgroundColor: "white", width: "150px" }}
                        type="number"
                        disabled
                        id="empID"
                        value={debt.remainingAmount}
                      />
                      <label htmlFor="empPhone">المبلغ الباقى</label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <div className="d-flex me-5">
                        <input
                          className="form-control border-0 text-center"
                          style={{
                            backgroundColor: "white",
                            width: "138px",
                          }}
                          type="text" // Change type to text
                          id="totalSalary"
                          disabled
                          value={debt.reason}
                        />
                      </div>
                      <label htmlFor="totalSalary">سبب الدين </label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <div className="d-flex me-5">
                        <input
                          className="form-control border-0 text-center"
                          style={{
                            backgroundColor: "white",
                            width: "138px",
                          }}
                          type="text" // Change type to text
                          id="totalSalary"
                          disabled
                          value={debt.status === 'paid' ? 'تم التسديد' : 'جارى'}
                        />
                      </div>
                      <label htmlFor="totalSalary">حالة الدين </label>
                    </div>
                  </ListGroup.Item>

                  {debt.status !== 'paid' && <button
                    className="btn btn-primary me-2 my-2"

                    onClick={openModal}
                  >
                    تسديد الدين
                  </button>}

                </>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {!isPageLoading && debt.payments&&debt.payments.length > 0 ?
        <Row className='centered'>
          <Col md={6}>
            <h4 className='text-center my-3'>تسديدات الدين السابقة</h4>
            <table className="table my-custom-table text-center mt-2">
              <thead>
                <tr>
                  <th scope="col">قيمة التسديد</th>
                  <th scope="col">تاريخ التسديد</th>
                </tr>
              </thead>
              <tbody>
                {!isPageLoading && debt.payments && debt.payments.length > 0 && debt.payments.map((item) => (
                  <tr
                    key={item._id}
                  >
                    <td>{item.amount}</td>
                    <th scope="row">{item.date.slice(0, 10)}</th>
                  </tr>
                ))}

              </tbody>
            </table>
          </Col>
        </Row> : !isPageLoading && <p className="text-center my-3">لا يوجد تسديدات سابقة لهذا الموظف</p>}
      <PayLoan
        totalSalary={employee.totalSalary}
        isOpen={isOpen}
        onClose={closeModal}

      />
    </Container>
  )
}

export default PaymentDetails