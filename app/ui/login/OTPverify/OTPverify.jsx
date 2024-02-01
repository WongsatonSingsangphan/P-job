'use client'
import React, { useContext } from 'react'
import VerificationCodeInput from './VerificationCodeInput'
import { Box, Button } from '@mui/material';
import handleotp from "@/handle/otpvelify"
import handleqrcode from "@/handle/Authenticator"
import { StateContext } from '@/context/Context';
import Loading from '@/components/loading'
function OTPverify() {
  const HandleOTP = handleotp();
  const HandleQRCode = handleqrcode();
  const {state, setState} = useContext(StateContext);
  return (
    <Box p={3} sx={{display: 'flex',flexDirection: 'column',background: 'width',width: '400px',height: '500px',
    borderRadius: "15px",marginLeft: 'auto',mr: 5,mt: 1,boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',justifyContent:'space-between'}}>
    <Box>
      <Box sx={{fontWeight:'800'}}>You are almost done!</Box> 
      <br></br>
      <Box>Please type the code we sent you to your email <strong>{state.email}</strong> and verify that it's really you.</Box>
    </Box>
    <Box>
    <Box>Code</Box>
    <VerificationCodeInput onChange={HandleOTP.handleCodeChange} />
    <Box sx={{mt:'10px',display:'flex',gap:'10px'}}>
      <p style={{fontSize:'14px'}}>Reference No :</p>
      <p style={{fontSize:'14px',fontWeight:'600'}}>{state.referenceID}</p>
    </Box>
    <Box sx={{display:'flex',justifyContent:'center',mt:'px'}}>
    <Button style={{fontSize:'14px', fontWeight:'600',color:'#4D94FB',textTransform:'capitalize',transition:'color 0.3s'}} onClick={HandleOTP.sendOTPEmail} hoverStyle={{color:'red'}}>Resend Code</Button>
    </Box>
    </Box>
    <Box sx={{display:'flex',justifyContent:'center'}}>
    <Button variant="contained" onClick={HandleOTP.workspace} style={{background:'#84BAA1',width:'90%',textTransform:'capitalize'}}>{state.loading?(<Loading/>):"Next"}</Button>
    </Box>
    <Button variant="text" style={{textTransform:"capitalize",color:"gray"}} onClick={HandleQRCode.tryanother}>Try Another method</Button>
  </Box>
  )
}
export default OTPverify