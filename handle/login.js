'use client'
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

function login() {
    const router = useRouter();
    const {state, setState} = useContext(StateContext);
    const handleTogglePassword = () => {
    setState({...state,showPassword: !state.showPassword});
    };
    const handleSignInClick = () => {
      setState((prevData) => ({ ...prevData,loading: true }));
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        "username": state.email,
        "password": state.Password
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/LoginChicCRM`, requestOptions)
        .then(response => response.json())
        .then(result => {
          setState((prevData) => ({ ...prevData,loading: false }));
          if (result.status === "OK") {
            const decodedToken = JSON.parse(atob(result.token.split('.')[1]));
            localStorage.setItem("decode_token", JSON.stringify(decodedToken));
            router.push('/Mfa'); 
          } else {
            setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error" }));
            setTimeout(() => {
              window.location.reload();
            }, 3000);          
          }
          console.log("🚀 ~ handleSignInClick ~ result:", result)
        })
        .catch(error => console.log('error', error));
    };
  const handleSignUpClick = () => {
    setState((prevData) => ({ ...prevData,loading: true }));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "username": state.email
    });
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/validateDomainChicCRM`, requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        if (result.match === true) {
            setState({
                ...state,
                companyID: result.data.CompanyID,
                datacompany: result.data,
                companyname: result.data.Companyname,
                alias: result.data.CompanyAlias,
                no: result.data.AddressNo,
                street: result.data.Address1En,
                googlemaps: result.data.Geolocation,
                selectedProvince: result.data.Province,
                selectedAmphoe: result.data.District,
                selectedTambon: result.data.SubDistrict,
                zipcode: result.data.Zipcode,
                country: result.data.Country,  
            });
            setState((prevData) => ({ ...prevData,loading: false }));
            router.push('/Selectcompany');
        } else if(result.message === "domain does not match. To proceed, please check your email") {
          setState({...state,open: true})
            var formdata = new FormData();
            formdata.append("to", state.email);
            formdata.append("subject", "Registration");
            formdata.append("fromEmail", "worapon@tracthai.com");
            formdata.append("body", "Please click the link provided below to proceed.");
            formdata.append("body1", "MODULE: chiCRM");
            formdata.append("body2", "ADMIN: TRAC-THAI");
            formdata.append("bodylink", "http://localhost:3000/CreateCompany");
            formdata.append("linkname", "Registration Link");

            var requestOptions = {
                method: 'POST',
                body: formdata,
                redirect: 'follow',
            };
            fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/mailChicCRM`, requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
            console.log("Status is not OK:", result.status);
        }else if(result.message === "username already exists") {
          setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error" }));
          setTimeout(() => {
            setState((prevData) => ({ ...prevData, alert: false}));
          }, 2000);
        }
        else {
          setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error" }));
          setTimeout(() => {
            setState((prevData) => ({ ...prevData, alert: false}));
          }, 2000);

        }
    })
    .catch(error => console.error("Error fetching data:", error));
        };
          const ForgotPassword = () => {
            setState({...state,backdrop: true});
            setTimeout(() => {
              setState((prevData) => ({ ...prevData, backdrop: false}));
            }, 1000);
            router.push('/ForgotPassword')
          }
          const Email= (e) => {
            setState({...state,email: e.target.value,});
          };
          const Password = (e) => {
            setState({...state,Password: e.target.value,});
          };

          return {handleTogglePassword,handleSignInClick,handleSignUpClick,ForgotPassword,Email,Password}
        }

        export default login

