'use client'
import { StateContext } from '@/context/Context';
import { Box, FormControlLabel, Switch } from '@mui/material';
import React, { useContext, useRef, useState,useCallback } from 'react'
import { useRouter } from "next/navigation";

function managerlist() {
    const router = useRouter();
    const handleNewRequest = ()=>{
        router.push('/ShareDocument');
    }


  return {handleNewRequest};}

export default managerlist

