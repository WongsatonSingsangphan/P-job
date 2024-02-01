'use client'
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

function addcompany() {
    const {state, setState} = useContext(StateContext);
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
   
    const Confirm = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", state.confirmlink);
        
        var raw = JSON.stringify({
          "username": state.email,
          "newpassword": state.password,
          "requires_action": ""
        });
        
        var requestOptions = {
          method: 'PATCH',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/InitPasswordChicCRM`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result);
            if (result.status === "OK") {
              setState({...state,resetpassword: true})
            } else {
              console.log('Unexpected result status:', result.status);
            }
          })
          .catch(error => console.error('Error:', error));
      };
      const Changepassword = () => {
        setState((prevData) => ({ ...prevData,loading: true }));
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", state.confirmlink);

        var raw = JSON.stringify({
          "username": state.email,
          "newpassword": state.password
        });

        var requestOptions = {
          method: 'PATCH',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/ResetPasswordChicCRM`, requestOptions)
          .then(response => response.json())
          .then(result => {
            if (result.status === "OK") {
              setState({...state,resetpassword: true,loading:false})
            } else {
              console.log('Unexpected result status:', result.status);
            }
          })
          .catch(error => console.error('Error:', error));
      };

        const handleTogglePassword = () => {
        setShowPassword(!showPassword);
      };
    const isPasswordValid = () => {
      const hasMinLength = password.length >= 8;
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /\d/.test(password);
      return hasMinLength && hasUpperCase && hasLowerCase && hasNumber;
    };
  return {handleTogglePassword,isPasswordValid,Confirm,Changepassword}
}

export default addcompany

