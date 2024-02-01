"use client";
import * as React from 'react';
import { Box } from '@mui/material'
import AppBar from './components/appbar'
import Title from './components/title'
import TableList from './components/table'
import BtNewReq from './components/button'
import GetAllOrder from '@/services/getorder'
import { StateContext } from '@/context/Context';

function page() {
  const {state, setState} = React.useContext(StateContext);
  useEffect(() => {
    setState((prevData) => ({ ...prevData, backdrop: false}));
  }, [])
  
  return (
    <Box>
      <GetAllOrder/>
      <AppBar/>
      <Title/>
      <TableList/>
      <BtNewReq/>
    </Box>
  )
}

export default page