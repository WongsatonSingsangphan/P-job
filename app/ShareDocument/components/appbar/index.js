'use client'
import { Box } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import Image from "next/image";
import Logotrac from "@/assets/assets/images/logotrac.png";
import { StateContext } from '@/context/Context';


function index() {
  const {state, setState} = useContext(StateContext);

  const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;

  // Use local storage only if it's available
  const storedLoginTime = isLocalStorageAvailable ? localStorage.getItem('loginTime') : null;
  const [loginTime, setLoginTime] = React.useState(
    storedLoginTime ? new Date(storedLoginTime) : new Date()
  );

  React.useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem('loginTime', loginTime);
    }
    
    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const elapsedTime = currentTime - loginTime;
      const formattedTime = formatElapsedTime(elapsedTime);
      document.getElementById('loginPeriod').innerText = `Login Period: ${formattedTime}`;
    }, 0);

    return () => clearInterval(intervalId);
  }, [loginTime]);

  const formatElapsedTime = (elapsedTime) => {
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / (1000 * 60)) % 60;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  return (
      <Box sx={{display:'flex',justifyContent:'space-between',p:2,pl:5,pr:5,pb:2}}>
        <div className=" flex flex-col lg:flex-row">
          <div className="mr-3" style={{cursor:"pointer",}}>
            <Image onClick={()=>{window.location.href = "/Workspace"}} src={Logotrac} alt="logo" priority={true} style={{ width: "90px", height: "90px", borderRadius: "99px" }} />
          </div>
          <div className="">
            <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center">
              <span style={{textTransform:"capitalize"}} className="text-lg font-semibold mr-1">
                {state.decode_token?.FirstnameOriginal} {state.decode_token?.SurnameTokenOriginal}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.1208 6.96758L15.9168 5.17157C16.462 4.62632 16.7346 4.3537 16.8804 4.0596C17.1577 3.50005 17.1577 2.8431 16.8804 2.28354C16.7346 1.98945 16.462 1.71682 15.9168 1.17157C15.3715 0.626323 15.0989 0.353698 14.8048 0.207962C14.2452 -0.0693207 13.5883 -0.0693207 13.0287 0.207962C12.7346 0.353698 12.462 0.626323 11.9168 1.17157L10.0981 2.99023C11.062 4.64083 12.4481 6.01639 14.1208 6.96758ZM8.64365 4.44469L1.77314 11.3152C1.34808 11.7403 1.13555 11.9528 0.995818 12.2139C0.856084 12.475 0.797138 12.7697 0.679248 13.3592L0.0638519 16.4361C-0.00267025 16.7687 -0.0359313 16.9351 0.0586767 17.0297C0.153285 17.1243 0.31959 17.091 0.6522 17.0245L3.72918 16.4091C4.31863 16.2912 4.61336 16.2323 4.87446 16.0925C5.13555 15.9528 5.34808 15.7403 5.77315 15.3152L12.6625 8.42579C11.0409 7.41014 9.66919 6.04785 8.64365 4.44469Z"
                  fill="#222222"
                />
              </svg>
            </div>
            <div>
              <span className="text-lg">{state.decode_token?.JobTitleOriginal}</span>
            </div>
            <div>
            <span id="loginPeriod" className="text-lg">Login Period: 00:00:00</span>
            </div>
          </div>
        </div>
        {/* //*?Left Appbar */}

        {/* //*&Right Appbar */}
        <div className="">
          <div>
            <Image src={Logotrac} alt="logo" priority={true} style={{ width: "90px", height: "90px",cursor:"pointer" }}/>
          </div>
        </div>
        {/* //*&Right Appbar */}
      </Box>
  )
}

export default index