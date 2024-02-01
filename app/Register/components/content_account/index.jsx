import { data_register } from '@/data/register'
import { Box } from '@mui/material'
import Image from 'next/image'
import React, { useContext } from 'react'
import accountimg from '@/assets/assets/images/register/account.png'
import { StateContext } from '@/context/Context'

function index() {
  const { state, setState } = useContext(StateContext);

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Image alt="account" src={accountimg} />
      <Box sx={{ ml: 5 }}>
        <Box sx={{ fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: `Hello good morning ${state.email} <br/> Welcome to ChicCRM registration process now you are in` }} />
        <Box sx={{ fontSize: "12px", mt: 0.5 }} dangerouslySetInnerHTML={{ __html: data_register[0].detail_msg }} />
      </Box>
    </Box>
  );
}

export default index;
