import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField, TimeField } from "@mui/x-date-pickers";
import { addShift, getShiftById } from "../../services/shifts.service";
import { useCallback } from "react";

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
  const [startTime, setStartTime] = useState(dayjs());

  const [workAddress, setWorkAddress] = useState('');

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTimeChange = (newTime) => {
    setTime(newTime);
  };

  const getShiftData = useCallback(async () => {
    if (currentShift) {
      try {
        const data = await getShiftById(currentShift);
        setStartTime(dayjs(data.shift.startTime));
      } catch (error) {
        console.error("Error fetching shift data:", error);
      }
    }
  }, [ currentShift]);

  useEffect(() => {
    getShiftData();
  }, [getShiftData]);


  const reset = () => {
    setTime(dayjs()); // Reset time to the current time
    setDate(dayjs()); // Reset date to the current date
  };

  const handleAddShift = async (newData) => {
    setIsLoading(true);
    try {
      const data = await addShift(newData);
      if (data) {
        reset();
        onClose();
      } else {
        setError("حدث خطأ أثناء إضافة الوردية.");
        const timeout = setTimeout(() => {
          setError("");
        }, 3000);
        return () => clearTimeout(timeout);
      }

    } catch (error) {
      setError("حدث خطأ أثناء إضافة الوردية.");
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    } finally {
      setIsLoading(false);
    }
  };
  const now = dayjs();


  const handleFormSubmit = () => {
    const formattedDate = date.format("YYYY-MM-DD");
    const formattedTime = time.format("HH:mm");

    const newData = {
      id: id,
      time: formattedTime,
      date: formattedDate,
      location: workAddress,
    };

    if (inShift) {
      if (formattedDate !== '' && formattedTime !== '' && date.isAfter(startTime) && date.isBefore(now) && workAddress !== '') {
        handleAddShift(newData);
      } else {
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
              {!inShift && <Row>
                <Col>
                  <div className="d-flex justify-content-between align-items-center me-5 my-3">

                    <Form.Select
                      size="sm"
                      className="form-control w-50 float-start me-5 text-end "
                      name="workAddress"
                      id="workAddress"
                      value={workAddress}
                      onChange={(e) => setWorkAddress(e.target.value)}
                    >
                      <option value="">اختر المركب </option>
                      <option value="SeaBreeze 1">SeaBreeze 1</option>
                      <option value="SeaBreeze 9">SeaBreeze 9</option>
                      <option value="SeaBreeze 18">SeaBreeze 18</option>
                      <option value="SeaBreeze 22">SeaBreeze 22</option>
                      <option value="SeaBreeze 39">SeaBreeze 39</option>
                      <option value="SeaBreeze 44">SeaBreeze 44</option>
                      <option value="SeaBreeze 55">SeaBreeze 55</option>
                      <option value="NAPHT">NAPHT</option>
                      <option value="NAPHT 7">NAPHT 7</option>
                      <option value="Waiting">Waiting</option>
                    </Form.Select>

                    <label htmlFor="workAddress">المركب</label>
                  </div>
                </Col>
              </Row>}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary text-light"
                onClick={handleFormSubmit}
                disabled={isLoading}
              >
                {!isLoading ? "أضافة الوردية" : "...جارى أضافة الوردية"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onClose}
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
