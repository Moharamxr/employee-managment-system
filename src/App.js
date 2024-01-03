import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/sign-in/Sign-in.jsx";
import Employees from "./components/employees/Employees.jsx";
import Layout from "./components/layout/Layout.jsx";
import Accounting from "./components/accounting/Accounting.jsx";
import EmployeeDetails from "./components/employees/EmployeeDetails.jsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="details" element={<EmployeeDetails />} />
        <Route path="/accounting" element={<Accounting />} />
      </Routes>
    </Layout>
  );
}

export default App;
