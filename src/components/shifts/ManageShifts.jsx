import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField, TimeField } from "@mui/x-date-pickers";
import { addShift, getShiftById } from "../../services/shifts.service";

const ManageShifts = ({
  isOpen,
  onClose,
  inShift,
  id,
  currentShift,
}) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(dayjs());
  const [date, setDate] = useState(dayjs());
  const [startTime, setStartTime] = useState('');
  // Function to handle changes in the DateField
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Function to handle changes in the TimeField
  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  const getShiftData = async () => {
    if (currentShift) {
      const data = await getShiftById(currentShift);
      setStartTime(dayjs(data.shift.startTime).format("YYYY-MM-DD"));
    }

  };
  useEffect(() => {
    getShiftData();
  }, []);

  const reset = () => {
    setTime('')
    setDate('')
  }
  const handleAddShift = async(newData) => {
    setIsLoading(true);
    try {
      await addShift(newData);
      reset();
      onClose();
      setIsLoading(false);
    } catch (error) {
      setError("حدث خطأ أثناء إضافة الوردية.");
      setIsLoading(false);
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  };
  // Function to handle form submission
  const handleFormSubmit =  () => {
    const formattedDate = date.format("YYYY-MM-DD");
    const formattedTime = time.format("HH:mm");
    console.log("Formatted Date:", formattedDate);
    console.log("Formatted Time:", formattedTime);

    const newData = {
      id: id,
      time: formattedTime,
      date: formattedDate
    }
    if (currentShift) {
      if (formattedDate !== '' && formattedTime !== '' && date.isAfter(startTime)) {
        handleAddShift(newData);
      }
      else {
        setError("يجب ان يكون تاريخ النزول بعد تاريخ الصعود");
        const timeout = setTimeout(() => {
          setError("");
        }, 3000);

        return () => clearTimeout(timeout);


      }

    } else {
      if (formattedDate !== '' && formattedTime !== '') {
        handleAddShift(newData);
      }

    }



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
                {inShift ? "نزول الوردية" : "صعود الوردية"}
              </h5>
              <p className="text-center text-danger">{error}</p>
            </div>

            <div className="modal-body" style={{ zIndex: 12501 }}>
              <Row>
                <Col>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                      label={inShift ? "تاريخ النزول" : "تاريخ الصعود"}
                      format="YYYY/MM/DD"
                      value={date}
                      onChange={handleDateChange}
                    />
                  </LocalizationProvider>
                </Col>
                <Col>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimeField
                      label={inShift ? "نزول الوردية" : "صعود الوردية"}
                      value={time}
                      format="hh:mm a"
                      onChange={handleTimeChange}
                    />
                  </LocalizationProvider>
                </Col>
              </Row>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary text-light"
                onClick={handleFormSubmit}
              >
                {!isLoading ? "أضافة الوردية" : "...جارى أضافة الوردية"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  onClose();
                }}
                disabled={isLoading}
              >
                أغلاق
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageShifts;