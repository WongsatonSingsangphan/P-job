'use client'
import {  output_data } from '@/data/confirm_register'
import { data_register} from '@/data/register'
import { Box, FormControl, Grid, Input, InputLabel, MenuItem, Radio, Select } from '@mui/material'
import React, { useContext } from 'react'
import handlechangeTitle from '@/handle/register'
import { StateContext } from '@/context/Context'

function index() {
    const {state, setState} = useContext(StateContext);
    const {HandlechangeTitle} =handlechangeTitle();
  return (
    <Box>
      <Box sx={{fontWeight:600,mb:3}}>{data_register[0].title_content2}</Box>
      {output_data.map((item, index) => (
        <Box key={index} sx={{display:"flex",flexDirection:"column"}} >
          <Box sx={{fontWeight:500}}>{item.form_title} : {item.form_title==="Name"?"Mr.thananchai Sittikun":item.form_title==="Job Title"?"Dev":item.form_title==="Phone number"?"090-008-0808":
          item.form_title==="Email"?"thananchai@tracthai.com":item.form_title==="Role"?"Super Admin":""}</Box>
        </Box>
      ))}
      <Box sx={{display:"flex",alignItems:"center",mt:2}}>
        <Radio style={{color:"#84BAA1"}} value="male"/>
        <Box>{data_register[0].req_confirm}</Box>
      </Box>
    </Box>
  )
}

export default index