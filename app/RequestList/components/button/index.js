import { Box, Button } from '@mui/material'
import React from 'react'
import HandleManagerList from '@/handle/managerlist'
function index() {
  const handleManagerList = HandleManagerList();

  return (
    <Box sx={{display:'flex',justifyContent:'center',mt:1}}>
     <Box sx={{ display: 'flex', justifyContent: 'flex-end',width:"90%" }}>
       <Button onClick={handleManagerList.handleNewRequest} variant="contained" style={{backgroundColor:'#84BAA1',textTransform:''}}>New Request +</Button>
     </Box>
    </Box>
  )
}

export default index