import { data_register } from '@/data/register'
import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import accountimg from '@/assets/assets/images/register/account.png'

function index() {
  return (
    <Box sx={{display:"flex",alignItems:"center"}}>
    <Image alt="account" src={accountimg} />
    <Box sx={{ml:5}}>
      <Box sx={{fontWeight:600}} dangerouslySetInnerHTML={{ __html: data_register[0].title_msg }}/>
      <Box sx={{fontSize:"12px",mt:0.5}} dangerouslySetInnerHTML={{ __html: data_register[0].detail_msg }}/>
    </Box>
   </Box>
  )
}

export default index