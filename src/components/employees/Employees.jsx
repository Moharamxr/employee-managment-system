import React, { useCallback, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { useNavigate } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import { Col, Container, Row } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import {
  getAllEmployees,
  getEmployeeById,
  searchForAll,
} from "../../services/employee.service";
import CloseIcon from '@mui/icons-material/Close';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const [searchError2, setSearchError2] = useState(false);
  const [error, setError] = useState("");
  const [searchId, setSearchId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchLoading2, setSearchLoading2] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [showSearchData, setShowSearchData] = useState(false);
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
      const data = await getAllEmployees();
      setEmployees(data.employees);
      setError('');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/");
        return;
      }
      setError(error.response.data.error);
    }
  }, [navigate]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleSearch = async () => {
    console.log("Search ID:", searchId);
    if (searchId === "") {
      return;
    }
    try {
      setSearchLoading(true);
      await getEmployeeById(searchId);
      navigate(`details/${searchId}`);
      setSearchError(false);
      setSearchLoading(false);
    } catch (error) {
      setSearchError(true);
      setSearchLoading(false);

      const timeout = setTimeout(() => {
        setSearchError(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  };

  const handleBigSearch = async () => {
    console.log("searchInput :", searchInput);

    try {
      setSearchLoading2(true);

      if (searchInput !== "" && !showSearchData) {
        const data = await searchForAll(searchInput);

        setShowSearchData(true);
        setSearchData(data.employees);
        setSearchError2(false);
      } else {
        setShowSearchData(false);
        setSearchData([]);
      }

      setSearchLoading2(false);
    } catch (error) {
      setSearchError2(true);
      setSearchLoading2(false);

      const timeout = setTimeout(() => {
        setSearchError2(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  };

  const whichData = () => {
    if (showSearchData) {
      return searchData || [];
    } else {
      return employees || [];
    }
  };

  const DATA = whichData();
  return (
    <Container>
      <Row>
        <Col xs={6} className="px-0">
          {searchError2 && (
            <p className="text-danger text-center"> غير صحيح حاول مجدداً</p>
          )}
          <div className="input-group my-4 centered">
            <button
              type="button"
              className={`btn btn-${showSearchData?'secondary':'primary'}`}
              style={{ height: "38px" }}
              data-mdb-ripple-init
              onClick={handleBigSearch}
              disabled={searchLoading2}
            >
              {searchLoading2 ? "جارى البحث" : showSearchData ? <CloseIcon /> : <SearchIcon />}
            </button>
            <div className="form-outline">
              <input
                autoComplete="off"
                type="search"
                id="form2"
                className="form-control text-center"
                placeholder="ابحث بأسم, وظيفة, مكان عمل, رقم هاتف, رقم قومى "
                style={{ width: "400px" }}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
        </Col>
        <Col xs={5}>
          {searchError && (
            <p className="text-danger text-center">كود غير صحيح حاول مجدداً</p>
          )}
          <div className="input-group my-4 centered">
            <button
              type="button"
              className="btn btn-primary"
              style={{ height: "38px" }}
              data-mdb-ripple-init
              onClick={handleSearch}
            >
              {searchLoading ? "جارى البحث" : <SearchIcon />}
            </button>
            <div className="form-outline">
              <input
                autoComplete="off"
                type="search"
                id="form1"
                className="form-control text-center"
                placeholder="ابحث بكود الموظف"
                style={{ width: "250px" }}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          {error && <p className="text-danger text-center">{error}</p>}
          <table className="table my-custom-table text-end">
            <thead>
              <tr>
                <th scope="col">رقم الهاتف</th>
                <th scope="col">رقم البطاقة</th>
                <th scope="col">مكان العمل</th>
                <th scope="col">الوظيفة</th>
                <th scope="col">أسم الموظف</th>
                <th scope="col">كود الموظف#</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(DATA) && DATA.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => navigate(`details/${item.id}`)}
                >
                  <td>{item.phone}</td>
                  <td>{item.ssn}</td>
                  <td>{item.workAddress}</td>
                  <td>{item.jobRole}</td>
                  <td>{item.name}</td>
                  <th scope="row">{item.id}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>

      <Fab
        aria-label="Add"
        color="primary"
        onClick={openModal}
        style={{ position: "absolute", top: 90, right: 16 }}
      >
        <AddIcon />
      </Fab>
      <AddEmployee
        isOpen={isOpen}
        onClose={closeModal}
      />
    </Container>
  );
};

export default Employees;