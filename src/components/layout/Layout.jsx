import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";
import { logout } from "../../services/auth.service.js";

const Layout = (props) => {
  const navigate = useNavigate(); // Move this line inside the component
  const isLoggedIn = localStorage.getItem("isLoggedIn")=== "true";

  useEffect(() => {
    const signOut = () => {
      logout();
      localStorage.setItem('token', '');
      localStorage.setItem("isLoggedIn", false);
      // console.log("logged out");
      navigate("/login");
    };
  
    if (!isLoggedIn && localStorage.getItem("token") === '') {
      navigate("/login");
      // console.log('goes to login');
    }
  
    const timeoutId = setTimeout(function () {
      signOut();
    }, 48 * 60 * 60 * 1000);
  
    return () => clearTimeout(timeoutId);
  }, [isLoggedIn, navigate]);
  
  return (
    <Box sx={{ display: "flex" }}>
      
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 0, marginTop: 9 }}>
        {props.children}
      </Box>
    </Box>
  );
};

export default Layout;