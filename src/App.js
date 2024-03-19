import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/sign-in/Sign-in.jsx";
import Employees from "./components/employees/Employees.jsx";
import Layout from "./components/layout/Layout.jsx";
import Accounting from "./components/accounting/Accounting.jsx";
import EmployeeDetails from "./components/employees/EmployeeDetails.jsx";
import Shifts from "./components/shifts/Shifts.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.js";
import Plank from "./components/Plank.jsx";
import Loans from "./components/loans/Loans.jsx";
import LoanDetails from "./components/loans/LoanDetails.jsx";
import PaymentDetails from "./components/loans/PaymentsDetails.jsx";
import Salaries from "./components/salaries/Salaries.jsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/" exact>
            <Route index element={<Employees />} />
            <Route path="details/:id" element={<EmployeeDetails />} />
          </Route>
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/accounting/:id" element={<Accounting />} />
          <Route path="/shifts" element={<Shifts />} />
          <Route path="/salaries" element={<Salaries />} />
          <Route path="/loans" exact>
            <Route index element={<Loans />} />
            <Route path="pay/:id" element={<PaymentDetails />} />
            <Route path="details/:id" element={<LoanDetails />} />
          </Route>
        </Route>
        <Route path="/login" element={<SignIn />} />
        <Route path="*" element={<Plank />} />
      </Routes>
    </Layout>
  );
}

export default App;
