
'use client'

import { StateContext } from '@/context/Context';
import { Box } from '@mui/material';
import Image from 'next/image';
import React, { useContext } from 'react'
import ContentAccount from './components/content_account'
import ContentCompany from './components/content_company'
import ContentPersonal from './components/content_personal'
import Button from './components/button'
import Map from './components/map'
function page() {
  const {state, setState} = useContext(StateContext);

  return (
    <Box sx={{background: `linear-gradient(108deg, #84BAA1 0%, #FFFBE2 100%), #F7FAFB`,display:"flex",height:"100vh"}}>
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-around",p:5,width:"85%",height:"100vh",background:"#fff",borderRadius:"0px 14px 14px 0px"}}>
       <Box>
        <ContentAccount/>
        <ContentCompany/>
        <ContentPersonal/>
        <Button/>
       </Box>
       <Box>
        <Map/>
       </Box>
      </Box>
    </Box>
  )
}

export default page