import { Box } from '@mui/material'
import React from 'react'
import arrow from '@/assets/assets/images/register/arrow.png'
import Image from 'next/image'

function index() {
  return (
    <Box sx={{mt:2,display:"flex"}}>
        <Box sx={{width: "80px",height: "50px",padding: "5px 60px",border:"1px solid #84BAA1",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"6px"
         ,color:"#84BAA1",cursor:"pointer",fontWeight:500}}>Back</Box>
        <Box sx={{ml:2,width: "auto",height: "50px",padding: "5px 50px",border:"1px solid #84BAA1",background:"#84BAA1",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"6px"
         ,color:"#fff",cursor:"pointer",fontWeight:500}}>
            <Box>Next</Box>  
            <Box sx={{ml:1}}>
                <Image style={{width:"75%",height:"auto"}} alt="logo" src={arrow}></Image>
            </Box>
        </Box>
            

    </Box>
  )
}

export default index