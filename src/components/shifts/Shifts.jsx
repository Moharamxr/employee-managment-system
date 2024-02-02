import { Card, Container, ListGroup } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { getShiftByEmployeeId } from "../../services/shifts.service";
import ManageShifts from "./ManageShifts";

function Shifts() {
  const [searchError, setSearchError] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [ssn, setSsn] = useState(0);
  const [phone, setPhone] = useState(0);
  const [workAddress, setWorkAddress] = useState("");
  const [inShift, setInShift] = useState(false);

  const [currentShift, setCurrentShift] = useState('');
  const [shifts, setShift] = useState([]);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false);

  const getEmployeeByID = async (id) => {
    try {
      const shiftsData = await getShiftByEmployeeId(id);
      setShow(true);
      setId(shiftsData.employee.id);
      setName(shiftsData.employee.name);
      setSsn(shiftsData.employee.ssn);
      setJobRole(shiftsData.employee.jobRole);
      setPhone(shiftsData.employee.phone);
      setWorkAddress(shiftsData.employee.workAddress);
      setInShift(shiftsData.employee.shift.inShift);
      setCurrentShift(shiftsData.employee.shift.currentShift)

      setShift(shiftsData.shifts);
    } catch (error) {
      console.log(error);
      setSearchError(true);
      setSearchLoading(false);
      setShow(false);
      const timeout = setTimeout(() => {
        setSearchError(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  };

  const handleSearch = async () => {
    if (searchId && searchId > 0) {
      try {
        console.log("Search ID:", searchId);
        setSearchLoading(true);
        getEmployeeByID(searchId);

        setSearchError(false);
        setSearchLoading(false);
      } catch (error) {
        setSearchError(true);
        setSearchLoading(false);
        setShow(false);

        const timeout = setTimeout(() => {
          setSearchError(false);
        }, 3000);

        return () => clearTimeout(timeout);
      }
    } else {
      setSearchError(true);
      setSearchLoading(false);

      setShow(false);

      const timeout = setTimeout(() => {
        setSearchError(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
    setSearchLoading(false);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    getEmployeeByID(searchId);
  };
  const isAccountant = localStorage.getItem("role") === "accountant";

  return (
    <Container>
      <Row className="centered">
        <Col sm={6}>
          <Row>
            <Col>
              {searchError && (
                <p className="text-danger text-center">
                  كود غير صحيح حاول مجدداً
                </p>
              )}
              <div className="input-group my-4 centered">
                <button
                  type="button"
                  className="btn btn-primary "
                  style={{ height: "38px" }}
                  data-mdb-ripple-init
                  onClick={handleSearch}
                  disabled={searchLoading}
                >
                  <SearchIcon />
                </button>
                <div className="form-outline">
                  <input
                    type="number"
                    id="form1"
                    className="form-control text-center"
                    placeholder="ابحث بكود الموظف"
                    style={{ width: "300px" }}
                    onChange={(e) => setSearchId(e.target.value)}
                    autoComplete="off"
                    onKeyDown={handleKeyPress}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Card className="text-end border-0 mb-5">
            <ListGroup variant="flush">
              {show && (
                <>
                  <ListGroup.Item className="text-end">
                    <h4 className="text-center">ورديات الموظف</h4>
                  </ListGroup.Item>

                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        autoComplete="off"
                        className="border-0 me-5 text-center"
                        style={{ backgroundColor: "white" }}
                        type="text"
                        disabled
                        id="empID"
                        value={id}
                      />
                      <label htmlFor="empId">كود الموظف</label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        autoComplete="off"
                        className="border-0 me-5 text-center"
                        style={{ backgroundColor: "white" }}
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
                      <input
                        autoComplete="off"
                        className="border-0 me-5 text-center"
                        style={{ backgroundColor: "white" }}
                        type="text"
                        disabled
                        id="empID"
                        value={inShift?"داخل وردية الآن":"خارج الوردية"}
                      />

                      <label htmlFor="empName">حاله الموظف</label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        autoComplete="off"
                        className="border-0 me-5 text-center"
                        style={{ backgroundColor: "white" }}
                        type="text"
                        disabled
                        id="empID"
                        value={jobRole}
                      />

                      <label htmlFor="empJob"> الوظيفة</label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        autoComplete="off"
                        className="border-0 me-5 text-center"
                        style={{ backgroundColor: "white" }}
                        type="text"
                        disabled
                        id="empID"
                        value={workAddress}
                      />

                      <label htmlFor="empPlace">مكان العمل</label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        autoComplete="off"
                        className="border-0 me-5 text-center"
                        style={{ backgroundColor: "white" }}
                        type="number"
                        disabled
                        id="empID"
                        value={ssn}
                      />

                      <label htmlFor="empNaID">رقم البطاقة</label>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className="text-end">
                    <div className="d-flex justify-content-between align-items-center me-5">
                      <input
                        autoComplete="off"
                        className="border-0 me-5 text-center"
                        style={{ backgroundColor: "white" }}
                        type="number"
                        disabled
                        id="empID"
                        value={phone}
                      />

                      <label htmlFor="empPhone">رقم الهاتف</label>
                    </div>
                  </ListGroup.Item>
                  {!isAccountant&&<button
                    className={`btn btn-primary fs-6 p-1 mt-2 float-start`}
                    onClick={openModal}
                  >
                    أضافة وردية
                  </button>}
                </>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
      {show && (
        <>
          {shifts.length > 0 ? (
            <Row className="centered my-5">
              <h4 className="text-center">ورديات سابقة </h4>

              <Col sm={8}>
                <hr className="m-0 mt-1" />
                <table className="table text-center">
                  <thead>
                    <tr>
                      <th scope="col">صافى أيام العمل </th>
                      <th scope="col"> ألايام مخصومة </th>
                      <th scope="col"> ألايام مكافئة </th>
                      <th scope="col">وقت النزول</th>
                      <th scope="col">تاريخ النزول</th>
                      <th scope="col">وقت الصعود</th>
                      <th scope="col">تاريخ الصعود</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shifts.map((item) => (
                      <tr key={item.id}>
                        <td>
                          {item.duration ?? '---'} {/* Provide a default value or display '---' if duration is null */}
                        </td>
                        <td>{item.deduction ?? '---'}</td>
                        <td>{item.bonus ?? '---'}</td>
                        <td>{item.endTime ? item.endTime.slice(11, 16) : '---'}</td>
                        <td>{item.endTime ? item.endTime.slice(0, 10) : '---'}</td>
                        <td>{item.startTime.slice(11, 16)}</td>
                        <td>{item.startTime.slice(0, 10)}</td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </Col>
            </Row>
          ) : (
            <p className="text-center ">لا يوجد ورديات سابقة لهذا الموظف</p>
          )}
        </>
      )}
      <ManageShifts
        onClose={closeModal}
        isOpen={isOpen}
        inShift={inShift}
        id={id}
currentShift={currentShift&&currentShift}
      />
    </Container>
  );
}

export default Shifts;
