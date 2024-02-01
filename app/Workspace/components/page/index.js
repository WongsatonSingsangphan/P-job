"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logotrac from "@/assets/assets/images/logotrac.png";
import CarReserve from "@/assets/assets/images/workspace/CarReserve.png";
import MyOpportunity from "@/assets/assets/images/workspace/MyOpportunity.png";
import RemoteSupport from "@/assets/assets/images/workspace/RemoteSupport.png";
import ShareDocument from "@/assets/assets/images/workspace/ShareDocument.png";
import UnderReview from "@/assets/assets/images/workspace/UnderReview.png";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { StateContext } from "@/context/Context";
import { Button, Box } from "@mui/material";
import Backdrop from '@/components/backdrop/backdrop' 

const page = () => {
  const { state, setState } = useContext(StateContext);
  const router = useRouter(); 
  
  const sharedocumentRouter = () => {
    setState((prevData) => ({ ...prevData, backdrop: true}));
    setTimeout(() => {
      setState((prevData) => ({ ...prevData, backdrop: false}));
    }, 2000);          
    if(state.decode_token.Role==="admin"){
      router.push("/RequestList");
    }else{
      router.push("/ShareDocument");
    }
    };

  const remotesupportRouter = () => {
    router.push("/remotesupport");
  };
  const myopportunityRouter = () => {
    router.push("/myopportunity");
  };
  const carreserveRouter = () => {
    router.push("/carreserve");
  };
  const underreviewRouter = () => {
    router.push("/underreview");
  };
  const orgmbatFeature = state?.memberAuthorization?.orgmbat_feature;

  const [sharedocument, setSharedocument] = useState(false);
  const [remotesupport, setRemotesupport] = useState(false);
  const [myopportunity, setMyopportunity] = useState(false);
  const [carreserve, setCarreserve] = useState(false);
  const [underreview, setUnderreview] = useState(false);

  useEffect(() => {
    if (orgmbatFeature) {
      setSharedocument(orgmbatFeature.includes("#sharedocument"));
      setRemotesupport(orgmbatFeature.includes("#remotesupport"));
      setMyopportunity(orgmbatFeature.includes("#myopportunity"));
      setCarreserve(orgmbatFeature.includes("#carreserve"));
      setUnderreview(orgmbatFeature.includes("#underreview"));
    }
  }, [orgmbatFeature]);

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

  const handleclicklogout = () => {
    localStorage.removeItem("ally-supports-cache")
    localStorage.removeItem("decode_token")
    localStorage.removeItem("loginTime")
    window.location.href="/"
  }
  const Notallowed =()=>{

  }


  return (
    <>
    <Backdrop/>
      <div className="max-w-screen-xl p-2 lg:p-0 container mx-auto my-2 lg:my-12 flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center">
      <div className=" flex flex-col lg:flex-row">
          <div className="mr-3" style={{cursor:"pointer",}}>
            <Image src={Logotrac} alt="logo" priority={true} style={{ width: "90px", height: "90px", borderRadius: "99px" }} />
          </div>
          <div className="">
            <div className="flex flex-col lg:flex-row justify-start lg:justify-between items-start lg:items-center">
              <span style={{textTransform:"capitalize"}} className="text-lg font-semibold mr-1">
              {state.decode_token.FirstnameOriginal?state.decode_token?.FirstnameOriginal:state.decode_token?.Firstname} {state.decode_token.SurnameTokenOriginal?state.decode_token?.SurnameTokenOriginal:state.decode_token?.Surname}
              </span>
              <Box sx={{display:'flex',gap:'7px',ml:'10px'}}>
                <Button disabled style={{background:'#E4E4E4',textTransform:'capitalize'}}>Edit Profile</Button>
                <Button onClick={handleclicklogout} style={{background:'#F95353',color:'#fff',borderRadius:'4px',textTransform:'capitalize'}}>Logout</Button>
              </Box>
            </div>
            <div>
            <span className="text-lg">{state.decode_token.JobTitleOriginal?state.decode_token?.JobTitleOriginal:state.decode_token?.Role}</span>
            </div>
            <div>
            <span id="loginPeriod" className="text-lg">Login Period: 00:00:00</span>
            </div>
          </div>
        </div>
        <div className="m-2">
          <div>
            <Image
              src={state.decode_token.CompanyLogoOriginal?state.decode_token?.CompanyLogoOriginal:Logotrac}
              alt="logo"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl p-2 container mx-auto my-2 lg:my-12">
        <h3 className="my-2 lg:my-5">My work space</h3>
        <div className="flex flex-col lg:flex-row">
          <div>
            {state.memberAuthorization?.orgmbat_feature||state.leadAuthorization?.orgmbat_feature==="#securedoc" ? (
              <div
                onClick={state.decode_token?.Role==="admin"?Notallowed:sharedocumentRouter}
                // className="font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-gray-200"
                className={`font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg  transition-colors duration-300 ${state.decode_token?.Role==="admin"?"bg-gray-100":""}   ${state.decode_token?.Role==="admin"?"":"cursor-pointer"} ${state.decode_token?.Role==="admin"?"":"hover:bg-gray-200"} `}
              >
                <Image
                  src={ShareDocument}
                  alt="logo"
                  style={{ width: "70px", height: "75px",filter:state.decode_token?.Role==="admin"?"grayscale(1)":"" }}
                />
                <div className="my-3">
                  Secure
                  <br />
                  Doc
                </div>
              </div>
            ) : null}
          </div>

          <div>
          {state.memberAuthorization?.orgmbat_feature||state.leadAuthorization?.orgmbat_feature==="#securedoc" ? (
              <div
                onClick={Notallowed}
                className={`font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg  transition-colors duration-300  bg-gray-100 `}
              >
                <Image
                  src={RemoteSupport}
                  alt="logo"
                  style={{ width: "70px", height: "75px",filter:"grayscale(1)" }}
                />
                <div className="my-3">
                Remote
                  <br />
                  Support
                </div>
              </div>
            ) : null}
          </div>


          <div>
          {state.memberAuthorization?.orgmbat_feature||state.leadAuthorization?.orgmbat_feature==="#securedoc" ? (
              <div
                onClick={Notallowed}
                className={`font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg  transition-colors duration-300  bg-gray-100 `}              >
                <Image
                  src={MyOpportunity}
                  alt="logo"
                  style={{ width: "70px", height: "75px",filter:"grayscale(1)" }}/>
                <div className="my-3">
                  My
                  <br />
                  Opportunity
                </div>
              </div>
            ) : null}
          </div>

          <div>
          {state.memberAuthorization?.orgmbat_feature||state.leadAuthorization?.orgmbat_feature==="#securedoc" ? (
              <div
              onClick={Notallowed}
              className={`font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg  transition-colors duration-300  bg-gray-100 `}              >
                <Image
                  src={CarReserve}
                  alt="logo"
                  style={{ width: "70px", height: "75px",filter:"grayscale(1)" }}/>
                <div className="my-3">
                  Car
                  <br />
                  Reserve
                </div>
              </div>
            ) : null}
          </div>

          <div>
          {state.memberAuthorization?.orgmbat_feature||state.leadAuthorization?.orgmbat_feature==="#securedoc" ? (
              <div
                onClick={state.decode_token?.Role==="user"?Notallowed:sharedocumentRouter}
                className={`font-semibold mr-0 lg:mr-4 my-2 text-center flex flex-col items-center justify-center w-48 h-48 px-6 py-4 border border-gray-300 rounded-lg  transition-colors duration-300 ${state.decode_token?.Role==="user"?"bg-gray-100":""}   ${state.decode_token?.Role==="user"?"":"cursor-pointer"} ${state.decode_token?.Role==="user"?"":"hover:bg-gray-200"} `}
              >
                <Image
                  src={UnderReview}
                  alt="logo"
                  style={{ width: "70px", height: "75px",filter:state.decode_token?.Role==="user"?"grayscale(1)":"" }}
                />
                <div className="my-3">
                 Under
                  <br />
                  Review
                </div>
              </div>
            ) : null}
          </div> 
        </div>
      </div>
    </>
  );
};

export default page;