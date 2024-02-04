import React, { useContext, useState } from "react";
import { ListGroup, Tabs } from "react-bootstrap";
import { addFinancial } from "../../services/financials.service";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { updateEmployee } from "../../services/employee.service";
import { gState } from "../../context/Context";
import { Tab } from "bootstrap/dist/js/bootstrap.bundle";

const UpdateFinancial = ({
  isOpen,
  onClose,
  getData,
  totalSalary,
  id,
  name,
  jobRole,
  workAddress,
  phone,
  ssn,
}) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { data, setData } = useContext(gState);
  const { baseSalary } = data;
  console.log(baseSalary);

  const setBaseSalary = async (newData) => {
    await setData((prevState) => {
      return {
        ...prevState,
        baseSalary: newData,
      };
    });
  };

  const handleUpdateBaseSalary = async () => {
    const newData = {
      id: id,
      name: name,
      jobRole: jobRole,
      ssn: ssn,
      phone: phone,
      workAddress: workAddress,
      baseSalary: baseSalary,
    };
    console.log(newData);
    if (baseSalary !== "") {
      setError("");
      setIsLoading(true);
      try {
        await updateEmployee(newData);
        setIsLoading(false);
        setIsSuccess(true);
        getData(id);
        const timeout = setTimeout(() => {
          setIsSuccess(false);
        }, 3000);

        return () => clearTimeout(timeout);
      } catch (error) {
        setError(
          error.response.data.error || "حدث خطأ أثناء تحديث الراتب الاساسى"
        );

        setIsLoading(false);
        const timeout = setTimeout(() => {
          setError("");
        }, 3000);

        return () => clearTimeout(timeout);
      }
    } else {
      setError("حدث خطأ أثناء تحديث الراتب الاساسى");
    }
  };

  const [isLLoading, setIsLLoading] = useState(false);

  const [loan, setLoan] = useState("");
  const [compensation, setCompensation] = useState("");
  const [deduction, setDeduction] = useState("");
  const [bonus, setBonus] = useState("");

  const reset = () => {
    setLoan("");
    setDeduction("");
    setCompensation("");
    setBonus("");
  };
  const handleAddFinancial = async (type, value) => {
    const newData = {
      id: id,
      type: type,
      amount: value,
    };

    if (value && value > 0) {
      if (type === 'loan' || type === 'deduction') {
        if (value <= totalSalary) {
          setIsLLoading(true);
          try {
            await addFinancial(newData);

            reset();
            getData(id);
            setIsSuccess(true);

            const timeout = setTimeout(() => {
              setIsSuccess(false);
            }, 3000);

            return () => clearTimeout(timeout);
          } catch (error) {
            console.log("Error adding financial data:", error);
            setIsSuccess(false);
            setError("حدث خطأ أثناء تحديث الحسابات حاول مجددا");
            const timeout = setTimeout(() => {
              setError("");
            }, 3000);

            return () => clearTimeout(timeout);
          } finally {
            setIsLLoading(false);
          }
        } else {
          console.log("Invalid loan value");
          setError("يجب ان تكون قيمة الأستقطاع اقل من صافى الراتب");

          setIsSuccess(false);
          setIsLLoading(false);
          const timeout = setTimeout(() => {
            setError("");
          }, 3000);

          return () => clearTimeout(timeout);
        }

      } else {
        setIsLLoading(true);
        try {
          await addFinancial(newData);

          reset();
          getData(id);
          setIsSuccess(true);

          const timeout = setTimeout(() => {
            setIsSuccess(false);
          }, 3000);

          return () => clearTimeout(timeout);
        } catch (error) {
          console.log("Error adding financial data:", error);
          setIsSuccess(false);
          setError("حدث خطأ أثناء تحديث الحسابات حاول مجددا");
          const timeout = setTimeout(() => {
            setError("");
          }, 3000);

          return () => clearTimeout(timeout);
        } finally {
          setIsLLoading(false);
        }
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
                تصفية حساب الشهر
              </h5>
            </div>

            <div className="modal-body">
              <ListGroup variant="flush">
                {error ? <p className="text-center text-danger">{error}</p> : <p className="text-center text-white">{error}</p>}
                {isSuccess && (
                  <p className="text-end">
                    تم الإضافة بنجاح
                    <CheckCircleOutlineIcon />
                  </p>
                )}
                <ListGroup.Item className="text-end">
                  <div className="d-flex justify-content-between align-items-center me-5 mb-5">
                    <input
                      className="form-control border-0 text-center"
                      style={{
                        backgroundColor: "white",
                        width: "250px",
                      }}
                      type="text"
                      disabled
                      id="empID"
                      value={name}
                    />

                    <label htmlFor="empName">أسم الموظف</label>
                  </div>
                </ListGroup.Item>
                <Tabs
                  defaultActiveKey="Loans"
                  id="fill-tab-example"
                  className="mb-5"
                  justify
                >
                  <Tab eventKey="Loans" title="سلف">
                    <div className="d-flex justify-content-between align-items-center me-5 mb-5">
                      <div className="d-flex me-5">
                        <input
                          className="form-control text-center  "
                          style={{
                            backgroundColor: "lightgrey",
                            width: "138px",
                          }}
                          type="number"
                          id="loan"
                          onChange={(e) => setLoan(e.target.value)}
                          value={loan}
                        />
                        <button
                          type="button"
                          className="btn btn-primary p-2 text-center"
                          style={{ height: "38px" }}
                          data-mdb-ripple-init
                          onClick={() => handleAddFinancial("loan", loan)}
                          disabled={isLLoading}
                        >
                          إضافة
                        </button>
                      </div>

                      <label htmlFor="loans">سلف</label>
                    </div>
                  </Tab>
                  <Tab eventKey="Exchanges" title="بدلات">
                    <div className="d-flex justify-content-between align-items-center me-5 mb-5">
                      <div className="d-flex me-5">
                        <input
                          className="form-control text-center"
                          style={{
                            backgroundColor: "lightgrey",
                            width: "138px",
                          }}
                          type="number"
                          id="Compensation"
                          onChange={(e) => setCompensation(e.target.value)}
                          value={compensation}
                        />
                        <button
                          type="button"
                          className="btn btn-primary p-2 text-center"
                          style={{ height: "38px" }}
                          data-mdb-ripple-init
                          onClick={() =>
                            handleAddFinancial("compensation", compensation)
                          }
                          disabled={isLLoading}
                        >
                          إضافة
                        </button>
                      </div>

                      <label htmlFor="Compensation">بدلات</label>
                    </div>
                  </Tab>
                  <Tab eventKey="bonus" title="مكافئات">
                    <div className="d-flex justify-content-between align-items-center me-5 mb-5">
                      <div className="d-flex me-5">
                        <input
                          className="form-control text-center"
                          style={{
                            backgroundColor: "lightgrey",
                            width: "138px",
                          }}
                          type="number"
                          id="bonus"
                          onChange={(e) => setBonus(e.target.value)}
                          value={bonus}
                        />
                        <button
                          type="button"
                          className="btn btn-primary p-2 text-center"
                          style={{ height: "38px" }}
                          data-mdb-ripple-init
                          onClick={() => handleAddFinancial("bonus", bonus)}
                          disabled={isLLoading}
                        >
                          إضافة
                        </button>
                      </div>

                      <label htmlFor="bonus">مكافئات</label>
                    </div>
                  </Tab>
                  <Tab eventKey="Deductions" title="استقطاعات">
                    <div className="d-flex justify-content-between align-items-center me-5 mb-5">
                      <div className="d-flex me-5">
                        <input
                          className="form-control text-center  "
                          style={{
                            backgroundColor: "lightgrey",
                            width: "138px",
                          }}
                          type="number"
                          id="deductions"
                          onChange={(e) => setDeduction(e.target.value)}
                          value={deduction}
                        />
                        <button
                          type="button"
                          className="btn btn-primary p-2 text-center"
                          style={{ height: "38px" }}
                          data-mdb-ripple-
                          onClick={() =>
                            handleAddFinancial("deduction", deduction)
                          }
                          disabled={isLLoading}
                        >
                          إضافة
                        </button>
                      </div>

                      <label htmlFor="deductions">استقطاعات</label>
                    </div>
                  </Tab>
                  <Tab eventKey="baseSalary" title="الراتب الاساسى">
                    <div className="d-flex justify-content-between align-items-center me-5  mb-5">
                      <div className="d-flex me-5">
                        <input
                          className="form-control text-center "
                          style={{
                            backgroundColor: "lightgrey",
                            width: "138px",
                          }}
                          type="number"
                          id="baseSalary"
                          onChange={(e) => setBaseSalary(e.target.value)}
                          value={baseSalary}
                        />

                        <button
                          type="button"
                          className="btn btn-primary  p-2 "
                          style={{ height: "38px" }}
                          data-mdb-ripple-init
                          onClick={handleUpdateBaseSalary}
                          disabled={isLoading}
                        >
                          تحديث
                        </button>
                      </div>

                      <label htmlFor="baseSalary">الراتب الأساسى</label>
                    </div>
                  </Tab>
                </Tabs>

                <ListGroup.Item className="text-end">
                  <hr />
                  <div className="d-flex justify-content-between align-items-center me-5 mb-5">
                    <input
                      className="form-control border-0 text-center"
                      style={{
                        backgroundColor: "white",
                        width: "138px",
                      }}
                      type="text"
                      disabled
                      id="salary"
                      value={totalSalary}
                    />

                    <label htmlFor="salary">صافى اجمالى الراتب</label>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </div>
            <div className="modal-footer d-flex justify-content-around align-content-center">
              <button
                type="button"
                className="btn btn-secondary p-1"
                data-bs-dismiss="modal"
                onClick={() => {
                  onClose();
                }}
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

export default UpdateFinancial;
