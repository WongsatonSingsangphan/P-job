import { Box, Button } from '@mui/material';
import React, {useContext, useState} from 'react'
import Image from 'next/image';
import mail from '@/assets/assets/images/email.png'
import aut from '@/assets/assets/images/totp.png'
import { useRouter } from 'next/navigation';
import { StateContext } from '@/context/Context';
import Loading from '@/components/loading'


function SelectVerify() {
  const {state, setState} = useContext(StateContext);

  const router = useRouter();

  const [isClickedMail, setIsClickedMail] = useState(false);
  const [isClickedAut, setIsClickedAut] = useState(false);

  const handleImageClickMail = () => {
    setIsClickedMail(!isClickedMail);
    setIsClickedAut(false);

    console.log('Image clicked!');
  }

  const handleImageClickAut = () => {
    setIsClickedAut(!isClickedAut);
    setIsClickedMail(false);

    console.log('Image clicked!');
  }

  const sendOTPEmail = () => {
      
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var otpData = {
        "email": state.email
      };
      var otpRequestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(otpData),
        redirect: 'follow'
      };
      fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/sendOTPEmail`, otpRequestOptions)
      .then(response => response.json())  
      .then(result => {
        if (result.status === "OK") {
          setState({ ...state, referenceID: result.referenceID,loading: false});
          router.push('/OTPverify'); 
        } else {
          setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error" }));
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch(error => console.error('Error:', error));
    }

    const getQR = () =>{
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      var raw = JSON.stringify({
        "value": 1,
        "accountName": state.email
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/qrTOTP`, requestOptions)
      .then(response => response.json()) 
      .then(result => {
        console.log(result);
        if (result.status === "OK") {
          console.log("🚀 ~ getQR ~ result:", result)
          localStorage.setItem("qrcode", JSON.stringify(result.qrCodeURL));
          setState({ ...state, qrcodeurl: result.qrCodeURL });
          router.push('/Authenticator');

        } else if(result.statusqr===false&&(state.qrcode===""&&state.qrcodeurl==="")) {
          router.push('/Authenverify');
        } else {
          router.push('/Authenticator');
        }
      })
      .catch(error => console.error('Error:', error));
  }
  const handlenext = ()=>{
    if (isClickedMail){
      setState((prevData) => ({ ...prevData,loading: true }));
        router.push('/OTPverify'); 
        sendOTPEmail();
    }else if(isClickedAut){
        router.push('/Authenticator');
        getQR();
    }


  }
  return (
    <Box p={3} sx={{display: 'flex',flexDirection: 'column',background: '#ffffff',width: '400px',height: '500px',borderRadius: "15px",marginLeft: 'auto',mr: 5,mt: 1,boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',justifyContent:'space-between'}}>
      <Box>
        <Box sx={{fontWeight:'800'}}>Choose Authentication Method</Box> 
        <br></br>
        <Box>Please select the authentication method you'd like to use to verify your identity.</Box>
        <Box sx={{display:'flex',justifyContent:'center',mt:'30px',flexDirection:'column',gap:'15px'}}>
        <Box onClick={handleImageClickMail} sx={{background:'#F6F6F6',width:'100%',height:'105px',borderRadius:'12px',pl:'35px',display:'flex',flexDirection:'row',alignItems:'center',gap:'25px',boxShadow:isClickedMail ? 'inset 0 0 0 2px #84BAA1':'none',cursor:'pointer'}}>
            <Image src={mail} alt="Maill Icon" width={50} />
            <Box sx={{display:'flex',flexDirection:'column',gap:'4px'}}>
            <Box sx={{fontSize:'16px',fontWeight:'600'}}>via Email:</Box>
            <Box sx={{fontSize:'12px',fontWeight:'500',color:'#778296'}}>An OTP code will be sent to your <br/> email address.</Box>
            </Box>
          </Box>
          <Box onClick={handleImageClickAut} sx={{background:'#F6F6F6',width:'100%',height:'105px',borderRadius:'12px',pl:'35px',display:'flex',flexDirection:'row',alignItems:'center',gap:'25px',boxShadow:isClickedAut ? 'inset 0 0 0 2px #84BAA1':'none',cursor:'pointer'}}>
            <Image src={aut} alt="Maill Icon" width={50} />
            <Box sx={{display:'flex',flexDirection:'column',gap:'4px'}}>
            <Box sx={{fontSize:'16px',fontWeight:'600'}}>via Authenticator apps:</Box>
            <Box sx={{fontSize:'12px',fontWeight:'500',color:'#778296'}}>Authenticator requires code <br/> confirmation for verification.</Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Button onClick={handlenext} variant="contained" style={{background:'#84BAA1',width:'100%',textTransform:'capitalize',boxShadow:'0 0 0 0px'}} > {state.loading?<Loading/>:"Next"}</Button>
    </Box>
  )
}

export default SelectVerify