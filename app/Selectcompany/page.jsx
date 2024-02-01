"use client"
import React, { useContext } from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { StateContext } from "@/context/Context";
import Backdrop from '@/components/backdrop/backdrop' 

const page = () => {
  
  const router = useRouter();
  const { state, setState } = useContext(StateContext);
  const Register = () => {
     setState({...state,backdrop: true});
     setTimeout(() => {
      setState((prevData) => ({ ...prevData, backdrop: false}));
    }, 1000);
    router.push('/Register');
  }
  const CreateCompany = () => {
    setState({...state,backdrop: true});
    setTimeout(() => {
      setState((prevData) => ({ ...prevData, backdrop: false}));
    }, 1000);
    window.location.href="/CreateCompany"
  }
  return (
    <div
      className="h-screen"
      style={{
        background: `linear-gradient(108deg, #84BAA1 0%, #FFFBE2 100%), #F7FAFB`,
      }}
    >
      {state.backdrop?<Backdrop/>:""}
      <div className="bg-white h-screen w-4/5 p-16">
        <h2>Hi, Is this the company you work ?</h2>
        <p>Please select your company.</p>
        <div className="flex lg:flex-row flex-col items-center content-center">
          <Box onClick={Register} sx={{cursor: "pointer",transition: "background-color 0.3s ease","&:hover": {backgroundColor: "#your-hover-color",},}}   className="basis-2/6 rounded border border-[#C2CCE1] w-[300px] h-[310px] mr-3 mt-2 lg:mt-4 flex flex-col justify-between items-center content-center p-[30px] text-center" >
            <div>
            <Image
              src={state.datacompany?.CompanyLogo}
              alt="logo"
              width={100}
              height={100}
            />
            </div>
            <div>
              <h4>{state.datacompany.CompanyAlias}</h4>
            </div>
            <div className="my-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="52"
                height="4"
                viewBox="0 0 52 4"
                fill="none"
              >
                <path
                  d="M2 2H50"
                  stroke="#9FDBD6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p>
              {state.companyname} {state.datacompany.Province}, {state.datacompany.Zipcode} {state.datacompany.Country}.
              </p>
            </div>
          </Box>

          <div className="basis-2/6 rounded border border-[#C2CCE1] w-[300px] h-[310px] mr-3 mt-2 lg:mt-4 flex flex-col justify-between items-center content-center p-[30px] text-center">
            <Box onClick={CreateCompany} sx={{cursor: "pointer",transition: "background-color 0.3s ease","&:hover": {backgroundColor: "#your-hover-color",},}} className="mb-[5px] mt-[5px] lg:mb-[20px] lg:mt-[30px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="41"
                height="41"
                viewBox="0 0 41 41"
                fill="none"
              >
                <path
                  d="M19.9167 3V38"
                  stroke="#84BAA1"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d="M3 20.5L38 20.5"
                  stroke="#84BAA1"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </Box>
            <div>
              <h4>
                Add new your company
                <br />
                <br />
              </h4>
            </div>
            <div className="my-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="52"
                height="4"
                viewBox="0 0 52 4"
                fill="none"
              >
                <path
                  d="M2 2H50"
                  stroke="#9FDBD6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div>
              <p>For users who do not have a company listed in the options.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;