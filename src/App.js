import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/sign-in/Sign-in.jsx";
import Employees from "./components/employees/Employees.jsx";
import Layout from "./components/layout/Layout.jsx";
import Accounting from "./components/accounting/Accounting.jsx";
import EmployeeDetails from "./components/employees/EmployeeDetails.jsx";
import Shifts from "./components/shifts/Shifts.jsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/details/:id" element={<EmployeeDetails />} />
        <Route path="/accounting" element={<Accounting />} />
        <Route path="/shifts" element={<Shifts />} />
        <Route path="*" element={<SignIn />} />
      </Routes>
    </Layout>
  );
}

export default App;