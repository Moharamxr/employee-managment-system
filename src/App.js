import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar.tsx";
import SignIn from "./components/sign-in/Sign-in.tsx";
import Employees from "./components/employees/Employees.tsx";
import Layout from "./components/layout/Layout.tsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </Layout>
  );
}

export default App;
