import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";

const Layout = (props) => {
  const navigate = useNavigate(); // Move this line inside the component
  const isLoggedIn = localStorage.getItem("isLoggedIn")=== "true";


  useEffect(() => {
    if (!isLoggedIn && localStorage.getItem("token")==='') {
      navigate("/");
    }
  }, [isLoggedIn]);

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