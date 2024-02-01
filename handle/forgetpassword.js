'use client';
import { StateContext } from '@/context/Context';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

function ForgetPassword() {
    const { state, setState } = useContext(StateContext);
    const router = useRouter();
    const sendMail = () => {
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

        fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT_GET}:${process.env.NEXT_PUBLIC_API_PORT_LOGIN}/api/RequestResetPasswordChicCRM`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.status === "OK") {
                setState((prevData) => ({ ...prevData,loading: false }));
                router.push('/ResetSuccess');
            } else {
                setState((prevData) => ({ ...prevData, alert: true, alert_text: result.message, alert_type: "error" }));
              console.log('Unexpected result status:', result.status);
            }
          })
          .catch(error => console.error('Error:', error));
    };
    const workspace = (code) => {
        sendMail();
    };
    const back = (code) => {
        router.push('/');
    };
    const Email = (e) => {
        setState({...state,email: e.target.value,});
      };
    return { Email, workspace,back };
}

export default ForgetPassword;
