'use client'

import { Box, Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import done from '@/assets/assets/images/done.png'
import Image from 'next/image';
import { StateContext } from '@/context/Context';

function Index() {
  const { state, setState } = useContext(StateContext);

  const [info, setInfo] = React.useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box>
      <Box p={3} sx={{display: 'flex',flexDirection: 'column',background: 'width',width: '400px',height: '500px',
        borderRadius: "15px",marginLeft: 'auto',mr: 5,mt: 1,boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'}}>
        <Box sx={{ justifyContent:'center',alignItems:'flex-start',flexDirection:'column',mt:8}}>
        <Box sx={{ width: '60px', height: 'auto' }}>
          <Image src={done} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> 
       </Box>    
        <br></br>
        <br></br>
         <Box sx={{ color: '#1F2939', fontSize: 18, mt:1,fontWeight:"400" }}>We have sent a verification link to your email address</Box>
         <br></br>
         <Box sx={{fontWeight:"600",fontSize:17}}>{state.email}</Box>
         <br></br>
         <Box sx={{ color: '#778296', fontSize: 15}}>Just click on the link in your email and you are done.</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Index;
