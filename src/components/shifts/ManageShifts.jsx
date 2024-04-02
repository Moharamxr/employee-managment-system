import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField, TimeField } from "@mui/x-date-pickers";
import { addShift, getShiftById } from "../../services/shifts.service";
import { useCallback } from "react";

const ManageShifts = ({
  isOpen,
  onClose,
  inShift,
  id,
  currentShift,
  shifts,
}) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(dayjs());
  const [date, setDate] = useState(dayjs());
  const [startTime, setStartTime] = useState(dayjs());
  const [description, setDescription] = useState('')
  const [workAddress, setWorkAddress] = useState("");

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
        // console.error("Error fetching shift data:", error);
      }
    }
  }, [currentShift]);

  useEffect(() => {
    getShiftData();
  }, [getShiftData]);

  const reset = () => {
    setTime(dayjs());
    setDate(dayjs());
  };

  const isOverLapping = () => {
    let isOverlap = false;
    shifts.forEach((shift) => {
      if (!inShift) {
        if (date.isBefore(shift.startTime) || date.isAfter(shift.endTime)) {
          isOverlap = true;
        }
      } else {
        if (date.isAfter(shift.endTime)) {
          isOverlap = true;
        }
      }
    });
    return isOverlap;
  };
  const now = dayjs();

  // console.log("isOverLapping", isOverLapping());

  const handleAddShift = async (newData) => {
    setIsLoading(true);
    try {
      if (date.isBefore(now)) {
        if (inShift && date.isAfter(startTime) || !inShift && date.isBefore(now)) {
          const data = await addShift(newData);
          if (data) {
            reset();
            onClose();
          } else {
            if (!inShift && workAddress === "") {
              setError("ادخل المركب");
            } else if (isOverLapping()) {
              setError("يجب ألا تتعارض مواعيد الورديات");
            } else {
              setError("تاريخ خاطىء");
            }
            const timeout = setTimeout(() => {
              setError("");
            }, 3000);
            return () => clearTimeout(timeout);
          }
        } else {
          setError("يجب ان يكون وقت النزول بعد وقت الصعود");
          const timeout = setTimeout(() => {
            setError("");
          }, 3000);
          return () => clearTimeout(timeout);
        }
      } else {
        setError("يجب الا يكون التاريخ فى المستقبل");
        const timeout = setTimeout(() => {
          setError("");
        }, 3000);
        return () => clearTimeout(timeout);
      }
    } catch (error) {
      // console.error("Error adding shift:", error);
      if (!inShift && workAddress === "") {
        setError("ادخل المركب");
      } else if (isOverLapping()) {
        setError("يجب ألا تتعارض مواعيد الورديات");
      } else {
        setError("تاريخ خاطىء");
      }
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timeout);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = () => {
    const formattedDate = date.format("YYYY-MM-DD");
    const formattedTime = time.format("HH:mm");

    const newData = {
      id: id,
      time: formattedTime,
      date: formattedDate,
      location: workAddress,
      description: description,
    };
    handleAddShift(newData);
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
              {!inShift && (
                <>
                  <Row>
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
                  </Row>
                  <Row>
                    <Col>
                      <div className="form-group text-end">
                        <label htmlFor="setDescription">ملاحظة</label>
                        <input
                          autoComplete="off"
                          type="text"
                          className="form-control"
                          name="setDescription"
                          id="setDescription"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </div>
                    </Col>
                  </Row>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary text-light"
                onClick={handleFormSubmit}
                disabled={isLoading}
              >
                {!isLoading
                  ? inShift
                    ? "نزول الوردية"
                    : "صعود الوردية"
                  : "...جارى أضافة الوردية"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onClose}
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