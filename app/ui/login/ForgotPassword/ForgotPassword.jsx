'use client'
import { Box, Button, TextField } from '@mui/material';
import React, { useContext, useState } from 'react';
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/router';
import handleforget from '@/handle/forgetpassword'
import Loading from '@/components/loading'

function Index() {
  const {state, setState} = useContext(StateContext);
  const HandleForget = handleforget();
  return (
    
    <Box>
      <Box className="forgot" p={3} sx={{display: 'flex',flexDirection: 'column',background: 'width',width: '440px',height: '550px' , 
        borderRadius: "15px",marginLeft: 'auto',mr: 5,mt: 1,boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',justifyContent:'space-between'}}>
        <Box sx={{background:'', width:'90%',mx:'auto'}}>
         <Box sx={{textAlign: 'left', color: '#1F2939', fontSize: 20, fontWeight: '600',mt:1 }}>Forgot your password?</Box>
         <Box sx={{textAlign: 'left', color: '#778296', fontSize: 15,  lineHeight: 3,}}>We need your email to reset your password</Box>
        </Box>
        <Box sx={{display:'flex', justifyContent:'center'}}>
        <TextField id="standard-basic" label="Email"  variant="standard" value={state.email} onChange={HandleForget.Email} sx={{ width: '90%' }} />
        </Box>
        <Box sx={{display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center', fontSize: 11}}>
          <Button variant="text" onClick={HandleForget.back}  sx={{color:'#828895',textTransform: 'capitalize', fontSize: 14, fontWeight:'', '&:hover':{background:'none',color:'#1F2939'}, '&:active':{background:'none'}}} >Back to sign in</Button>
          <Button variant="contained" onClick={HandleForget.workspace} sx={{mt:'5px', transition:'transform 0.3s ease','&:hover': {transform: 'scale(1.03)',},}} style={{background: '#84BAA1',width: '90%',height:'42px', textTransform: 'capitalize',boxShadow:'0px 0px 0px',borderRadius:'8px',fontWeight:'600'}}>{state.loading?<Loading/>:"Get recovery link"}</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Index;
