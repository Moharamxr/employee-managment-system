import React, { useState } from 'react'
import { addDept, makePayment } from '../../services/loans.service';
import { useParams } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from "@mui/x-date-pickers";

const AddLoan = ({ isOpen, onClose }) => {
  const { id } = useParams();
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState(dayjs());

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const reset = () => {
    setAmount('');
    setDate(dayjs());
  }
  const now = dayjs();

  const handlePayLoan = async () => {
    const formattedDate = date.format("YYYY-MM-DD");
    const newData = {
      id: id,
      amount: amount,
      reason: reason,
      date: formattedDate,
    }
    if (amount && amount > 0 && date.isBefore(now) &&reason !== '') {
      setIsLoading(true);

      try {
        const data = await addDept(newData);
        if (data) {
          reset();
          onClose();
          setError(false);
        }

        setIsLoading(false);

      } catch (error) {
        setError(true);
        setIsLoading(false);
        const timeout = setTimeout(() => {
          setError(false);
        }, 3000);
        return () => clearTimeout(timeout);
      }
    } else {
      setError(true);
      setIsLoading(false);
      const timeout = setTimeout(() => {
        setError(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };
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
              {error && <p className="text-center text-danger">تأكد من صحة البيانات المدخلة</p>}
              <div className="mb-3">
                <ListGroup variant="flush">
                  <ListGroup.Item className="text-start">
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateField
                        label='تاريخ الدين'
                        style={{width: '350px'}}
                        format="YYYY/MM/DD"
                        value={date}
                        onChange={handleDateChange}
                      />
                    </LocalizationProvider>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        className="form-control  border-0  text-center"
                        style={{ backgroundColor: "lightgrey", width: "150px" }}
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <label htmlFor="amount">مبلغ الدين</label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        className="form-control  border-0  text-center"
                        style={{ backgroundColor: "lightgrey", width: "150px" }}
                        type="text"
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                      />
                      <label htmlFor="reason">سبب الدين</label>
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
                {!isLoading ? "إضافة الدين" : "...جارى إضافة الدين"}
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

export default AddLoan