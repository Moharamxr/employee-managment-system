import React, { useState } from 'react'
import { makePayment } from '../../services/loans.service';
import { useParams } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';

const PayLoan = ({ isOpen, onClose, totalSalary }) => {
    const { id } = useParams();
    const [paidAmount, setPaidAmount] = useState('');

    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const reset = () => {
        setPaidAmount('');
    }
    const handlePayLoan = async () => {
        const newData = {
            id: id,
            amount: paidAmount,
        }
        if (paidAmount && paidAmount > 0 && paidAmount <= totalSalary) {
            setIsLoading(true);

            try {
                const data =await makePayment(newData);
                if (data) {
                    reset();
                onClose();
                }
                
                setIsLoading(false);
            } catch (error) {
                setError(true);
                setIsLoading(false);
                const timeout = setTimeout(() => {
                    setError("");
                }, 3000);
                return () => clearTimeout(timeout);
            }
        } else {
            setError(true);
            setIsLoading(false);
            const timeout = setTimeout(() => {
                setError("");
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }

    return (
        <>
            {isOpen && (
                <div
                    className="modal-backdrop show z-6 w-100 h-100"
                    style={{ zIndex: 1210 }}
                ></div>
            )}
            <div
                key="createPostModal"
                className={`modal  fade${isOpen ? " show d-block" : ""}`}
                tabIndex="-1"
                style={{ display: isOpen ? "block" : "none", zIndex: 12500 }}
            >
                <div className="modal-dialog ">
                    <div className="modal-content">
                        <div
                            className="modal-header"
                            style={{ direction: "rtl", textAlign: "right" }}
                        >
                            <h5 className="modal-title" id="exampleModalLabel">
                                أضافة موظف جديد
                            </h5>
                        </div>

                        <div className="modal-body">
                            {error && <p className="text-center text-danger">يجب ألا يزيد المبلغ المسدد عن اجمالى المرتب</p>}
                            <div className="mb-3">
                                <ListGroup   variant="flush">
                                    <ListGroup.Item className="text-end">
                                        <div className="d-flex justify-content-between align-items-center me-5">
                                            <input
                                                className="form-control  border-0  text-center"
                                                style={{ backgroundColor: "white", width: "150px" }}
                                                type="text"
                                                disabled
                                                id="totalSalary"
                                                value={totalSalary}
                                            />
                                            <label htmlFor="totalSalary">إجمالى صافى الراتب </label>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item className="text-end">
                                        <div className="d-flex justify-content-between align-items-center me-5">
                                            <input
                                                className="form-control  border-0  text-center"
                                                style={{ backgroundColor: "lightgrey", width: "150px" }}
                                                type="number"
                                                
                                                id="paidAmount"
                                               
                                                value={paidAmount}
                                            onChange={(e) => setPaidAmount(e.target.value)}
                                            />
                                            <label htmlFor="paidAmount">المبلغ المسدد</label>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-primary text-light"
                                onClick={handlePayLoan}
                                disabled={isLoading}
                            >
                                {!isLoading ? "تسديد" : "...جارى تسديد  الدين"}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={() => {
                                    onClose();
                                    reset();
                                }}
                            >
                                أغلاق
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PayLoan