"use client";
import React, { useContext } from "react";
import Addcompany from '../ui/register/addcompany/page'
import { StateContext } from "@/context/Context";
import { Box } from "@mui/material";

const page = () => {
    const {state, setState} = useContext(StateContext);
  return (
    <Box sx={{background: 'linear-gradient(90deg,#84BAA1, #FFFBE2 )',height:'auto'}}>
      <Box sx={{background:'#ffffff',width:'80%',height:'auto'}}>
      <Addcompany/>
      </Box>
    </Box>
  );
};

export default page;