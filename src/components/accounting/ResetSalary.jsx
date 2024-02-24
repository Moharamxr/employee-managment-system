import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { payroll } from "../../services/financials.service";

const ResetSalary = ({
  isOpen,
  onClose,
  loan,
  deduction,
  compensation,
  baseSalary,
  totalSalary,
  bonus,
  id,
  name,
  paymentMethod,
  payrollNumber,
  walletNumber,
  walletName,
  postalNumber,
  postalName,
  bankName,
  bankNumber,
}) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [payedAmount, setPayedAmount] = useState("");

  const handelPayedAmount = async () => {
    setIsLoading(true);
    const newData = {
      id: id,
      payedAmount: payedAmount,
    };
    if (payedAmount > 0 && payedAmount <= totalSalary) {
      try {
        await payroll(newData);
        console.log("true");
        setIsLoading(false);
        setError("");
        onClose();
        setPayedAmount("");
      } catch (error) {
        setError(" يجب ان لا يكون النقد الخارج اكبر من صافى اجمالى الراتب ");
        const timeout = setTimeout(() => {
          setError("");
        }, 3000);
        setIsLoading(false);
        return () => clearTimeout(timeout);
      }
    } else {
      setError(" يجب ان لا يكون النقد الخارج اكبر من صافى اجمالى الراتب ");
      console.log("else");
      setIsLoading(false);
      const timeout = setTimeout(() => {
        setError("");
      }, 3000);

      return () => clearTimeout(timeout);
    }
    setIsLoading(false);
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
                {error && <p className="text-center text-danger">{error}</p>}
                <ListGroup.Item className="text-end">
                  <div className="d-flex justify-content-between align-items-center me-5">
                    <input
                      className="form-control border-0 text-center"
                      style={{
                        backgroundColor: "white",
                        width: "290px",
                      }}
                      type="text"
                      disabled
                      id="empID"
                      value={name}
                    />

                    <label htmlFor="empName">أسم الموظف</label>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item className="text-end">
                  <div className="d-flex justify-content-between align-items-center me-5">
                    <div className="d-flex me-5">
                      <input
                        className="form-control border-0   text-center"
                        style={{ backgroundColor: "white", width: "150px" }}
                        type="number"
                        id="baseSalary"
                        disabled
                        value={baseSalary}
                      />
                    </div>

                    <label htmlFor="baseSalary">الراتب الأساسى</label>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item className="text-end">
                  <div className="d-flex justify-content-between align-items-center me-5">
                    <div className="d-flex me-5">
                      <input
                        className="form-control border-0   text-center"
                        style={{ backgroundColor: "white", width: "150px" }}
                        type="number"
                        id="loans"
                        disabled
                        value={loan}
                      />
                    </div>

                    <label htmlFor="loans">سلف</label>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item className="text-end">
                  <div className="d-flex justify-content-between align-items-center me-5">
                    <div className="d-flex me-5">
                      <input
                        className="form-control border-0   text-center  "
                        style={{ backgroundColor: "white", width: "150px" }}
                        type="number"
                        id="deductions"
                        disabled
                        value={deduction}
                      />
                    </div>

                    <label htmlFor="deductions">استقطاعات</label>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="text-end">
                  <div className="d-flex justify-content-between align-items-center me-5">
                    <div className="d-flex me-5">
                      <input
                        className="form-control border-0   text-center  "
                        style={{ backgroundColor: "white", width: "150px" }}
                        type="number"
                        id="Compensation"
                        disabled
                        value={compensation}
                      />
                    </div>

                    <label htmlFor="Compensation">بدلات</label>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="text-end">
                  <div className="d-flex justify-content-between align-items-center me-5">
                    <div className="d-flex me-5">
                      <input
                        className="form-control border-0   text-center"
                        style={{ backgroundColor: "white", width: "150px" }}
                        type="number"
                        id="bonus"
                        value={bonus}
                        disabled
                      />
                    </div>

                    <label htmlFor="bonus">مكافئات</label>
                  </div>
                </ListGroup.Item>
                
                <ListGroup.Item className="text-end">
                  <div className="d-flex justify-content-between align-items-center me-5">
                    <input
                      className="form-control border-0 text-center"
                      style={{
                        backgroundColor: "white",
                        width: "150px",
                      }}
                      type="text"
                      disabled
                      id="paymentMethod"
                      value={
                        (paymentMethod === "bank" && "تحويل بنكى") ||
                        (paymentMethod === "payroll" && "payroll") ||
                        (paymentMethod === "postal" && "بريد") ||
                        (paymentMethod === "wallet" && "محفظة إلكترونية") ||
                        (paymentMethod==='cash'&&'كاش ')
                      }
                    />

                    <label htmlFor="paymentMethod">طريقة الدفع</label>
                  </div>
                </ListGroup.Item>
                {paymentMethod === "bank" && (
                  <>
                    <ListGroup.Item className="text-end">
                      <div className="d-flex justify-content-between align-items-center me-5">
                        <input
                          className="form-control border-0 text-center"
                          style={{
                            backgroundColor: "white",
                            width: "150px",
                          }}
                          type="text"
                          disabled
                          id="bankName"
                          value={bankName}
                        />

                        <label htmlFor="bankName"> أسم البنك</label>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="text-end">
                      <div className="d-flex justify-content-between align-items-center me-5">
                        <input
                          className="form-control border-0 text-center"
                          style={{
                            backgroundColor: "white",
                            width: "150px",
                          }}
                          type="text"
                          disabled
                          id="bankNumber"
                          value={bankNumber}
                        />

                        <label htmlFor="bankNumber">رقم الحساب البنكى</label>
                      </div>
                    </ListGroup.Item>
                  </>
                )}
                {paymentMethod === "postal" && (
                  <>
                    <ListGroup.Item className="text-end">
                      <div className="d-flex justify-content-between align-items-center me-5">
                        <input
                          className="form-control border-0 text-center"
                          style={{
                            backgroundColor: "white",
                            width: "150px",
                          }}
                          type="text"
                          disabled
                          id="postalName"
                          value={postalName}
                        />

                        <label htmlFor="postalName"> أسم صاحب رقم البريد</label>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="text-end">
                      <div className="d-flex justify-content-between align-items-center me-5">
                        <input
                          className="form-control border-0 text-center"
                          style={{
                            backgroundColor: "white",
                            width: "150px",
                          }}
                          type="text"
                          disabled
                          id="postalNumber"
                          value={postalNumber}
                        />

                        <label htmlFor="postalNumber">رقم البريد</label>
                      </div>
                    </ListGroup.Item>
                  </>
                )}
                {paymentMethod === "wallet" && (
                  <>
                    <ListGroup.Item className="text-end">
                      <div className="d-flex justify-content-between align-items-center me-5">
                        <input
                          className="form-control border-0 text-center"
                          style={{
                            backgroundColor: "white",
                            width: "150px",
                          }}
                          type="text"
                          disabled
                          id="walletName"
                          value={walletName}
                        />

                        <label htmlFor="walletName">نوع المحفظة</label>
                      </div>
                    </ListGroup.Item>
                    <ListGroup.Item className="text-end">
                      <div className="d-flex justify-content-between align-items-center me-5">
                        <input
                          className="form-control border-0 text-center"
                          style={{
                            backgroundColor: "white",
                            width: "150px",
                          }}
                          type="text"
                          disabled
                          id="walletNumber"
                          value={walletNumber}
                        />

                        <label htmlFor="walletNumber">رقم المحفظة</label>
                      </div>
                    </ListGroup.Item>
                  </>
                )}
                {paymentMethod === "payroll" && (
                  <>
                    <ListGroup.Item className="text-end">
                      <div className="d-flex justify-content-between align-items-center me-5">
                        <input
                          className="form-control border-0 text-center"
                          style={{
                            backgroundColor: "white",
                            width: "150px",
                          }}
                          type="text"
                          disabled
                          id="payrollNumber"
                          value={payrollNumber}
                        />

                        <label htmlFor="payrollNumber">رقم الحساب البنكى</label>
                      </div>
                    </ListGroup.Item>
                  </>
                )}
                <ListGroup.Item className="text-end">
                  <div className="d-flex justify-content-between align-items-center me-5">
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
                <ListGroup.Item className="text-end">
                  <div className="d-flex justify-content-between align-items-center me-5">
                    <input
                      className="form-control border-1 w-50   text-center "
                      style={{ backgroundColor: "gainsboro" }}
                      type="text"
                      id="payedAmount"
                      value={payedAmount}
                      onChange={(e) => setPayedAmount(e.target.value)}
                      autoComplete="off"
                    />

                    <label htmlFor="payedAmount">النقد الخارج</label>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary text-light"
                onClick={handelPayedAmount}
              >
                {!isLoading ? "تأكيد صرف الراتب" : "...جارى تأكيد صرف الراتب"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
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

export default ResetSalary;
