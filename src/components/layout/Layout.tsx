import { Box } from '@mui/material';
import React from 'react'
import Navbar from '../navbar/Navbar.tsx';

const Layout = (props) => {
    const { children}= props;

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1, p: 0  ,marginTop:8}}>
        {children}
      </Box>
      
      </Box>
  )
}

export default Layout