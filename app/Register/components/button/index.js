import { Box, Button } from '@mui/material'
import React, { useContext } from 'react'
import arrow from '@/assets/assets/images/register/arrow.png'
import Image from 'next/image'
import handleregis from "@/handle/register"
import { StateContext } from '@/context/Context'
import Loading from '@/components/loading'
import Dialog from '@/components/dialog/dialog'

function index() {
  const {state, setState} = useContext(StateContext);
  const Handleregis = handleregis();
  return (
    <Box sx={{mt:2,display:"flex"}}>
        <Button onClick={Handleregis.Selectcompany}  sx={{width: "80px",height: "50px",padding: "5px 60px",border:"1px solid #84BAA1",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"6px"
         ,color:"#84BAA1",cursor:"pointer",fontWeight:500}}>Back</Button>
        <Button onClick={Handleregis.handleRegister} sx={{ml:2,width: "auto",height: "50px",padding: "5px 50px",border:"1px solid #84BAA1",background:"#84BAA1",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"6px"
         ,color:"#fff",cursor:"pointer",fontWeight:500}}>
            <Box>{state.loading?<Loading/>:" Next"}</Box>  
            <Box sx={{ml:1}}>
                <Image style={{width:"75%",height:"auto"}} alt="logo" src={arrow}></Image>
            </Box>
            {state.registerSuccess?<Dialog/>:""}
  
        </Button>
    </Box>
  )
}

export default index