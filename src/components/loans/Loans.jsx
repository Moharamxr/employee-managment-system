import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { useCallback } from 'react';
import { getAllLoans } from '../../services/loans.service';
import SearchIcon from "@mui/icons-material/Search";
import { getEmployeeById } from '../../services/employee.service';

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isPageLoading, setIsPageLoading] = useState(false);
  

  const [searchId, setSearchId] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);

  

  const fetchLoansData = useCallback(async () => {
    try {
      setIsPageLoading(true);
      const data = await getAllLoans(true);
      setLoans(data.debts);
      setError('');
      setIsPageLoading(false);
    } catch (error) {
      setError(true);
      setIsPageLoading(false);
      const timeout = setTimeout(() => {
        setError(false);
      }, 3000);

      return () => clearTimeout(timeout);
    } finally {
      setError(false);
      setIsPageLoading(false);
    }

  }, []);

  useEffect(() => {
    fetchLoansData();
  }, [fetchLoansData]);

  const handleSearch = async () => {
    if (searchId && searchId > 0) {
      try {
        console.log("Search ID:", searchId);
        setSearchLoading(true);
        const data = await getEmployeeById(searchId);
        if (data && data.message === "Employee fetched successfully") {
          navigate(`details/${searchId}`);
        } else {
          setSearchError(true);
          const timeout = setTimeout(() => {
            setSearchError(false);
          }, 3000);
          return () => clearTimeout(timeout);
        }
      } catch (error) {
        setSearchError(true);
        const timeout = setTimeout(() => {
          setSearchError(false);
        }, 3000);
        return () => clearTimeout(timeout);
      } finally {
        
        setSearchLoading(false);
      }
    } else {
      setSearchError(true);
      const timeout = setTimeout(() => {
        setSearchError(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
    
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  

  return (
    <Container>
      <Row className='centered'>
      <Col md={7} ><h4 className='text-end my-3'>ديون الموظفين</h4></Col>
        <Col lg={5} xs={10}>
          
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
              disabled={searchLoading}
            >
              {searchLoading ? "جارى البحث" : <SearchIcon />}
            </button>
            <div className="form-outline">
              <input
                autoComplete="off"
                type="number"
                id="form1"
                className="form-control text-center"
                placeholder="ابحث بكود الموظف"
                style={{ width: "15rem" }}
                onChange={(e) => setSearchId(e.target.value)}
                onKeyDown={handleKeyPress}
              />
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          {error && <p className="text-danger text-center">{error}</p>}
          

          <table className="table my-custom-table text-center mt-2">
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
              {!isPageLoading && loans.length > 0 && loans.map((item) => (
                <tr
                  key={item.employee.id}
                  onClick={() => navigate(`details/${item.employee.id}`)}
                >
                  <td>{item.employee.phone}</td>
                  <td>{item.employee.ssn}</td>
                  <td>{item.employee.workAddress}</td>
                  <td>{item.employee.jobRole}</td>
                  <td>{item.employee.name}</td>
                  <th scope="row">{item.employee.id}</th>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="centered"> {isPageLoading && <CircularProgress />}</div>
          {!isPageLoading && loans.length === 0 && <p className='text-center'>لا يوجد ديون</p>}
        </Col>
      </Row>



      {/* <AddLoan
        isOpen={isOpen}
        onClose={closeModal}
      /> */}
    </Container>
  )
}

export default Loans