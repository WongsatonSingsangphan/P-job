'use client'
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

function Authenticator() {
    const {state, setState} = useContext(StateContext);
    const router = useRouter();

    const fetchLogoImage = () => {
      fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/getLogoBinary/${state.decode_token.CompanyID}`)
          .then(response => response.blob())
          .then(blob => {
              const imageUrl = URL.createObjectURL(blob);
              setState((prevData) => ({ ...prevData, logoImage: imageUrl }));
          })
          .catch(error => console.error("Error fetching binary data:", error));
  };

  const tryanother=()=>{
    router.push('/Mfa'); 

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
            fetchLogoImage();
            router.push('/Authenticator');

          } else if(result.statusqr) {
            fetchLogoImage();
            router.push('/Authenverify');
          } else {
            fetchLogoImage();
            router.push('/Authenticator');
          }
        })
        .catch(error => console.error('Error:', error));
    }
    const gotovelify = () => {
      router.push('/Authenverify');
    }
  return {getQR,gotovelify,tryanother}
}

export default Authenticator