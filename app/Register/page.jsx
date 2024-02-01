
'use client'
import { StateContext } from '@/context/Context';
import { Box, Grid } from '@mui/material';
import React, { useContext, useState } from 'react'
import ContentAccount from './components/content_account'
import ContentCompany from './components/content_company'
import ContentPersonal from './components/content_personal'
import Button from './components/button'
import Map from './components/map'
function page() {
  const {state, setState} = useContext(StateContext);
  return (
    <Box sx={{ background: `linear-gradient(108deg, #84BAA1 0%, #FFFBE2 100%)`,  height: "auto" }}>
  <Grid container >
    <Grid item >
      <Box sx={{  display: { md: 'flex', xs: 'block' }, alignItems: "center", p: 5, height: "auto",width:"85%", background: "#fff", borderRadius: "0px 14px 14px 0px" }}>
        <Box pt >
          <ContentAccount />
          <ContentCompany />
          <ContentPersonal />
          <Button />
        </Box>
        <Map/>
      </Box>
    </Grid>
  </Grid>
</Box>
  )
}

export default page