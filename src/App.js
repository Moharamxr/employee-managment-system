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

function App() {
  return (
    <Layout>
      <Routes>
        <Route element={<PrivateRoutes />}>

        <Route path="/" exact>
          <Route index element={<Employees />} />
          <Route path="details/:id" element={<EmployeeDetails />} />
        </Route>

        {/* <Route path="/" element={<Employees />} exact/>
        <Route path="/employees/details/:id" element={<EmployeeDetails />} /> */}

        <Route path="/accounting" element={<Accounting />} />
        <Route path="/shifts" element={<Shifts />} />
        </Route>
        <Route path="/login" element={<SignIn />} />
        <Route path="*" element={<Plank />} />
      </Routes>
    </Layout>
    
  );
}

export default App;
